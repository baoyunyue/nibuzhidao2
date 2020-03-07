/*
function add(getX,getY,cd){
    var x,y;
    getX(function(xVal){
        x=xVal;
        // 两个都准备好了?
        if(y !=undefined){
            cb(x+y);// 发送和
        }
    });
    getY(function(yVal){
        y=yVal;
        // 两个都准备好了?
        if(x !=undefined){
            cd(x+y);// 发送和
        }
    });
}
// fetchX() 和fetchY()是同步或者异步函数
add(fetchX,fetchY,function(sum){
    console.log(sum);
})
*/

/*
//promise
function add(xPromise,yPromise){
// Promise.all([ .. ])接受一个promise数组并返回一个新的promise
// 这个新promise等待数组中的所有promise完成
    return Promise.all([xPromise,yPromise])
// 这个promise决议之后，我们取得收到的X和Y值并加在一起
    .then(function(values){
        return values[0]+values[1];
    });
}

// fetchX()和fetchY()返回相应值的promise，可能已经就绪，也可能以后就绪
add(fetchX(),fetchY())
// 我们得到一个这两个数组的和的promise
// 现在链式调用 then(..)来等待返回promise的决议
.then(function(sum){
    console.log(sum);
});

//在add(..)内部，Promise.all([ .. ])调用创建了一个promise(这个 promise 等待 promiseX 和 promiseY 的决议)。链式调用 .then(..) 创建了 另外一个promise。这个promise由return values[0] + values[1]这一 行立即决议(得到加运算的结果)。
//因此，链 add(..) 调用终止处的调用 then(..)——在代码结尾处——实际上操作的是返回的第二个 promise，而 不是由Promise.all([ .. ])创建的第一个promise。

add(fetchX(),fetchY())
.then(
    // 完成处理函数
    function(sum){
        console.log(sum);
    },
    // 拒绝处理函数
    function(err){
        console.log(err);
    }
);
//如果在获取 X 或 Y 的过程中出错，或者在加法过程中出错，add(..) 返回的就是一个被拒绝的 promise，传给 then(..) 的第二个错误处理回调就会从这个 promise 中得到拒

//Promise 决议后就是外部不可变的值，我们可以安全地把这个值传递给第三 方，并确信它不会被有意无意地修改。特别是对于多方查看同一个 Promise 决议的情况，尤其如此。一方不可能影响另一方对 Promise 决议的观察结果。

function foo(x){
    return Listener;
}
var evt = foo(42);
evt.on("completion",function(){
 // 可以进行下一步了!
});
evt.on("failure",function(err){
    //foo(..)中出错了
});
*/

function foo(x){
    // 可是做一些可能耗时的工作
    // 构造并返回一个promise
    return new Promise(function(resolve,reject){
     // 最终调用resolve(..)或者reject(..)
     // 这是这个promise的决议回调
    });
}
var p = foo(42);
bar(p);
baz(p);

function bar(fooPromise){
    //// 侦听foo(..)完成
    fooPromise.then(
        function(){
         // foo(..)已经完毕，所以执行bar(..)的任务
        },
        function(){
            // 啊，foo(..)中出错了! 
        }
    );
}
//Promise 决议并不一定要像前面将 Promise 作为未来值查看时一样会涉及发送消息。它也可以只作为一种流程控制信号，就像前面这段代码中的用法一样。
//另外一种实现方式是:
function bar(){
 // foo(..)肯定已经完成，所以执行bar(..)的任务   
}
function oopsBar(){
    // 啊，foo(..)中出错了，所以bar(..)没有运行
}
// 对于baz()和oopsBaz()也是一样
var p = foo(42);
p.then(bar,oopsBar);
p.then(baz,oopsBaz);
//在第一段代码的方法里，不论 foo(..) 成功与否，bar(..) 都会被调用。并且如果收到了 foo(..) 失败的通知
//在第二段代码中，bar(..) 只有在 foo(..) 成功时才会被调用，否则就会调用 oppsBar(..)。 baz(..) 也是如此

//识别 Promise(或者行为类似于 Promise 的东西)就是定义某种称为 thenable 的东 西，将其定义为任何具有 then(..) 方法的对象和函数。我们认为，任何这样的值就是 Promise 一致的 thenable
if(
    p!== null&&
    (typeof p === "object"||
     typeof p === "function"
     )&&
     typeof p.then === "function"
){
    //假定这是一个thenable!
}
else{
    // 不是thenable
}

var o ={then:function(){}};
// 让v [[Prototype]]-link到o
var v = Object.create(o);
v.someStuff = "cool";
v.otherStuff = "not so cool";
v.hasOwnProperty("then");//false
//v 还 [[Prototype]] 连接到了另外一个对象 o，而后者恰好具有一个 then(..) 属性。所以thenable 鸭子类型检测会把 v 认作一个 thenable
//甚至不需要是直接有意支持的:
Object.prototype.then = function(){};
Array.prototype.then = function(){};
var v1 = {hello:"world"};
var v2 = ["Hello","world"];
//v1 和 v2 都会被认作 thenable
