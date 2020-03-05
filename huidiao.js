/*listen("click",function handler(evt){
    setTimeout(function request(){
        ajax("http://some.url.1",function response(text){
            if(text == "hello"){
                handler();
            }
            else if (text == "world"){
                request();
            }
        });
    },500);
})
*/

//回调地狱
//一开始我们在等待 click 事件，然后等待定时器启动，然后等待 Ajax 响应返回，之后可能 再重头开始。、
//控制反转，也就是把自己程序一部分的执行控制交给某 个第三方。在你的代码和第三方工具(一组你希望有人维护的东西)之间有一份并没有明 确表达的契约。

function success(data){
    console.log(data);
}
function failure(err){
    console.log(err);
}
ajax("http://some.url.1",success,failure);
//在这种设计下，API 的出错处理函数 failure() 常常是可选的，如果没有提供的话，就是 假定这个错误可以吞掉。

//error-first 风格”(有时候也称为“Node 风格”，因为几乎 所有 Node.js API 都采用这种风格)，其中回调的第一个参数保留用作错误对象(如果有的 话)。如果成功的话，这个参数就会被清空 / 置假(后续的参数就是成功数据)

function response(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
}
ajax("http://some.url.1",response);

function timeoutify(fn,delay){
    var intv = setTimeout(function(){
        intv = null;
        fn(new Error("Timeout!"));
    },delay);

    return function(){
        if(intv){
            clearTimeout(intv);
            fn.apply(this,argumentss);
        }
    };
}

function foo(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
}
ajax("http://some.url.1",timeoutify(foo,500));

function asyncity(fn){
    var orig_fn = fn,
    intv = setTimeout(function(){
        intv = null;
        if(fn)fn();
    },0);
    fn = null;
    return function(){
        if(inv){
            fn = orig_fn.bind.apply(
                orig_fn,
                [this].concat([].slice.call(arguments))
            );
        }
        else{
            orig_fn.apply(this,arguments);
        }
    };
}

function result(data){
    console.log(a);
}
var a =0;
ajax("..pre-cached-url..",asyncity(result));
a++;