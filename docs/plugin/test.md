### Tapable

#### tapable

1. tapable是一个提供事件订阅/发布功能的小型管理事件流的库
2. 提供异步和同步钩子，异步又分为异步串行和异步并行钩子
3. 异步并行和同步执行的最大区别在于，订阅者中可以存在异步处理逻辑
 
#### tapable hook

```
  SyncHook                    同步串行       不关心监听函数的返回值
  SyncBailHook                同步串行       只要监听函数中有一个函数的返回值不为null，则跳过剩下所有的逻辑
  SyncWaterfallHook           同步串行       第一个监听函数的返回值，作为第二个监听函数的参数，第二个返回值作为第三个的参数，以此类推
  SyncLoopHook                同步循环       如果监听函数的返回值为 true, 则反复执行当前的监听函数,直到返回指为 undefind 则继续执行下面的监听函数
  AsyncParallelHook           异步并行       异步并行, 监听的函数会一块执行, 哪个函数先执行完就先触发。不需要关心监听函数的返回值
  AsyncParallelBailHook       异步并行       只要监听函数的返回值不为null，就会忽略后面的监听函数执行，直接跳过callAsync等触发函数回调，然后执行这个被绑定的回调函数
  AsyncSeriesHook             异步串行       异步串行钩子类, 不关心 callback的参数，异步函数一个一个的执行,但是必须调用 callback函数
  AsyncSeriesBailHook         异步串行       callback的参数如果是null，后面所有的异步函数都执行，直接执行 callAsync方法的回调函数
  ASyncSeriesWaterfallHook    异步串行        上一个监听函数 callback(err, data)的第二个参数, 可以作为下一个监听函数的参数
```

##### SyncHook

```javascript
  class Synchook{
    constructor(){
      this.hooks=[]
    }
    tap(name,callback){
      this.hooks.push(callback)
    }
    call(...args){
      for(let i=0;i<this.hooks.length;i++){
        this.hooks[i](...args);
      }
    }
  }
  const synchook = new Synchook();
  // 注册(订阅)监听函数
  synchook.tap('test1', (data) => {
    console.log('test1', data)
  })
  synchook.tap('test2', (data) => {
    console.log('test2', data)
  })
  //发布事件
  synchook.call("test")
```

##### SyncBailHook 只要监听函数中有一个函数的返回值不为null，则中断执行下面的逻辑

```javascript
  class SyncBailHook{
    constructor(){
      this.hooks = [];
    }
    tap(name,callback){
      this.hooks.push(callback)
    }
    call(...args){
      let ret,hook,i =0 ;
      do{
        hook = this.hooks[i];
        if(hook){
          ret = hook(...args);
        }
        i++;
      }while(!ret&&hook);
    }
  }
  const syncBailHook = new SyncBailHook();
  // 注册(订阅)监听函数
  syncBailHook.tap('test1', (data) => {
      console.log('test1', data)
      return null
  })
  syncBailHook.tap('test2', (data) => {
      console.log('test2', data)
  })
  //发布事件
  syncBailHook.call("test")
```

###### SyncWaterfallHook 第一个监听函数的返回值，作为第二个监听函数的参数，第二个返回值作为第三个的参数，以此类推

```javascript
class SyncWaterfallHook{
  constructor(){
    this.hooks = [];
  }
  tap(name,callback){
    this.hooks.push(callback);
  }
  call(...args){
    let [firstHook,...otherHook] = this.hooks;
    if(firstHook){
      let ret = firstHook(...args);
      otherHook.reduce(function(f,n){
        return n(f)
      },ret)
    }
  }
}
const syncWaterfallHook = new SyncWaterfallHook()

syncWaterfallHook.tap('test1', data => {
    console.log('test1', data)
    return 23
})
syncWaterfallHook.tap('test2', data => {
    console.log('test2', data)
})
syncWaterfallHook.call('test')
```

###### SyncLoopHook 如果监听函数的返回值为 true, 则反复执行当前的监听函数,直到返回指为 undefind 则继续执行下面的监听函数

```javascript
 class SyncLoopHook{
  constructor(){
    this.hooks = [];
  }
  tap(name,callback){
    this.hooks.push(callback);
  }
  call(...args){
    for(let i = 0;i<this.hooks.length;i++){
        let hook = this.hooks[i];
        let ret;
        
        do{
          ret = hook(...args)
        }while(ret === true && ret !== undefined)
    }
  }
}
let syncLoopHook = new SyncLoopHook();
let n1 = 0

syncLoopHook.tap('test1', data => {
    console.log('test1', data)
    n1++;
    return n1 < 4 ? true : undefined
})
syncLoopHook.tap('test2', data => {
    console.log('test2', data)
})

syncLoopHook.call('test')
```

###### AsyncParallelHook  异步并行, 监听的函数会一起执行, 哪个函数先执行完就先触发。不需要关心监听函数的返回值

```javascript
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();    //将全部任务执行完毕后执行的回调
        let i=0,size = this.tasks.length;
        function done() {   //用来统计订阅者异步任务执行完成的个数
            if (++i == size) {
                callback(null);
            }
        }
        this.tasks.forEach(task => {
            task(...args,done);
        });
    }
}
let queue = new AsyncParallelHook(['name']);

queue.tapAsync('test1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
    },1000)
});
queue.tapAsync('test2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('test3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('test',err=>{
    console.log("end");
});
```

###### AsyncParallelBailHook

```javascript
class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let finalCallback=args.pop();
        let count=0,total=this.tasks.length;
        function done(err) {
            if (err) {  //如果有返回值，则直接执行总的回调
                return finalCallback(err);
            } else {
                if (++count == total) {
                    return finalCallback();
                }
            }
        }
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
queue.tapAsync('test1',function(name,callback){
    console.log("test1");
    callback('Wrong');
});
queue.tapAsync('test2',function(name,callback){
    console.log("test2");
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log("test3");
    callback();
});
queue.callAsync('test',err=>{
    console.log("end");
});
```

###### AsyncSeriesHook

```javascript
class AsyncSeriesHook{
  constructor(options) {
      this.options = options
      this.asyncHooks = []
  }
  tapAsync(name, callback) {
      this.asyncHooks.push(callback)
  }
  callAsync(...args){
      const finalCallback = args.pop()
      let i = 0
      const done = () => {
          let task = this.asyncHooks[i++]
          task ? task(...args, done) : finalCallback()
      }
      done()
  }
}
const asyncSeriesHook = new AsyncSeriesHook(['ll'])
asyncSeriesHook.tapAsync('test1', (data, done) => {
    setTimeout(() => {
        console.log('test1', data)
        done()
    }, 1000)
})
asyncSeriesHook.tapAsync('test2', (data, done) => {
    setTimeout(() => {
        console.log('test2', data)
        done()
    }, 2000)
})
asyncSeriesHook.callAsync('test', () => {
    console.log('end')
})
```

###### AsyncSeriesBailHook

```javascript
class AsyncSeriesBailHook{
  constructor(options) {
    this.options = options
    this.asyncHooks = []
  }
  tapAsync(name, callback) {
    this.asyncHooks.push(callback)
  }
  callAsync(...args){
    const finalCallback = args.pop();
    let i = 0;
    const done = data => {
      if (data) return finalCallback()
      let task = this.asyncHooks[i++]
      task ? task(...args, done) : finalCallback()
    }
    done()
  }
}
const asyncSeriesBailHook = new AsyncSeriesBailHook()
asyncSeriesBailHook.tapAsync('test1', (data, done) => {
  setTimeout(() => {
    console.log('test1', data)
    done(null)
  }, 1000)
})
asyncSeriesBailHook.tapAsync('test2', (data, done) => {
  setTimeout(() => {
    console.log('test2', data)
    done(null)
  }, 2000)
})
asyncSeriesBailHook.callAsync('test', (a,b) => {
  console.log('end')
})
```
##### AsyncSeriesWaterfallHook

```javascript
  class AsyncSeriesWaterfallHook {
      constructor(options) {
          this.options = options
          this.asyncHooks = []
      }
      tapAsync(name, callback) {
          this.asyncHooks.push(callback)
      }
      callAsync(...args) {
          const finalCallback = args.pop()
          let i = 0, once
          const done = (err, data) => {
              let task = this.asyncHooks[i++]
              if (!task) return finalCallback()
              if (!once) {
                  // 只执行一次
                  task(...args, done)
                  once = true
              } else {
                  task(data, done)
              }
          }
          done()
      }
  }
  const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook()
  asyncSeriesWaterfallHook.tapAsync('test1', (data, done) => {
      setTimeout(() => {
          console.log('test1', data)
          done(null, '第一个callback传递的参数')
      }, 1000)
  })
  asyncSeriesWaterfallHook.tapAsync('test2', (data, done) => {
      setTimeout(() => {
          console.log('test2', data)
          done(null)
      }, 1000)
  })
  asyncSeriesWaterfallHook.callAsync('qiqingfu', () => {
      console.log('end')
  })
```



### webpack hook 列表

1. 初始化阶段
```
entry-option:读取配置的entrys,为每个Entry实例一个化一个对应的EntryPlugin,为后面该entry的递归解析做准备
after-plugins:调用完所有内置的和配置的apply方法
after-resolvers:根据配置初始化完resolve，resolve负责在文件系统中寻找指定路径的文件

```

2. 编译阶段
```
run:启动一次新得编译
watch-run:和run类似，区别在于他是在监听模式下启动的编译，在这个事件中可以获得哪些文件发生了变化导致重新启动一次新得编译
compile:该事件是为了告诉插件一次新的编译将要成功，同时会给插件带上compiler对象
compilation：当webpack以开发模式运行时，每当检测到文件变化，一次新得compilation将被创建。一个compilation对象包含了当前的模块资源、编译生成资源、变化的文件等，compilation也提供了很多事件回调供插件做扩展
make：一个新的compilation创建完成，即将从entry开始读取文件，根据文件类型和匹配的loader对文件进行编译，编译完成后找出该文件依赖的文件，递归的编译和解析
after-compile:一次compilation执行完成
```

3. 编译阶段最重要的是compilation事件，因为compilation事件阶段调用了loader完成了每个模块的转换操作
compilation阶段又包含很多小的事件


```
build-module:使用对应的loader去转换一个模块
normal-module-loader:再用loader对一个模块转换完成后，使用acorn解析后面的内容，输出对应的抽象语法树（AST）,以方便webpack后面对代码进行分析
program：从配置的入口模块开始，分析其AST,当遇到require等导入其他模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系
seal:所有模块及其依赖的模块都通过loader进行转换完成后，根据依赖关系开始生成chunk
```

4. 输出阶段

```
should-emit:所有需要输出的文件已经生成好，询问插件哪些文件需要输出  ，哪些不需要
emit：确定好要输出哪些模块后，执行文件输出，可以在这里获取和修改输出内容
after-emit:文件输出完毕
done:成功完成一次完整的编译和输出流程
failed：如果在编译和输出流程中遇到异常导致webpack退出时，就会直接跳到本步骤，插件可以在本事件中获取具体的错误原因
    
```

#### 同步和异步

1. 首先去compiler.js查找当前hook实例的是哪个hook
2. hook后面可以拿到我们想要的参数

```javascript
module.exports = class Test {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    if (compiler.hooks) {  //webpack >= 4
      compiler.hooks.emit.tapAsync('emit',this.emitHook.bind(this));
      compiler.hooks.afterEmit.tapAsync('afterEmit',this.afterEmitHook.bind(this)
    );
    } else {
      // webpack < 4
      compiler.plugin('emit', this.uploadFiles.bind(this));
    }
  }
  emitHook(compilation, callback) {
  //  setTimeout(() => {
  //    console.log("emit 完成");
  //  }, 1000);
  console.log(4444)
  }
  afterEmitHook(){
    console.log("afterEmit 不会执行")
  }
};

```

#### 自定义webpack事件流

```javascript
const { SyncHook } = require('tapable'); //1.  引入Tapable钩子函数,同步 hook 或者 异步 hook都可以
const pluginFlowName = 'TestPlugin';  // 2. 自定义事件流名称

module.exports = class QiniuPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    if (compiler.hooks) {
      // 在compiler上挂载自定义plugin事件流
      compiler.hooks[pluginFlowName] = new SyncHook(['data']);

      //在environment hook 触发时，广播一个自定义事件,call方法传入参数
      compiler.hooks.environment.tap('testPlugin', () => {
        compiler.hooks[pluginFlowName].call('It is my plugin');
      });

      // 监听自定义事件
      compiler.hooks[pluginFlowName].tap('testMyTestPlugin', data => {
       console.log(data);
      });

    } else {
      // webpack < 4
      compiler.plugin('after-emit', this.init.bind(this));
    }
  }
  init(a, b) {
    console.log(a);
    console.log(b);
  }
};
```