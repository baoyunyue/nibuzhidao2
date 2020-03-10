/*
var x = 1;
function foo(){
    x++;
    bar();
    console.log("x:",x);
}
function bar(){
    x++;
}
foo();//x:3



var x = 1;
function *foo(){
    x++;
    yield;// 暂停!
    console.log("x:",x);
}
function bar(){
    x++;
}

// 构造一个迭代器it来控制这个生成器
var it = foo();
// 这里启动foo()!
it.next();
x;//2
bar();
x;//3
it.next();//x:3

//一个函数 一旦开始执行，就会运行到结束，期间不会有其他代码能够打断它并插入其间。
//生成器就是一类特殊的函数，可以一次或多次启动和停止，并不一定非得要完成。

function *foo(x,y){
    return x*y;
}
var it = foo(6,7);
var res =it.next();//这个 next(..) 调用的结果是一个对象，它有一个 value 属性
res.value;//42
//我们只是创建了一个迭代器对象，把它赋给了一个变量 it，用于控制生成器 *foo(..)。然后调用 it.next()，指示生成器 *foo(..) 从当前位置开始继续运行，停在下 一个 yield 处或者直到生成器结束

function *foo(x){
    var y = x*(yield);
    return y;
}
var it = foo(6);
// 启动foo(..)
it.next();
var res =it.next(7);
res.value;//42
//首先，传入 6 作为参数 x。然后调用 it.next()，这会启动 *foo(..)。
//在*foo(..)内部，开始执行语句var y = x ..，但随后就遇到了一个yield表达式
//它 就会在这一点上暂停 *foo(..)(在赋值语句中间!)，并在本质上要求调用代码为 yield 表达式提供一个结果值。接下来，调用it.next( 7 )，这一句把值7传回作为被暂停的 yield 表达式的结果。
//第一个 next(..) 总是启动一个生成器，并运行到第一个 yield 处。不过，是第二个 next(..) 调用完成第一个被暂停的 yield 表达式

function *foo(x){
    var y = x*(yield "Hello");// <-- yield一个值!
    return y
}
var it = foo(6);
var res = it.next();//第一个next()，并不传入任何东西
res.value;//"Hello"
res = it.next(7);// 向等待的yield传入7
res.value;//42
//第一个 next() 调用(没有参数的)基本上就是在提出一个问题:“生成器 *foo(..) 要给我 的下一个值是什么”。谁来回答这个问题呢?第一个 yield "hello" 表达式
//与 yield 语句的数量相比，还是多出了一个额外的 next()。所以，最后一个 it.next(7) 调用再次提出了这样的问题:生成器将要产生的下一个值是什么。但是，再没 有 yield 语句来回答这个问题了,return 语句回答这个问题!

function *foo(){
    var x = yield 2;
    z++;
    var y = yield(x*z);
    console.log(x,y,z);
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value;// 2 <-- yield 2
var val2 = it2.next().value;// 2 <-- yield 2

val1 =it1.next(val2*10).value;// 40 <-- x:20,  z:2
val2 = it2.next(val1*5).value;// 600<-- x:200, z:3

it1.next(val2/2);// y:300
                 // 20 300 3
it2.next(val1/4);// y:10
                 // 200 10 3

var a = 1;
var b = 2;
function foo() {
    a++;
    b = b * a;
    a = b + 3; 
}
function bar() {
    b--;
    a = 8 + b;
    b = a * 2; 
}
//如果是普通的 JavaScript 函数的话，显然，要么是 foo() 首先运行完毕，要么是 bar() 首 先运行完毕，但 foo() 和 bar() 的语句不能交替执行。所以，前面的程序只有两种可能的 输出。

var a = 1;
var b = 2;
function *foo(){
    a++;
    yield;
    b = b*a;
    a =(yield b)+3;
}
function *bar(){
    b--;
    yield;
    a=(yield 8)+b;
    b=a*(yield 2);
}

function step(gen){
    var it =gen();
    var last;

    return function(){
        // 不管yield出来的是什么，下一次都把它原样传回去!
        last = it.next(last).value;
    };
}
//step(..) 初始化了一个生成器来创建迭代器 it，然后返回一个函数，这个函数被调用的时 候会将迭代器向前迭代一步。另外，前面的 yield 发出的值会在下一步发送回去。于是， yield 8 就是 8，而 yield b 就是 b(yield 发出时的值)。
a = 1;
b = 2;
var s1 =step(foo);
var s2 =step(bar);
//// 首次运行*foo()
s1();
s1();
s1();
//// 现在运行*bar()
s2();
s2();
s2();
s2();
console.log(a,b);//11 22

// 确保重新设置a和b 
a = 1;
b = 2;
var s1 = step( foo );
var s2 = step( bar );
s2();       // b--;
s2();       // yield 8
s1();       // a++;
s2();       // a = 8 + b;
            // yield 2
s1();       // b = b * a;
            // yield b
s1();       // a = b + 3;
s2();       // b = a * 2;

*/

var gimmeSomething =(function(){
    var nextVal;
    return function(){
        if(nextVal === undefined){
            nextVal = 1;
        }
        else{
            nextVal = (3*nextVal)+6;
        }
        return nextVal
    };
})();
gimmeSomething();//1
gimmeSomething();//9
gimmeSomething();//33
gimmeSomething();//105

var something = (function(){
    var nextVal;
    return{
        // for..of循环需要
        [Symbol.iterator]:function(){return this;},
        next:function(){
            if(nextVal === undefined){
                nextVal = 1;
            }
            else{
                nextVal=(3*nextVal)+6;
            }
            return{done:false,value:nextVal};
        }
    };
})();
something.next().value;//1
something.next().value;//9
something.next().value;//33
something.next().value;//105
//[ .. ]语法被称为 计算属性名。这在对象术语定义中是指，指定一个表达式并用这个表 达式的结果作为属性的名称。另外，Symbol.iterator 是 ES6 预定义的特殊 Symbol 值之一
//next() 调用返回一个对象。这个对象有两个属性:done 是一个 boolean 值，标识迭代器的 完成状态;value 中放置迭代值
//ES6 还新增了一个 for..of 循环，这意味着可以通过原生循环语法自动迭代标准迭代器
for(var v of something){
    console.log(v);
    if(v>500){
        break;
    }
}//1 9 33 105 321 969
//因为我们的迭代器 something 总是返回 done:false，因此这个 for..of 循环 将永远运行下去，这也就是为什么我们要在里面放一个 break 条件

for(
    var ret;
    (ret = something.next())&&!ret.done;
){
    console.log(ret.value);
    if(ret.value>500){
        break;
    }
}//1 9 33 105 321 969

//除了构造自己的迭代器，许多 JavaScript 的内建数据结构(从 ES6 开始)，比如 array，也 有默认的迭代器

var a =[1,3,5,7,9];
for(var v of a){
    console.log(v);
}
// 1 3 5 7 9

//可以把生成器看作一个值的生产者，我们通过迭代器接口的 next() 调用一次提取出一个值。


//生成器本身并不是 iterable，尽管非常类似——当你执行一个生成器，就得到了一个迭代器:
function *foo(){}
var it = foo();

function *something(){
    var nextVal;
    while(true){
        if(nextVal === undefined){
            nextVal = 1;
        }
        else{
            nextVal = (3*nextVal)+6;
        }
        yield nextVal;
    }
}
//生成器会在每个 yield 处暂停，函数 *something() 的 状态(作用域)会被保持，即意味着不需要闭包在调用之间保持变量状态

//通常在实际的 JavaScript 程序中使用 while..true 循环是非常糟糕的主意，至 少如果其中没有 break 或 return 的话是这样，因为它有可能会同步地无限循 环，并阻塞和锁住浏览器 UI。但是，如果在生成器中有 yield 的话，使用这 样的循环就完全没有问题
for(var v of something()){
    console.log(v);
    if(v>500){
        break;
    }
}// 1 9 33 105 321 969
//这里的 something 是生成器，并不是 iterable。我们需要调用 something() 来构造一个生产者供 for..of 循环迭代
//something() 调用产生一个迭代器， for..of 循环需要的是一个 iterable
//生成器的迭代器也有一个 Symbol.iterator 函数，基本上这个函数做的就是 return this，换句话说，生成器的迭代器也是一个 iterable

//for..of 循环的“异常结束”(也就是“提前终 止”)，通常由 break、return 或者未捕获异常引起，会向生成器的迭代器发送一个信号使 其终止。
//尽管 for..of 循环会自动发送这个信号，但你可能会希望向一个迭代器手工发送这个信号。 可以通过调用 return(..) 实现这一点。

//如果在生成器内有 try..finally 语句，它将总是运行，即使生成器已经外部结束。如果需 要清理资源的话(数据库连接等)，这一点非常有用:
function *something(){
    try{
        var nextVal;
        while(true){
            if(nextVal===undefined){
                nextVal = 1;
            }
            else{
                nextVal = (3*nextVal)+6;
            }
            yield nextVal;
        }
    }
    //清理子句
    finally{
        console.log("cleaning up!")
    }
}

//也可以在外部通过return(..) 手工终止生成器的迭代器实例:
var it = something();
for(var v of it){
  console.log(v);
  // 不要死循环!
  if(v>500){
      console.log(
          // 完成生成器的迭代器
          it.return("Hello World").value
      );
      // 这里不需要break
  }
}
// 1 9 33 105 321 969 
//// 清理!
// Hello World
//调用 it.return(..) 之后，它会立即终止生成器，这当然会运行 finally 语句。另外，它 还会把返回的value设置为传入return(..)的内容，这也就是"Hello World"被传出 去的过程。现在我们也不需要包含 break 语句了，因为生成器的迭代器已经被设置为 done:true，所以 for..of 循环会在下一个迭代终止。
 
function foo(x,y,cb){
    ajax(
        "http://some.url.1/?x="+x+"&y="+y,
        cb
    );
}
foo(11,31,function(err,text){
    if(err){
        console.error(err);
    }
    else{
      console.log(text);
    }
});
//通过生成器来表达同样的任务流程控制，可以这样实现:
function foo(x,y){
    ajax(
        "http://some.url.1/?x=" + x + "&y=" + y,
        function(err,data){
            if(err){
                it.throw(err);
            }
            else{
                it.next(data);
            }
        }
    );
}
function *main(){
    try{
        var text = yield foo(11,31);
        console.log(text);
    }
    catch(err){
        console.error(err);
    }
}
var it = main();
it.next();
//在yield foo(11,31)中，首先调用foo(11,31)，它没有返回值(即返回undefined)，所以 我们发出了一个调用来请求数据，但实际上之后做的是yield undefined。
//这里并不是在消息传递的意义上使用 yield，而只是将其用于流程控制实现暂停 / 阻塞
//看一下 foo(..)。如果这个 Ajax 请求成功，我们调用: 
//it.next( data );
//这会用响应数据恢复生成器，意味着我们暂停的 yield 表达式直接接收到了这个值。然后 随着生成器代码继续运行，这个值被赋给局部变量 text。
function *main(){
    var x= yield "Hello World";
    yield x.toLowerCase();//// 引发一个异常! 
}
var it = main();
it.next().value;// Hello World
try{
    it.next(42);
}
catch(err){
    console.error(err);//TypeError
}

function *main(){
    var x = yield "Hello World";
    // 永远不会到达这里
    console.log(x);
}
var it = main();
it.next();
try{
    it.throw("Oops");
}
catch(err){
    console.error(err);//Oops
}

function foo(x,y){
    return request(
        "http://some.url.1/?x=" + x + "&y=" + y
    );     
}
function *main(){
    try{
        var text = yield foo(11,31);
        console.log(text);
    }
    catch(err){
        console.log(err);
    }
}
var it =main();
var p = it.next().value;
p.then(
    function(text){
        it.next(text);
    },
    function(err){
        it.throw(err);
    }
)

function run(gen){
    var args = [].slice.call(arguments,1),it;
    // 在当前上下文中初始化生成器
    it = gen.apply(this,args);
    // 返回一个promise用于生成器完成
    return Promise.resolve()
    .then(function handleNext(value){
        var next = it.next(value);
        return (function handleResult(next){
            if(next.done){
                return next.value;
            }
            else{
                return Promise.resolve(next.value)
                .then(
                    handleNext,
                    function handleErr(err){
                        return Promise.resolve(
                            it.throw(err)
                        )
                        .then(handleResult)
                    }
                );
            }
        })(next);
    })
}

function *main() {
    // ..
}
run( main );
//这种运行 run(..) 的方式，它会自动异步运行你传给它的生成器，直到结束。
function foo(x,y) {
    return request(
        "http://some.url.1/?x=" + x + "&y=" + y
    );
}
async function main() {
    try {
        var text = await foo( 11, 31 );
        console.log( text );
    }
    catch (err) {
        console.error( err );
} }
main();
//main() 也不再被声明为生成器函数了，它现在是 一类新的函数:async 函数。最后，我们不再 yield 出 Promise，而是用 await 等待它决议
//如果你 await 了一个 Promise，async 函数就会自动获知要做什么，它会暂停这个函数(就 像生成器一样)，直到 Promise 决议。我们并没有在这段代码中展示这一点，但是调用一个 像 main() 这样的 async 函数会自动返回一个 promise。在函数完全结束之后，这个 promise 会决议。
