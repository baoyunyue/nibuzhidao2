//JavaScript 有七种内置类型:1.null空值 2.undefined 3.boolean 4.number 5.string 6.对象object 7.符号symbol
/*
typeof undefined === "undefined";// true
typeof true === "boolean";// true
typeof 42 ==="number";// true
typeof "42" === "string";// true
typeof {life:42} ==="object";// true
typeof Symbol() === "symbol";// true

typeof null ==="object";//true

//我们需要使用复合条件来检测 null 值的类型:
var a = null;
(!a && typeof a === "object");//true
//null 是基本类型中唯一的一个“假值”(falsy 或者 false-like，参见第 4 章)类型，typeof对它的返回值为 "object"。

typeof function a(){} === "function";//true
//function(函数)也是 JavaScript 的一个内置类型。 它实际上是 object 的一个“子类型”。具体来说，函数是“可调用对象”，它有一个内部属 性 [[Call]]，该属性使其可以被调用
function a(b,c){}
a.length;//2
//函数对象的 length 属性是其声明的参数的个数:

typeof [1,2,3] === "object"; // true
//数组也是对象。确切地说，它也是 object 的一个“子类型”，数组的 元素按数字顺序来进行索引，其 length 属性是元 素的个数。
*/

//JavaScript 中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。
//var a =42;
//typeof a; // "number"

//a=true;
//typeof a; // "boolean"

//typeof 运算符总是会返回一个字符串:
//typeof typeof 42;//"string"
//typeof 42 首先返回字符串 "number"，然后 typeof "number" 返回 "string"。

//变量在未持有值的时候为 undefined。此时 typeof 返回 "undefined"
/*
var a;
typeof a;
var b =42;
var c;
b = c;
typeof b;// "undefined"
typeof c;
*/
//已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明 过的变量，是 undeclared 的

//var a;
//a;// undefined
//b;// ReferenceError: b is not defined

var a;
typeof a;// "undefined"
typeof b;// "undefined"
//对于 undeclared(或者 not defined)变量，typeof 照样返回 "undefined"

//在程序中使用全局变量 DEBUG 作为“调试模式”的开关。在输出调试信 息到控制台之前，我们会检查 DEBUG 变量是否已被声明。顶层的全局变量声明 var DEBUG = true 只在 debug.js 文件中才有，而该文件只在开发和测试时才被加载到浏览器，在生产环 境中不予加载。
//问题是如何在程序中检查全局变量 DEBUG 才不会出现 ReferenceError 错误。这时 typeof 的 安全防范机制就成了我们的好帮手

// 这样会抛出错误
/*
if(DEBUG){
    console.log("Debugging is starting");
}
// 这样是安全的
if(typeof DEBUG !== "undefined" ){
    console.log("Debugging is starting");
}
//对内建的 API 也有帮助
if(typeof atob === "undefined"){
    atob = function(){};
}
*/

//还有一种不用通过 typeof 的安全防范机制的方法，就是检查所有全局变量是否是全局对象 的属性，浏览器中的全局对象是 window。所以前面的例子也可以这样来实现:
if(window.DEBUG){
    //...
}
if(!window.atob){
    //...
}

function doSomethingCool(){
    var helper = (typeof FeatureXYZ !== "undefined")?
    FeatureXYZ:
    function(){};
    var val = helper();
}
//其他模块和程序引入 doSomethingCool() 时，doSomethingCool() 会检查 FeatureXYZ 变量是 否已经在宿主程序中定义过;如果是，就用现成的，否则就自己定义:
(function(){
    function FeatureXYZ(){}

    function doSomethingCoolO(){
        var helper =
                 (typeof FeatureXYZ !== "undefined") ?
                 FeatureXYZ :
                 function() { /*.. default feature ..*/ };
             var val = helper();
    }
    doSomethingCool();
})();
//这里，FeatureXYZ 并不是一个全局变量，但我们还是可以使用 typeof 的安全防范机制来做 检查

//还有一些人喜欢使用“依赖注入”(dependency injection)设计模式，就是将依赖通过参数 显式地传递到函数中，
function doSomethingCool(FeatureXYZ) {
    var helper = FeatureXYZ ||
        function() { /*.. default feature ..*/ };
    var val = helper();
    // ..
}