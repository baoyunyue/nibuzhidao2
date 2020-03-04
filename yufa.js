/*
var a,b;
a = eval("if (true){b =4+38}");
a;//不要使用 eval(..)

//表达式的副作用
function foo(){
    a=a+1;
}
var a = 1;
foo();//// 结果值:undefined。副作用:a的值被改变
*/

/*
var a = 42;
var b =a++;
a;//43
b;//42

var a = 42;
a++;//42
a;//43
++a;//44
a;//44
*/

/*
var a = 42;
var b = (a++);
a;//43
b;//42
*/
/*
var obj ={
    a:42
};
obj.a;
delete obj.a;
obj.a;
*/

/*
function vowels(str){
    var matches;
    if(str){
        matches = str.match(/[aeiou]/g);
        if(matches){
            return matches;
        }
    }
}
vowels("Hello World");//["e", "o", "o"]

function vowels(str){
    var matches;
    if(str&&(matches = str.match(/[aeiou]/g))){
        return matches;
    }
}
vowels("Hello World"); // ["e","o","o"]
*/

{
    foo:Bar();
}
//{ .. }在这里只是一个普通的代码块
//foo 是语句 bar() 的标签(后面没有 ;

//// 标签为foo的循环
foo:for(var i = 0;i<4;i++){
    for(var j=0;j<4;j++){
        // 如果j和i相等，继续外层循环
        if(j == i){
            // 跳转到foo的下一个循环
            continue foo;
        }
        // 跳过奇数结果
        if((j*i)%2 == 1){
            // 继续内层循环(没有标签的)
            continue;
        }
        console.log(i,j);
    }
}
// 1 0
// 2 0
// 2 1
// 3 0
// 3 2
//上例中continue跳过了循环3 1，continue foo(带标签的循环跳转，labeled-loopjump) 跳过了循环1 1和2 2

//带标签的循环跳转一个更大的用处在于，和break __一起使用可以实现从内层循环跳转到 外层循环。

/*
//// 标签为foo的循环
foo:for(var i = 0;i < 4;i++){
    for(var j=0;j<4;j++){
        if((i*j)>=3){
            console.log("stopping!",i,j);
            break foo;
        }
        console.log(i,j);
    }
}
// 0 0
// 0 1
// 0 2
// 0 3
// 1 0
// 1 1
// 1 2
// 停止! 1 3
function foo(){
    bar:{
        console.log("Hello");
        break bar;
        console.log("never runs")
    }
    console.log("world");
}

foo();
// Hello
// World

//{"a":42} 作为 JSON 值没有任何问题，但是在作为代码执行时会产生错误，因为它会被当 作一个带有非法标签的语句块来执行。foo({"a":42}) 就没有这个问题，因为 {"a":42} 在 这里是一个传递给 foo(..) 的对象常量。所以准确地说，JSON-P 能将 JSON 转换为合法的 JavaScript 语法。
*/

//[]+{};//"[object object]"
//{}+[];//0

//第一行代码中，{} 出现在 + 运算符表达式中，因此它被当作一个值(空对象)来处理。 [] 会被强制类型转换为 ""，而 {} 会被强制类型转换为 "[object Object]"
//{} 被当作一个独立的空代码块(不执行任何操作)。代码块结尾不需 要分号，所以这里不存在语法上的问题。最后 + [] 将 [] 显式强制类型转换为 0。

/*
function getData(){
    return{
        a:42,
        b:"foo"
    };
}
var {a,b} = getData();
console.log(a,b);// 42 "foo"
*/
//{a,b}=...就是 ES6 中的解构赋值，相当于下面的代码
//var res = getData();
//var a = res.a;
//var b = res.b;

/*
function foo({a,b,c}){
   // var a =obj.a,b=obj.b,c=obj.c
    console.log(a,b,c)
}
foo({
    c:[1,2,3],
    a:42,
    b:"foo"
});
*/
// 42 "foo" [1, 2, 3]

/*
var a = 42;
var b ="foo";
var c =[1,2,3];
a&&b||c;//"foo"
a||b&&c;//42
*/

/*
var a =42,b;
b = (a++,a);
a;//43
b;//43

var a = 42,b;
b = a++,a;
a;//43
b;//42
//原因是 , 运算符的优先级比 = 低。所以 b = a++, a 其实可以理解为 (b = a++), a。前面说过 a++ 有后续副作用(after side effect)，所以 b 的值是 ++ 对 a 做递增之前的值 42。

//用 , 来连接一系列语句的时候，它的优先级最低，
其他操作数的优先级都比它高。
*/

//if (str && (matches = str.match( /[aeiou]/g ))) {
    // ..
//}
//这里对赋值语句使用( )是必要的，因为&&运算符的优先级高于=，如果没有( )对其中 的表达式进行绑定(bind)的话，就会执行作 (str && matches) = str.match..

/*
var a =42;
var b ="foo";
var c = false;

var d = a&&b||c?c||b?a:c&&b:a;
d;//42

// ((a && b) || c) ? ((c || b) ? a : (c && b)) : a
//(1) (a && b) 结果为 "foo"。
(2) "foo" || c 结果为 "foo"。 
(3) 第一个 ? 中，"foo" 为真值。 
(4) (c || b) 结果为 "foo"。
(5) 第二个 ? 中，"foo" 为真值。 
(6) a 的值为 42。




*/

//(a && b || c) ? (c || b) ? a : (c && b) : a
// && 运算符的优先级高于 ||，而 || 的优先级又高于 ? :

//a ? b : c ? d : e;
//? : 是右关联
//a ? b : (c ? d : e)

//有时 JavaScript 会自动为代码行补上缺失的分号，即自动分号插入(Automatic Semicolon Insertion，ASI)。
/*
var a = 42, b ="foo";
a
b //"foo"

var a = 42;
do {
// ..
} while (a) // <-- 这里应该有; a;
//此时 ASI 就会自动补上分号。
*/

//对象常量不能包含多个同名属性:
/*
(function(){
    "use strict";

    var a ={
        b:42,
        b:43
    };
})();
*/


//TDZ(暂时性死区) 指的是由于代码中的变量还没有初始化而不能被引用的情况
/*
{
    typeof a;// undefined
    typeof b; // ReferenceError! (TDZ)
    let b;
    let b;
}

function foo( a =42,b=a+1){
    console.log(a,b);
}
foo();//42 43
foo(undefined);//42 43
foo(5);//5 6
foo(void 0,7);//42 7
foo(null);//null 1
//表达式 a + 1 中 null 被强制类型转换为 0

function foo(a){
    a = 42;
    console.log(arguments[0]);
}
foo(2);//42(linked)
foo();//undefined(not linked)
//向函数传递参数时，arguments 数组中的对应单元会和命名参数建立关联(linkage)以得 到相同的值。相反，不传递参数就不会建立关联。

function foo(a){
    "use strict";
    a = 42;
    console.log(arguments[0]);
}

foo(2);//2 (not linked)
foo();//undefined 

//在 ES6 之前，获得函数所有参数的唯一途径就是 arguments 数组。此外，即使将命名参数 和 arguments 数组混用也不会出错，只需遵守一个原则，即不要同时访问命名参数和其对 应的 arguments 数组单元。

function foo(a){
    console.log(a+arguments[1]);
}
foo(10,32);//42

*/

function foo(){
    try{
        return 42;
    }
    finally{
        console.log("Hello");
    }
    console.log("never runs");
}
console.log(foo());
//Hello
//never runs
//42
//这里return 42先执行，并将foo()函数的返回值设置为42。然后try执行完毕，接着执 行 finally。最后 foo() 函数执行完毕，console.log(..) 显示返回值。

/*
function foo(){
    try{
        throw 42;
    }
    finally{
        console.log("Hello");
    }
    console.log("never runs")
}

console.log(foo());
// Hello
// Uncaught Exception: 42
*/

/*
function foo(){
    try{
        return 42;
    }
    finally{
        throw "Oops!";
    }
    console.log("never runs");
}
console.log(foo());
// Uncaught Exception: Oops!

*/

for (var i=0;i<10;i++){
    try{
        continue;
    }
    finally{
        console.log(i);
    }
}
//// 0 1 2 3 4 5 6 7 8 9
//continue 在每次循环之后，会在 i++ 执行之前执行 console.log(i)，所以结果是 0..9 而非1..10。
//finally 中的 return 会覆盖 try 和 catch 中 return 的返回值:

function foo(){
    try{
        return 42;
    }
    finally{
        //// 没有返回语句，所以没有覆盖
    }
}
function bar(){
    try{
        return 42;
    }
    finally{
        // 覆盖前面的 return 42
        return;
    }
}

function baz(){
    try{
        return 42;
    }
    finally{
        // 覆盖前面的 return 42
        return "Hello"
    }
}

foo();//42
bar();//undefined
baz();//Hello
//通常来说，在函数中省略return的结果和return;及return undefined;是一样的，但是 在 finally 中省略 return 则会返回前面的 return 设定的返回值

function foo(){
    bar:{
        try{
            return 42;
        }
        finally{
            // 跳出标签为bar的代码块
            break bar;
        }
    }
    console.log("Crazy");
    return "Hello";
}
console.log(foo());
// Crazy
// Hello

switch(a){
    case 2:
        // 执行一些代码
        break;
    case 42:
        //// 执行一些代码
        break;
    default:
        //// 执行一些代码
}
//a 和 case 表达式的匹配算法与 === 相同。通常 case 语句中的 switch 都是简单值

var a = "42";
switch(true){
    case a==10:
    console.log("10 or '10'");
    break;
    case a == 42:
    console.log("42 or '42'");
    break;
    default:
        // 永远执行不到这里
}
//42 or '42'
//它会将表达式的结果值和 true 进行比较。 因为 a == 42 的结果为 true，所以条件成立。

var a = "hello world";
var b = 10;
switch (true) {
        case (a || b == 10):
// 永远执行不到这里
                break;
        default:
                console.log( "Oops" );
}
// Oops

//因为(a || b == 10)的结果是"hello world"而非true，所以严格相等比较不成立。此时 可以通过强制表达式返回 true 或 false，如 case !!(a || b == 10):

var a = 10;
switch(a){
    case 1:
    case 2:
        // 永远执行不到这里
    default:
        console.log("default");
    case 3:
        console.log("3");
        break;
    case 4:
        console.log("4");
}
// default
// 3

//上例中的代码是这样执行的，首先遍历并找到所有匹配的 case，如果没有匹配则执行default中的代码。因为其中没有break，所以继续执行已经遍历过的case 3代码块，直 到 break 为止。

//JavaScript 中有很多错误类型，分为两大类:早期错误(编译时错误，无法被捕获)和运 行时错误(可以通过 try..catch 来捕获)。所有语法错误都是早期错误，程序有语法错误 则无法运行。

//函数参数和命名参数之间的关系非常微妙。尤其是 arguments 数组，它的抽象泄漏给我们 挖了不少坑。因此，尽量不要使用 arguments，如果非用不可，也切勿同时使用 arguments 和其对应的命名参数。
