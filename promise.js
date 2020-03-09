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

p.then(function(){
    p.then(function(){
        console.log("C");
    });
    console.log("A");
});
p.then(function(){
    console.log("B");
});
//A B C
//"C" 无法打断或抢占 "B"，这是因为 Promise 的运作方式。

var p3 = new Promise(function(resolve,reject){
    resolve("B");
});
var p1 = new Promise(function(resolve,reject){
    resolve(p3);
});
p2 = new Promise(function(resolve,reject){
    resolve("A");
});
p1.then(function(v){
    console.log(v);
});
p2.then(function(v){
    console.log(v);
});
//A B
//p1 不是用立即值而是用另一个 promise p3 决 议，后者本身决议为值 "B"。规定的行为是把 p3 展开到 p1，但是是异步地展开。所以，在 异步任务队列中，p1 的回调排在 p2 的回调之后

//没有任何东西(甚至 JavaScript 错误)能阻止 Promise 向你通知它的决议(如果它 决议了的话)。如果你对一个 Promise 注册了一个完成回调和一个拒绝回调，那么 Promise 在决议时总是会调用其中的一个。

//如果你的回调函数本身包含 JavaScript 错误，那可能就会看不到你期望的结果，但 实际上回调还是被调用了。后面我们会介绍如何在回调出错时得到通知，因为就连这些错 误也不会被吞掉。

//如果 Promise 本身永远不被决议呢?即使这样，Promise 也提供了解决方案，其使用 了一种称为竞态的高级抽象机制:

// 用于超时一个Promise的工具 
function timeoutPromise(delay) {
    return new Promise( function(resolve,reject){
        setTimeout( function(){
            reject( "Timeout!" );
        }, delay );
} ); 
}
// 设置foo()超时 
Promise.race( [
foo(),// 试着开始foo()
timeoutPromise( 3000 )// 给它3秒钟
]) .then(
function(){
// foo(..)及时完成!
},
function(err){
    // 或者foo()被拒绝，或者只是没能按时完成 
    // 查看err来了解是哪种情况
    } );

//如果使用多个参数调用 resovle(..) 或者 reject(..)，第一个参数之 后的所有参数都会被默默忽略
//如果要传递多个值，你就必须要把它们封装在单个值中传递，比如通过一个数组或对象。

//果在 Promise 的创建过程中或在查看其决议 结果过程中的任何时间点上出现了一个 JavaScript 异常错误，比如一个 TypeError 或 ReferenceError，那这个异常就会被捕捉，并且会使这个 Promise 被拒绝。

var p = new Promise(function(resolve,reject){
    foo.bar();
    resolve(42);
});
p.then(
    function fulfilled(){
        //永远不会到这里
    },
    function reject(err){
        //err将会是一个TypeError异常对象来自foo.bar()这一行
    }
);
//foo.bar() 中发生的 JavaScript 异常导致了 Promise 拒绝
//出错可能会引起 同步响应，而不出错则会是异步的。Promise 甚至把 JavaScript 异常也

var p = new Promise(function(resolve,reject){
    resolve(42);
});
p.then(
    function fulfilled(msg){
        foo.bar();
        console.log(msg);// 永远不会到达这里 :(
    },
    function rejected(err){
      // 永远也不会到达这里 :(
    }
);
//这看起来像是 foo.bar() 产生的异常真的被吞掉了. p.then(..) 调用本身返回了另外一 个 promise，正是这个 promise 将会因 TypeError 异常而被拒绝

//如果向 Promise.resolve(..) 传递一个非 Promise、非 thenable 的立即值，就会得到一个用 这个值填充的 promise
//promise p1 和 promise p2 的行为是完全一样的:
var p1 = new Promise(function(resolve,reject){
    resolve(42);
});
var p2 = Promise.resolve(42);
//如果向 Promise.resolve(..) 传递一个真正的 Promise，就只会返回同一个 promise:
var p1 = Promise.resolve(42);
var p2 =Promise.resolve(p1);
p1 === p2;//true

var p ={
    then:function(cb){
        cb(42);
    }
};
p.then(
    function fulfilled(val){
        console.log(val);//42
    },
    function rejected(err){
        //永远不会到达这里
    }
)
//这个 p 是一个 thenable，但并不是一个真正的 Promise。幸运的是，和绝大多数值一样，它是可追踪的

var p ={
    then:function(cb,errcb){
        cb(42);
        errcb("evil laugh");
    }
};
p.then(
    function fulfilled(val){
        console.log(val);//42
    },
    function rejected(err){
        //// 啊，不应该运行!
        console.log(err);//evil laugh
    }
)
//这个 p 是一个 thenable，但是其行为和 promise 并不完全一致
Promise.resolve(p).then(
    function fulfilled(val){
        console.log(val);
    },
    function rejected(err){
        // 永远不会到达这里
    }
);
//Promise.resolve(..) 可以接受任何 thenable，将其解封为它的非 thenable 值。从 Promise. resolve(..) 得到的是一个真正的 Promise，是一个可以信任的值。如果你传入的已经是真 正的 Promise，那么你得到的就是它本身，

//假设我们要调用一个工具 foo(..)，且并不确定得到的返回值是否是一个可信任的行为良好的 Promise，但我们可以知道它至少是一个 thenable。Promise.resolve(..) 提供了可信 任的 Promise 封装工具
//// 不要只是这么做:
foo(42)
.then(function(v){
    console.log(v);
});
// 而要这么做:
Promise.resolve(foo(42))
.then(function(v){
    console.log(v);
});
//对于用 Promise.resolve(..) 为所有函数的返回值(不管是不是 thenable) 都封装一层。另一个好处是，这样做很容易把函数调用规范为定义良好的异 步任务。如果 foo(42) 有时会返回一个立即值，有时会返回 Promise，那么 Promise.resolve( foo(42) ) 就能够保证总会返回一个 Promise 结果

//链式流
var p =Promise.resolve(21);
var p2 =p.then(function(v){
    console.log(v);//21
    // 用值42填充p2
    return v*2;
});
p2.then(function(v){
    console.log(v);//42
})
//我们通过返回v * 2(即42)，完成了第一个调用then(..)创建并返回的promisep2。p2的 then(..)调用在运行时会从return v * 2语句接受完成值。当然，p2.then(..)又创建了 另一个新的 promise，可以用变量 p3 存储。

var p = Promise.resolve(21);
p
.then(function(v){
    console.log(v);//21
    // 用值42完成连接的promise
    return v*2;
})
// 这里是链接的promise
.then(function(v){
    console,log(v);//42
})

var p = Promise.resolve(21);
p.then(function(v){
    console.log(v);//21
    // 创建一个promise并将其返回
    return new Promise(function(resolve,reject){
        // 用值42填充
        resolve(v*2);
    });
})
.then(function(v){
    console.log(v);//42
});
//虽然我们把 42 封装到了返回的 promise 中，但它仍然会被展开并最终成为链接的 promise 的决议，因此第二个 then(..) 得到的仍然是 42。

var p = Promise.resolve(21);
p.then(function(v){
    console.log(v);//21
    //// 创建一个promise并返回
    return new Promise(function(resolve,reject){
        // 引入异步!
        setTimeout(function(){
            // 用值42填充
            resolve(v*2);
        },100);
    });
})
.then(function(v){
    // 在前一步中的100ms延迟之后运行
    console.log(v);//42
});
//不管我们想要多少个异步步 骤，每一步都能够根据需要等待下一步
//如果不显式返回一个值，就会隐式返回 undefined，并且这些 promise 仍然会以同样的方式链接在一起。这样，每个 Promise 的决 议就成了继续下一个步骤的信号

function delay(time){
    return new Promise(function(resolve,reject){
        setTimeout(resolve,time);
    });
}
delay(100)
.then(function STEP2(){
    console.log("step 2 (after 100ms)");
    return delay(200);
})
.then(function STEP3(){
    console.log("step 3 (after another 200ms)");
})
.then(function STEP4(){
    console.log("step 4 (next Job)");
    return delay(50);
})
.then(function STEP5(){
    console.log("step 5 (after another 50ms)");
})
// 假定工具ajax( {url}, {callback} )存在
// Promise-aware ajax
function request(url){
    return new Promise(function(resolve,reject){
        // ajax(..)回调应该是我们这个promise的resolve(..)函数
        ajax(url,resolve);
    })
}


request("http://some.url.1/")
// 步骤2:
.then(function(response1){
    return request("http;//some.url.2/?v="+response1);
})
.then(function(response2){
    console.log(response2);
});

// 步骤1:
request("http://some.url.1/")
// 步骤2:
.then(function(response1){
    foo.bar();//undefined，出错!
    // 永远不会到达这里
    return request("http://some.url.2/?v="+response1);
})
// 步骤3:
.then(
    function fulfilled(response2){
        //永远不会到达这里
    },
    //捕捉错误的拒绝处理函数
    function rejected(err){
        console.log(err);
        // 来自foo.bar()的错误TypeError
        return 42;
    }
)
// 步骤4:
.then(function(msg){
    console.log(msg);
});

var p = new Promise(function(resolve,reject){
    reject("Oop");
});

var p2 = p.then(
    function fulfilled(){
      // 永远不会达到这里  
    }
    // 假定的拒绝处理函数，如果省略或者传入任何非函数值
    //function(err){
        //throw err;   
    //}
);
//默认拒绝处理函数只是把错误重新抛出，这最终会使得 p2(链接的 promise) 用同样的错误理由拒绝。从本质上说，这使得错误可以继续沿着 Promise 链传播下去，直 到遇到显式定义的拒绝处理函数

var rejectedPr = new Promise(function(resolve,reject){
    resolve(Promise.reject("Oop"));
});
rejectedPr.then(
    function fulfilled(){
        // 永远不会到达这里
    },
    function rejected(err){
        console.log(err);// "Oops"
    }
);

function fulfilled(msg){
    console.log(msg);
}
function rejected(err){
    console.error(err);
}
p.then(
    fulfilled,
    rejected
);

var p = Promise.resolve(42);
p.then(
    function fulfilled(msg){
        // 数字没有string函数，所以会抛出错误
        console.log(msg.toLowerCase());
    },
    function rejected(err){
      // 永远不会到达这里  
    }
);

// request(..)是一个Promise-aware Ajax工具
// 就像我们在本章前面定义的一样
var p1 = request("http://some.url.1");
var p2 = request("http://some.url.2");
Promise.all([p1,p2])
.then(function(msgs){
    return request(
        "http://some.url.3/?v="+msg.join(",")
    );
})
.then(function(msg){
    console.log(msg);
});
//从Promise.all([ .. ])返回的主promise在且仅在所有的成员promise都完成后才会完 成。如果这些promise中有任何一个被拒绝的话，主Promise.all([ .. ])promise就会立 即被拒绝，并丢弃来自其他所有 promise 的全部结果。

//// request(..)是一个支持Promise的Ajax工具
// 就像我们在本章前面定义的一样
var p1 = request("http://some.url.1");
var p2 = request("http://some.url.2");
Promise.race([p1,p2])
.then(function(msg){
    return request(
        "http://some.url.3/?v="+msg
    );
})
.then(function(msg){
    console.log(msg);
})

// foo()是一个支持Promise的函数
// 前面定义的timeoutPromise(..)返回一个promise
 // 这个promise会在指定延时之后拒绝
 Promise.race([
     foo(),// 启动foo()
     timeoutPromise(3000)// 给它3秒钟
 ])
 .then(
     function(){
         //foo(..)按时完成!
     },
     function(err){
         // 要么foo()被拒绝，要么只是没能够按时完成， 
         // 因此要查看err了解具体原因
     }
 )
 var p = Promise.resolve(42);
 p.then(something)
 .finally(cleanup)
 .then(another)
 .finally(cleanup);
 //在各种各样的 Promise 库中，finally(..) 还是会创建并返回一个新的 Promise(以支持链接继续)。如果 cleanup(..) 函数要返回一个 Promise 的 话，这个 promise 就会被连接到链中，这意味着这里还是会有前面讨论过的 未处理拒绝问题

 //// polyfill安全的guard检查
 if(!Promise.observe){
     Promise.observe = function(pr,cb){
         pr.then(
             function fulfilled(msg){
                 Promise.resolve(msg).then(cb);
             },
             function rejected(err){
                 Promise.resolve(err).then(cb);
             }
         );
         return pr;
     };
 }

 Promise.race([
     Promise.observe(
         foo(),
         function cleanup(msg){
             // 在foo()之后清理，即使它没有在超时之前完成
         }
     ),
     timeoutPromise(3000)// 给它3秒钟
 ])
 // polyfill安全的guard检查
 if(!Promise.first){
     Promise.first = function(prs){
         return new Promise(function(resolve,reject){
             // 在所有promise上循环
             prs.forEach(function(pr){
                 // 把值规整化
                 Promise.resolve(pr)
                 // 不管哪个最先完成，就决议主promise
                 .then(resolve);
             });
         });
     };
 }

 if(!Promise.map){
     Promise.map = function(vals,cb){
         // 一个等待所有map的promise的新promise
         return Promise.all(
             // 注:一般数组map(..)把值数组转换为 promise数组
             vals.map(function(val){
                 // 用val异步map之后决议的新promise替换val
                 return new Promise(function(resolve){
                     cb(val,resolve);
                 });
             })
         );
     };
 }
 //在这个 map(..) 实现中，不能发送异步拒绝信号，但如果在映射的回调 (cb(..))内出现同步的异常或错误，主 Promise.map(..) 返回的 promise就会拒绝

 var p1 =Promise.resolve(21);
 var p2 = Promise.resolve(42);
 var p3 = Promise.reject("Oops");
 // 把列表中的值加倍，即使是在Promise中
 Promise.map([p1,p2,p3],function(pr,done){
     // 保证这一条本身是一个Promise
     Promise.resolve(pr)
     .then(
         // 提取值作为v
         function(v){
             // map完成的v到新值
             done(v*2);
         },
         // 或者map到promise拒绝消息
         done
     );
 })
 .then(function(vals){
     console.log(vals);//[42,84,"Oops"]
 });


//p.catch( rejected ); // 或者p.then( null, rejected )
//then(..) 和 catch(..) 也会创建并返回一个新的 promise，这个 promise 可以用于实现 Promise 链式流程控制。如果完成或拒绝回调中抛出异常，返回的 promise 是被拒绝的。如 果任意一个回调返回非 Promise、非 thenable 的立即值，这个值会被用作返回 promise 的完 成值。如果完成处理函数返回一个 promise 或 thenable，那么这个值会被展开，并作为返回 promise 的决议值。
//若向Promise.all([ .. ])传入空数组，它会立即完成，但Promise. race([ .. ]) 会挂住

function getY(x){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve((3*x)-1);
        },100);
    });
}
function foo(bar,baz){
    var x = bar*baz;
    return getY(x)
    .then(function(y){
        return[x,y];
    });
}

foo(10,20)
.then(function(msg){
    var x =msgs[0];
    var y = msgs[1];

    console.log(x,y);
});

function foo(bar,baz){
    var x =bar*baz;
    return[
        Promise.resolve(x),
        getY(x)
    ];
}
Promise.all(
    foo(10,20)
)
.then(function(msg){
    var x = msgs[0];
    var y = msgs[1];
    console.log(x,y);
});

function spread(fn){
    return Function.apply.bind(fn,null);
}
Promise.all(
    foo(10,20)
)
.then(
    spread(function(x,y){
        console.log(x,y);//200 599
    })
)
//解构
Promise.all(
    foo(10,20)
)
.then(function(msgs){
    var[x,y]=msgs;
    console.log(x,y);
}
);

Promise.all(
    foo(10,20)
)
.then(function([x,y]){
    console.log(x,y);//200 599
});

// click(..)把"click"事件绑定到一个DOM元素 
// request(..)是前面定义的支持Promise的Ajax
var p = new Promise(function(resolve,reject){
    click("#mybtn",resolve);
});
p.then(function(evt){
    var btnID = evt.currentTarget.id;
    return request("http://some.url.1/?id="+btnID);
})
.then(function(text){
    console.log(text);
});
//如果这个按钮被 点击了第二次的话，promise p 已经决议，因此第二个 resolve(..) 调用就会被忽略
//为每个事件的发生创建一整个新的 Promise 链
click("#mybtn",function(evt){
    var btnID = evt.currentTarget.id;
    request("http://some.url.1/?id=" + btnID )
    .then(function(text){
        console.log(text);
    })
})
//针对这个按钮上的每个 "click" 事件都会启动一整个新的 Promise
function foo(x,y,cb){
    ajax(
        "http://some.url.1/?x=" + x + "&y=" + y,
        cb
    );
}
foo(11,31,function(err,text){
    if(err){
        console.error( err );
    }
    else {
        console.log( text );
}
});


// polyfill安全的guard检查
if(!Promise.wrap){
    Promise.wrap = function(fn){
        return function(){
            var args=[].slice.call(arguments);
            return new Promise(function(resolve,reject){
                fn.apply(
                    null,
                    args.concat(function(err,v){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(v);
                        }
                    })
                );
            });
        };
    };
}
//它接受一个函数，这个函数需要一个 error-first 风格的回调作为第一个 参数，并返回一个新的函数。返回的函数自动创建一个 Promise 并返回，并替换回调，连 接到 Promise 完成或拒绝
var request = Promise.wrap(ajax);
request("http://some.url.1/")
.then(/* */)
//Promise.wrap(..) 并不产出 Promise。它产出的是一个将产生 Promise 的函数。

// 为ajax(..)构造一个promisory
var request = Promise.wrap(ajax);
function foo(x,y,cb){
    request(
        "http://some.url.1/?x=" + x + "&y=" + y 
    )
    .then(
        function fulfilled(text){
            cb(null,text);
        },
        cb
    );
}

var betterFoo = Promise.wrap(foo);
betterFoo(11,31)
.then(
    function fulfilled(text){
        console.log(text);
    },
    function rejected(err){
        console.log(err);
    }
);