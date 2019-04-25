# 基本特性

## 1. 组成

1. 一个js命名函数，可以传递初始化参数
2. 在命名函数的prototype上定义一个apply方法，webpack会自动调用这个方法
3. apply方法接收一个compiler对象（compiler代表整个webpack实例)
4. compiler绑定一个webpack事件钩子,功能完成异步事件需要执行callback回调

```javascript

  function Test(options){ 
    //options是配置参数
  }
  Test.prototype.apply=function(compiler){
    //异步事件有callback， 同步事件不传callback
    compiler.plugin('emit', function(compilation, callback){

    }
  }
  module.exports  =  Test

  // or es6

  module.exports = class Test {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
    } 
  };
```

## 2. 两大对象

> **Compiler**

1.  包含了 Webpack 环境所有的的配置信息，如（entry，options，loaders，plugins...)，可以理解成webpack的实例
1.  Compiler 代表了整个 Webpack 从启动到关闭的生命周期

> **Compilation**

1.  在每次文件变化重新打包时都进行一次实例化，它继承自Compiler
1.  包含了 webpack 每次 build 后的详细信息，包括编译出的结果、错误信息、模块、编译后的资源、改变的文件和依赖等的当前状态

## 3. 事件流(生命周期钩子函数)

```
entryOption                 在entry配置项处理过之后，同步执行插件
afterPlugins                设置完初始插件之后，同步执行插件
afterResolvers              resolver安装完成之后，同步执行插件
environment                 environment 准备好之后，同步执行插件
afterEnvironment            environment 安装完成之后，同步执行插件
beforeRun                   compiler.run() 执行之前，添加一个钩子，异步执行插件
run                         开始编译,开始读取 records 之前，钩入(hook into) compiler
                            异步执行插件
watchRun                    监听模式下，一个新的编译(compilation)触发之后，
                            执行一个插件，但是是在实际编译开始之前
normalModuleFactory         NormalModuleFactory 创建之后，同步执行插件
contextModuleFactory        ContextModuleFactory 创建之后，执行插件
beforeCompile               编译(compilation)参数创建之后，执行插件，异步执行插件
compile                     开始对AST进行遍历，遇到require触发call require，
                            一个新的编译(compilation)创建之后，钩入(hook into) compiler，
                            同步执行插件
thisCompilation             触发 compilation 事件之前执行，同步执行插件

compilation                 每次文件变动，重新编译的时候触发，同步执行插件


make                        从enter开始递归分析依赖并对依赖进行build,异步执行插件
afterCompile                异步执行插件
shouldEmit                  此时返回 true/false，同步执行插件
needAdditionalPass          同步执行插件
afterCompile                异步执行插件
emit                        生成资源到 output 目录之前，异步执行插件
afterEmit                   生成资源到 output 目录之后，异步执行插件
done                        编译（compilation)完成之后，同步执行插件
failed                      编译(compilation)失败，同步执行插件
invalid                     监听模式下，编译无效时，同步执行插件
watchClose                  监听模式停止，同步执行插件

build-module                使用loader加载文件并build模块
normal-module-loader        对loader加载过的文件用acorn编译，生成抽象语法树AST
seal                        所有依赖build完成，开始对chunk进行优化(提取公共模块，加hash等)
optimize-chunk-assets       压缩代码
entryOption                 在 entry 配置项处理过之后，同步执行插件
afterResolvers              resolver 安装完成之后，同步执行插件
beforeRun                   compiler.run() 执行之前，异步添加一个钩子 compiler
normalModuleFactory         NormalModuleFactory 创建之后，执行插件
contextModuleFactory        ContextModuleFactory 创建之后，执行插件

```

