//将值从一种类型转换为另一种类型通常称为类型转换(type casting)，这是显式的情况;隐式的情况称为强制类型转换(coercion)
//JavaScript 中的强制类型转换总是返回标量基本类型值(如字 符串、数字和布尔值，不会返回对象和函数
//类型转换发生在静态类型语言的编译阶段,而强制类型转换则发生在动态类型语言的运行时(runtime)

//var a = 42;
//var b = a + "";// 隐式强制类型转换 "42"。
//var c = String(a);// 显式强制类型转换 "42"。

//抽象操作 ToString，它负责处理非字符串到字符串的强制类型转换。
//var a = 1.07*1000*1000*1000*1000*1000*1000*1000;
//a.toString();//"1.07e+21"

//var a =[1,2,3];
//a.toString();//"1,2,3"

//工具函数 JSON.stringify(..) 在将 JSON 对象序列化为字符串时也用到了 ToString
//JSON.stringify(42);//"42"
//JSON.stringify("42");//""42""
//JSON.stringify(null);"null"
//JSON.stringify(true);"true"

//JSON.stringify(..) 在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在数组中则会返回 null(以保证单元位置不变)
/*
JSON.stringify(undefined);//"undefined"
JSON.stringify(function(){});//"undefined"

JSON.stringify(
    [1,undefined,function(){},4]
);//"[1,null,null,4]"
JSON.stringify(
    {a:2,b:function(){}}
);//"{"a":2}"

var o={};
var a = {
    b:42,
    c:o,
    d:function(){}
};
// 在a中创建一个循环引用
o.e = a;
// 循环引用在这里会产生错误
JSON.stringify(a);
// 自定义的JSON序列化
a.toJSON = function(){
    // 序列化仅包含b
    return{b:this.b};
};
JSON.stringify(a);//"{"b":42}"
*/

//toJSON() 应该“返回一个能够被字符串化的安全的 JSON 值”，而不是“返回 一个 JSON 字符串”。
/*
var a ={
    val:[1,2,3],
    toJSON:function(){
        return this.val.slice(1);
    }
};

var b ={
    val:[1,2,3],
    toJSON:function(){
        return "["+this.val.slice(1).join()+"]";
    }
    //slice(1)提取从位置 1 开始的所有字符
    //join() 方法用于把数组中的所有元素放入一个字符串。
};

JSON.stringify(a);//"[2,3]"
JSON.stringify(b);//""[2,3]""
*/
//这里第二个函数是对 toJSON 返回的字符串做字符串化，而非数组本身。

//我们可以向 JSON.stringify(..) 传递一个可选参数 replacer，
//如果 replacer 是一个数组，那么它必须是一个字符串数组，其中包含序列化要处理的对象 的属性名称，除此之外其他的属性则被忽略
//如果 replacer 是一个函数，它会对对象本身调用一次，然后对对象中的每个属性各调用一次，
/*
var a ={
    b:42,
    c:"42",
    d:[1,2,3]
};
JSON.stringify(a,["b","c"]);//"{"b":42,"c":"42"}"
JSON.stringify(a,function(k,v){
    if(k !== "c")return v;
});
//"{"b":42,"d":[1,2,3]}"
*/

//JSON.string 还有一个可选参数 space，用来指定输出的缩进格式。space 为正整数时是指定 每一级缩进的字符数，它还可以是字符串，此时最前面的十个字符被用于每一级的缩进:
var a={
    b:42,
    c:"42",
    d:[1,2,3]
};
JSON.stringify(a,null,3);
//"{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"
JSON.stringify(a,null,"-----");
//"{
//    -----"b": 42,
//    -----"c": "42",
//    -----"d": [
//    ----------1,
//    ----------2,
//    ----------3
//    -----]
//    }"

//JSON.stringify(..) 并不是强制类型转换,ToString 强制类型转换
//字符串、数字、布尔值和 null 的 JSON.stringify(..) 规则与 ToString 基本相同。
//如果传递给 JSON.stringify(..) 的对象中定义了 toJSON() 方法，那么该方法会在字符串化前调用，以便将对象转换为安全的 JSON 值

//ToNumber
//true 转换为 1，false 转换为 0。undefined 转换为 NaN，null 转换为 0
//ToNumber 对字符串的处理基本遵循数字常量的相关规则 / 语法。处理失败 时返回 NaN
//对象(包括数组)会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型 值，则再遵循以上规则将其强制转换为数字
/*
var a ={
    valueOf: function(){
        return "42";
    }
};

var b = {
    toString:function(){
        return "42";
    }
};

var c = [4,2];
c.toString = function(){
    return this.join("");
};
Number(a);//42
Number(b);//42
Number(c);//42
Number("");//0
Number([]);//0
Number(["abc"]);//NaN
//为了将值转换为相应的基本类型值，抽象操作 ToPrimitive会首先检查该值是否有 valueOf() 方法。 如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString()的返回值(如果存在)来进行强制类型转换

//使用 Object.create(null) 创建的对象 [[Prototype]] 属性为 null，并且没 有 valueOf() 和 toString() 方法，因此无法进行强制类型转换
*/


//ToBoolean
/*
var a = new Boolean(false);
var b = new Number(0);
var c = new String("");
var d = Boolean(a&&b&&c);
d;//true
*/
//在常规 JavaScript 语法基础上自己创建了一些外来(exotic) 值，这些就是“假值对象”。
//假值对象看起来和普通对象并无二致(都有属性，等等)，但将它们强制类型转换为布尔 值时结果为 false

/*
var a = "false";
var b = "0";
var c ="''";
var d = Boolean(a&&b&&c);
d;//true
//不过 "" 除外，因为它是假值列表中唯一的字符串。
*/


//显式强制类型转换
/*
var a = 42;
var b = String(a);

var c = "3.14";
var d = Number(c);

b;//"42"
d;//3.14
*/

/*
var a =42;
var b = a.toString();

var c ="3.14";
var d = +c;
b;//"42"
d;//3.14
*/

//var d = new Date("Mon, 18 Aug 2014 08:53:06 CDT");
//+d;// 1408369986000
//一元运算符 + 的另一个常见用途是将日期(Date)对象强制类型转换为数字，返回结果为 Unix 时间戳，以微秒为单位(从 1970 年 1 月 1 日 00:00:00 UTC 到当前时间):
//var timestamp = +new Date();//1583050123229
//var timestamp = new Date().getTime();
//var timestamp = Date.now()
//应该使用 Date.now() 来获得当前的时间戳，使用 new Date(..).getTime() 来获得指定时间的时间戳

//例如|运算符(字位操作“或”)的空操作(no-op)0 | x，它仅执行ToInt32转换
//0 | -0;//0
//0 | NaN;//0
//0 | Infinity;//0
//0 | -Infinity;//0
//以上这些特殊数字无法以 32 位格式呈现(因此 ToInt32 返回 0
//~x 大致等同于 -(x+1)
//~42;

//JavaScript 中字符串的 indexOf(..) 方法也遵循这一惯例，该方法在字符串中搜索指定的子 字符串，如果找到就返回子字符串所在的位置(从 0 开始)，否则返回 -1
//var a = "hello world";
//if(a.indexOf("ol")>=0){//// true
    //// 找到匹配!
//}
//~a.indexOf("lo"); //-4 <-- 真值!
//~a.indexOf( "ol" );//0 <-- 假值!
//indexOf(..) 返回 -1，~ 将其转换为假值 0

//~~ 中的第一个 ~ 执行 ToInt32 并反转字位，然后第二个 ~ 再进行一次字位反转，即将所有 字位反转回原值，最后得到的仍然是 ToInt32 的结果
//Math.floor(-49.6);//-50
//~~-49.6;//-49

//~~1E20 /10;//// 166199296
//(1E20 | 0) / 10;//166199296

var a = "42";
var b = "42px";
Number(a);//42
parseInt (a);//42
Number(b);//NaN
parseInt(b);//42
//解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停 止。而转换不允许出现非数字字符，否则会失败并返回 NaN
//parseInt(..) 针对的是字符串值。向 parseInt(..) 传递数字和其他类型的参数是 没有用的

//ES5 之前的 parseInt(..) 有一个坑导致了很多 bug,即如果没有第二个参数来指定转换的 基数(又称为 radix)，parseInt(..) 会根据字符串的第一个字符来自行决定基数。
/*
var hour =parseInt(selectedHour.value);
var minute = parseInt(selectedMinute.value);
console.log(
    "The time you selected was:"+hour+":"+minute
);
//上面的代码看似没有问题，但是当小时为 08、分钟为 09 时，结果是 0:0，因为 8 和 9 都不是有效的八进制数。

var hour =parseInt(selectedHour.value,10);
var minute = parseInt(selectedMinute.value,10);
//从 ES5 开始 parseInt(..) 默认转换为十进制数，除非另外指定。如果你的代码需要在 ES5 之前的环境运行，请记得将第二个参数设置为 10
*/

/*
parseInt(new String("42"));//42
var a ={
    num:21,
    toString:function(){return String(this.num*2);}
};
parseInt(a);//42

parseInt( 1/0, 19 ); // 18
//parseInt(1/0, 19) 实际上是 parseInt("Infinity", 19)。第一个字符是 "I"，以 19 为基数 时值为 18。第二个字符 "n" 不是一个有效的数字字符，解析到此为止

parseInt( 0.000008 );//0
parseInt( 0.0000008 );//8
parseInt( false, 16 );//250
parseInt(parseInt,16);//15

parseInt("0x10");//16
parseInt("103",2);//2
*/

/*
var a = "0";
var b = [];
var c ={};

var d ="";
var e = 0;
var f = null;
var g;

Boolean(a);//true
Boolean(b);//true
Boolean(c);//true

Boolean(d);//false
Boolean(e);//false
Boolean(f);//false
Boolean(g);//false

//一元运算符 ! 显式地将值强制类型转换为布尔值。但是它同时还将真值反转为假值.显式强制类型转换为布尔值最常用的方法是 !!

!!a;//true
!!b;//true
!!c;//true

!!d;//false
!!e;//false
!!f;//false
!!g;//false


var a =[
    1,
    function(){},
    2,
    function(){}
];

JSON.stringify(a);

JSON.stringify(a,function(key,val){
    if(typeof val == "function"){
        return !!val;
    }
    else{
        return val;
    }
});
//"[1,true,2,true]"

var a =42;
var b = a?true:false;
//三元运算符 ? : 判断 a 是否为真，如果是则将变量 b 赋值为 true，否则赋值为 false
*/


//布尔值隐式强制类型转换。
//1、if (..)语句中的条件判断表达式。
//2、for ( .. ; .. ; .. )语句中的条件判断表达式(第二个)
//3、while (..) 和 do..while(..) 循环中的条件判断表达式。
//4、? :中的条件判断表达式。
//5、逻辑运算符 ||(逻辑或)和 &&(逻辑与)左边的操作数(作为条件判断表达式)
/*
var a =42;
var b ="abc";
var c;
var d = null;

if(a){
    console.log("yep");
}

while(c){
    console.log("nope,never runs");
}

c = d? a:b;
c;//"abc"

if((a&&d)||c){
    console.log("yep");
}//// yep

//|| 和 &&
//它们的返回值是两个操作数中的一个(且仅一个)。即选择两个操作数中的一个，然后返回它的值。

var a =42;
var b ="abc";
var c = null;

a||b;//42
a&&b;//"abc"

c||b;//"abc"
c&&b;//null

//|| 和 && 首先会对第一个操作数(a 和 c)执行条件判断，如果其不是布尔值(如上例)就 先进行 ToBoolean 强制类型转换，然后再执行条件判断

//对于 || 来说，如果条件判断结果为 true 就返回第一个操作数(a 和 c)的值，如果为 false 就返回第二个操作数(b)的值

//&& 则相反，如果条件判断结果为 true 就返回第二个操作数(b)的值，如果为 false 就返 回第一个操作数(a 和 c)的值

function foo(a,b){
    a=a||"hello";
    b=b||"world";

    console.log(a+""+b);
}
foo();//helloworld
foo("yeah","yeah!")//yeahyeah!

function foo(){
    console.log(a);
}
var a =42;
a&&foo();//42

var a = 42;
var b = null;
var c = "foo";
if (a && (b || c)) {
         console.log( "yep" );
}
//这里a && (b || c)的结果实际上是"foo"而非true，然后再由if将foo强制类型转换为布尔值，所以最后结果为 true

//这里发生了隐式强制类型转换。如果要避免隐式强制类型转换就得这样:

if (!!a && (!!b || !!c)) {
    console.log( "yep" );
}
*/
//ES6 允许 从符号到字符串的显式强制类型转换，然而隐式强制类型转换会产生错误
/*
var s1 =Symbol("cool");
String(s1);//"Symbol(cool)"

var s2 = Symbol("not cool");
s2+"";// // TypeError

//宽松相等和严格相等
//== 允许在相等比较中进行强制类型转换，而 === 不允许。”

var a = 42;
var b = "42";
a===b;// false
a == b;// true

var x = true;
var y = "42";
x == y;//false
//Type(x)是布尔值，所以ToNumber(x)将true强制类型转换为1，变成1 == "42"，二者的类型仍然不同，"42" 根据规则被强制类型转换为 42，最后变成 1 == 42，结果为 false
*/
/*
var a = "42";
//// 不要这样用，条件判断不成立:
if(a == true){}
//// 也不要这样用，条件判断不成立:
if(a === true){}
//// 这样的显式用法没问题:
if(a){}
//// 这样的显式用法更好:
if(!!a){}
// 这样的显式用法也很好:
if(Boolean(a)){}
*/
//(1) 如果 x 为 null，y 为 undefined，则结果为 true。
//2) 如果 x 为 undefined，y 为 null，则结果为 true。

var a =null;
var b;

a==b;//true
a==null;//true
b==null;//true

a == false;// false
b == false;// false
b == "";// false
a == "";// false
a == 0;// false
b == 0;// false

var a = doSomething();
if(a == null){}
//条件判断a == null仅在doSomething()返回非null和undefined时才成立
var a = doSomething();
     if (a === undefined || a === null) {}
  
//关于对象(对象 / 函数 / 数组)和标量基本类型(字符串 / 数字 / 布尔值)之间的相等比 较     

//如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == ToPrimitive(y) 的结果;

//如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 ToPromitive(x) == y 的结果。
var a =42;
var b =[42];
a == b;
//[ 42 ] 首先调用 ToPromitive 抽象操作，返回 "42"，变成 "42" == 42,又变成 42 == 42，最后二者相等\

var a = "abc";
var b = Object(a);

a===b;//false
a==b;//true

var a = null;
var b = Object(a);
a == b;//false

var c = undefined;
var d = Object(c);
c == d;

var e =NaN;
var f = Object(e);
e == f;
//因为没有对应的封装对象，所以 null 和 undefined 不能够被封装(boxed)，Object(null) 和 Object() 均返回一个常规对象
//NaN能够被封装为数字封装对象，但拆封之后NaN == NaN返回false，因为NaN不等于NaN

//比较少见的情况
//1. 返回其他数字
Number.prototype.valueOf = function(){
    return 3;
};

new Number(2)==3;//true
//Number(2) 涉及 ToPrimitive 强制类型 转换，因此会调用 valueOf()

var i = 2;
Number.prototype.valueOf = function(){
    return i++;
};
var a = new Number(42);
if(a == 2 && a == 3){
    console.log("yep,this happened.")
}//yep,this happened.
//如果让 a.valueOf() 每次调用都产生副作用，比如第一次返回 2，第二次返回 3，就会出现这样的情况。