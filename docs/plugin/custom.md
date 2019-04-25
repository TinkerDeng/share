#  自定义文件上传七牛plugin

```javascript

const qiniu = require('qiniu');
const path = require('path');

module.exports = class QiniuPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // webpack >= 4
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync(
        'QiniuWebpackPlugin',
        this.uploadFiles.bind(this)
      );
    }
    // webpack < 4
    else {
      compiler.plugin('after-emit', this.uploadFiles.bind(this));
    }
  }

  uploadFiles(compilation, callback) {
    let assets = compilation.assets; // 打包后的资源文件
    let batch = this.options.batch || 20; // 批处理

    // 上传七牛配置初始化
    let mac = new qiniu.auth.digest.Mac(
      this.options.accessKey,
      this.options.secretKey
    );
    let qiniuConfig = new qiniu.conf.Config();

    let bucket = this.options.bucket; 
    let uploadPath = this.options.path; // 七牛文件上传路径
    let filesNames = Object.keys(assets);
    let retryFiles = []; // 上传失败的文件列表
    let retryFilesCountDown = 0; // 上传失败的文件个数

    const performUpload = function(fileName, retrying) {
      let file = assets[fileName] || {};
      let key = path.posix.join(uploadPath, fileName);
      let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket + ':' + key });
      let uploadToken = putPolicy.uploadToken(mac);
      let formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
      let putExtra = new qiniu.form_up.PutExtra();
      return new Promise(resolve => {
        let begin = Date.now();
        formUploader.putFile(
          uploadToken,
          key,
          file.existsAt,
          putExtra,
          function(err, body) {
            if (err) {
              if (!~retryFiles.indexOf(fileName)) {
                retryFiles.push(fileName);
              }
            }
            body.duration = Date.now() - begin;
            resolve(body);
          }
        );
      });
    };
    const retryFailedFiles = function(err) {
      if (err) {
        return Promise.reject(err);
      }
      if (retryFilesCountDown < 0) retryFilesCountDown = 0;

      let _files = retryFiles.splice(0,retryFilesCountDown);
      if (_files.length) {
        return Promise.all(_files.map(file => performUpload(file, true))).then(
          () => retryFailedFiles(),
          retryFailedFiles
        );
      } else {
        if (retryFiles.length) {
          return Promise.reject(new Error('File uploaded failed'));
        } else {
          return Promise.resolve();
        }
      }
    };
    const execStack = function(err) {
      if (err) {
        return Promise.reject(err);
      }
      let _files = filesNames.splice(0, batch); // 批量上传，一次20个
      if (_files.length) {
        return Promise.all(_files.map(file => performUpload(file, false))).then(
          () => execStack(),
          execStack
        );
      } else {
        return Promise.resolve();
      }
    };
    execStack()
      .then(() => {
        retryFilesCountDown = retryFiles.length;
        return retryFailedFiles();
      })
      .then(
        () => {
          callback();
        },
        err => {
          callback(err);
        }
      );
  }
};
```