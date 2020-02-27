//数组
//var a =[1,"2",[3]];
//a.length;//3
//a[0] === 1;//true
//a[2][0]===3;//true

//对数组声明后即可向其中加入值，不需要预先设定大小(

/*
var a =[];
a.length;
a[0]= 1;
a[1]="2";
a[2] = [3];
a.length;//3
*/

//稀疏”数组(sparse array，即含有空白或空缺单元的数组)
/*
var a=[];
a[0] =1;
a[2]=[3];
a[1];// undefined
a.length;//3
*/
//数组通过数字进行索引，但有趣的是它们也是对象，所以也可以包含字符串键值和属性
/*
var a=[];
a[0]=1;
a["foobar"]=2;
a.length;//1
a["foobar"];//2
a.foobar;//2
*/
//如果字符串键值能够被强制类型转换为十进制数字的话，它 就会被当作数字索引来处理。
/*
var a =[];
a["13"] =42;
a.length;
*/

//类数组
//将类数组(一组通过数字索引的值)转换为真正的数组，这一般通过数组工具函如 indexOf(..)、concat(..)、forEach(..) 等来实现。
//一些 DOM 查询操作会返回 DOM 元素列表，它们并非真正意义上的数组，但十分 类似。另一个例子是通过 arguments 对象(类数组)将函数的参数当作列表来访问(从 ES6 开始已废止)
/*
function foo(){
    var arr =Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}

foo("bar","baz");//["bar","baz","bam]
*/
//slice() 返回参数列表(上例中是一个类数组)的一个数组复本。
//用 ES6 中的内置工具函数 Array.from(..) 也能实现同样的功能:
//var arr =Array.from(arguments);


/*
//字符串
var a ="foo";
var b =["f","o","o"];
//字符串和数组的确很相似，它们都是类数组，都有 length 属性以及 indexOf(..)和 concat(..) 方法
a.length;//3
b.length;//3
a.indexOf("o");//1
b.indexOf("o");//1

var c = a.concat("bar");//"foobar"
var d =b.concat(["b","a","r"]);["f","o","o","b","a","r"]
a===c;//false
b===d;//false

a;//"foo"
b;//["f","o","o"]

//但这并不意味着它们都是“字符数组”,JavaScript 中字符串是不可变的，而数组是可变的
a[1]="a";
b[1]="a";

a;//foo
b;//["f","a","o"]

c=a.toUpperCase();//FOO
a === c;//false
b.push("!");
b;//["f", "a", "o", "!"]

//许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过“借用”数 组的非变更方法来处理字符串
a.join; // undefined
a.map; // undefined

var c = Array.prototype.join.call(a,'-');
var d = Array.prototype.map.call(a,function(v){
    return v.toUpperCase()+".";
}).join("");

console.log(c);//f-o-o
console.log(d);//F.O.O.

//数组有一个字符串没有的可变更成员函数 reverse():
console.log(a.reverse);//undefined
console.log(b.reverse());[ '!', 'o', 'a', 'f' ]
//我们无法“借用”数组的可变更成员函数，因为字符串是不可变的:
//console.log(Array.prototype.reverse.call( a ));

//一个变通(破解)的办法是先将字符串转换为数组，待处理完后再将结果转换回字符串

var c = a.split("").reverse().join("");
console.log(c);//oof
*/

/*
//数字
//JavaScript 只有一种数值类型:number(数字)，包括“整数”和带小数的十进制数。此处 “整数”之所以加引号是因为和其他语言不同，JavaScript 没有真正意义上的整数
//JavaScript 中的“整数”就是没有小数的十进制数。所以 42.0 即等同于“整数”42。

var a = 42;
var b = 42.3

var a = 0.42;
//数字前面的 0 可以省略:
var b = .42

var a = 42.0
//小数点后小数部分最后面的 0 也可以省略:
var b =42.

var a = 42.300;
var b = 42.0;
//认情况下大部分数字都以十进制显示，小数部分最后面的 0 被省略
a;//42.3
b;//42

//特别大和特别小的数字默认用指数格式显示，与 toExponential() 函数的输出结果相同
var a = 5E10;
a;
a.toExponential();//"5e+10"

var b = a*a;
b;//2.5e+21

var c = 1/a;
c;//2e-11

//由于数字值可以使用 Number 对象进行封装,因此数字值可以调用 Number.prototype 中的方法
//tofixed(..) 方法可指定小数部分的显示位数:
var a = 42.59;
a.toFixed(0);//43
a.toFixed(1);//42.6
a.toFixed(3);//42.590

//toPrecision(..) 方法用来指定有效数位的显示位数:
var a = 42.59;
a.toPrecision(1);//"4e+1"
a.toPrecision(2);//"43"
a.toPrecision(4);//"42.59"

//42.tofixed(3) 是无效语法，因为 . 被视为常量 42. 的一部分，所以没有 . 属 性访问运算符来调用 tofixed 方法。
(42).toFixed(3);//42.000
42 .toFixed(3);//42.000
0.42.toFixed( 3 ); // "0.420"

//数字常量还可以用其他格式来表示，如二进制、八进制和十六进制。
0xf3;//243的十六进制
0o363; // 243的八进制
0b11110011; // 243的二进制

0.1+0.2 ===0.3;//false
//“机器精度”(machine epsilon),这个值通常是 2^-52
if(!Number.EPSILON){
    Number.EPSILON = Math.pow(2,-52);
}

function numbersCloseEnoughToEqual(n1,n2){
    return Math.abs(n1-n2)<Number.EPSILON;
}
var a = 0.1+0.2;
var b = 0.3
numbersCloseEnoughToEqual(a,b);//true
numbersCloseEnoughToEqual(0.0000001,0.0000002);//false
Number.MAX_VALUE = 1.798e+308;
Number.MIN_VALUE =  5e-324;
Number.MAX_SAFE_INTEGER = 2^53 - 1//9007199254740991
Number. MIN_SAFE_INTEGER =-9007199254740991

//整数检测
Number.isInteger(42);//true
Number.isInteger(42.3);//false
Number.isInteger(42.000);//true
// ES6 之前的版本 polyfill Number.isInteger(..) 方法
if(!Number.isInteger){
    Number.isInteger = function(num){
        return typeof num == "number"&& num % 1 ==0;
    };
}

//要检测一个值是否是安全的整数，可以使用 ES6 中的 Number.isSafeInteger(..) 方法
Number.isSafeInteger(Number.MAX_SAFE_INTEGER);//true
Number.isSafeInteger(Math.pow(2,53));//false
// ES6 之前的版本 polyfill Number.isSafeInteger(..) 方法
if(!Number.isSafeInteger){
    Number.isSafeInteger = function(num){
        return Number.isInteger(num)&& Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    };
}
*/


/*
//特殊数值
//null 指空值(empty value),undefined 指没有值(missing value),undefined 指从未赋值,null 指曾赋过值，但是目前没有值

//在非严格模式下，我们可以为全局标识符 undefined 赋值
function foo(){
    undefined = 2;
}
foo();
function foo(){
    "use strict";
    undefined = 2;//TypeError!
}
foo();

var a = 42;
console.log(void a,a);// undefined 42
//用void 0来获得undefined

function doSomething() {
    // 注:APP.ready 由程序自己定义 
    if (!APP.ready) {
    // 稍后再试
                 return void setTimeout( doSomething,100 );
             }
    var result;
    // 其他
             return result;
         }
    // 现在可以了吗?
    if (doSomething()) {
    // 立即执行下一个任务 
}

//这里 setTimeout(..) 函数返回一个数值(计时器间隔的唯一标识符，用来取消计时)，但是为了确保 if 语句不产生误报(false positive)，我们要 void 掉它。

//特殊的数字
//NaN 意指“不是一个数字”,“无效数值”“失败数值”或者“坏数值”
var a = 2/ "foo";//NaN
typeof a === "number"//true
//不是数字的数字”仍然是数字类型

a==NaN;//false
a===NaN;//false
//NaN是一个特殊值，它和自身不相等
//即x === x不 成立,而 NaN != NaN 为 true
isNaN(a);
//使用内建的全局工具函数 isNaN(..) 来判断一个值是否是 NaN

var a = 2 / "foo";
var b = "foo";
a; // NaN
b; "foo"
window.isNaN( a ); // true window.isNaN( b ); // true——晕!
//从 ES6 开始我们可以使用工具函数 Number.isNaN(..)。ES6 之前的浏览器的 polyfill 如下:
if(!Number.isNaN){
    Number.isNaN = function(n){
        return(
            typeof n === "number"&&window.isNaN(n)
        );
    };
}
var a = 2/"foo";
var b = "foo";

Number.isNaN(a);// true
Number.isNaN(b);// false

//实际上还有一个更简单的方法，即利用 NaN 不等于自身这个特点。NaN 是 JavaScript 中唯 一一个不等于自身的值。
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    };
}

//无穷数
//和纯粹的数学运算不同，JavaScript 的运算结果有可能溢出，此时结果为 Infinity 或者 -Infinit

var a = Number.MAX_VALUE;// 1.7976931348623157e+308
a+a;//Infinity
a + Math.pow( 2, 970 );//// Infinity
a + Math.pow( 2, 969 );//1.7976931348623157e+308
//如果数学运算(如加法)的结果超出处理范围,“就近取整”
//相对于 Infinity，Number.MAX_ VALUE + Math.pow(2, 969)与Number.MAX_VALUE更为接近，因此它被“向下取整”(round down);而 Number.MAX_VALUE + Math.pow(2, 970) 与 Infinity 更为接近，所以它被“向上 取整”(round up)。

// 零值
//javaScript 有一个常规的 0(也叫作 +0)和一个 -0
var a = 0 / -3;// -0
var b = 0 * -3;//-0
//加法和减法运算不会得到负零。
//对负零进行字符串化会返回 "0":
a.toString();//"0"
a+"";//"0"
String(a)//"0"
JSON.stringify(a);//"0"把 JavaScript 对象转换为字符串。

//如果反过来将其从字符串转换为数字，得到的结果是准确的:

+"-0";//-0
Number( "-0" );     // -0
JSON.parse( "-0" ); // -0 JSON字符串转为一个对象。

var a =0;
var b =0/ -3;

a == b;//true

-0 == 0;//true
a===b;//true
-0 === 0;//true

0>-0;//false
a>b;//false

function isNegZero(n){
    n= Number(n);
    return(n == 0)&&(1/n === -Infinity);
}

isNegZero(-0);//true
isNegZero( 0 / -3 );//true
isNegZero( 0 );//false

//ES6 中新加入了一个工具方法 Object.is(..) 来判断两个值是否绝对相等

var a = 2 / "foo";
var b = -3 * 0;

Object.is(a,NaN);//true
Object.is(b,-0);//true
Object.is(b,0);//false

//对于 ES6 之前的版本，Object.is(..) 有一个简单的 polyfill:
//Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。

if(!Object.is){
    Object.is = function(v1,v2){
        if(v1===0&&v2===0){
            return 1/v1 === 1/v2;
        }
        if(v1 !== v1){
            return v2 !== v2;
        }
        return v1 === v2;
    }
}
*/

var a = 2;
var b = a; // b是a的值的一个副本 b++;
a; // 2
b; // 3
var c = [1,2,3];
var d = c; // d是[1,2,3]的一个引用 
d.push( 4 );
c; // [1,2,3,4]
d; // [1,2,3,4]
//简单值(即标量基本类型值，scalar primitive)总是通过值复制的方式来赋值 / 传递，包括 null、undefined、字符串、数字、布尔和 ES6 中的 symbol

//复合值(compound value)——对象(包括数组和封装对象)和函数，则总 是通过引用复制的方式来赋值 / 传递

//上例中 2 是一个标量基本类型值，所以变量 a 持有该值的一个复本，b 持有它的另一个复 本。b 更改时，a 的值保持不变。

//c 和 d 则分别指向同一个复合值 [1,2,3] 的两个不同引用。请注意，c 和 d 仅仅是指向值 [1,2,3]，并非持有。所以它们更改的是同一个值(如调用 .push(4))，随后它们都指向更 改后的新值 [1,2,3,4]

//引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向
var a = [1,2,3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]
// 然后
b = [4,5,6]; a; // [1,2,3] b; // [4,5,6]

function foo(x){
    x.push(4);
    x;

    x=[4,5,6];
    x.push(7);
    x;
}
var a = [1,2,3];
foo(a);
a;//[1,2,3,4]
//我们向函数传递 a 的时候，实际是将引用 a 的一个复本赋值给 x，而 a 仍然指向 [1,2,3]。 在函数中我们可以通过引用x来更改数组的值(push(4)之后变为[1,2,3,4])。但x = [4,5,6] 并不影响 a 的指向，所以 a 仍然指向 [1,2,3,4]

//如果通过值复制的方式来传递复合值(如数组)，就需要为其创建一个复本，这样传递的 就不再是原始值
foo( a.slice() );
//slice(..) 不带参数会返回当前数组的一个浅复本(shallow copy)。由于传递给函数的是指向该复本的引用，所以 foo(..) 中的操作不会影响 a 指向的数组

//如果要将标量基本类型值传递到函数内并进行更改，就需要将该值封装到一个复合值(对象、数组等)中，然后通过引用复制的方式传递
function foo(wrapper) {
    wrapper.a = 42;
}
var obj = { a: 2
};
foo( obj );
obj.a; // 42
//这里 obj 是一个封装了标量基本类型值 a 的封装对象。obj 引用的一个复本作为参数 wrapper 被传递到 foo(..) 中。这样我们就可以通过 wrapper 来访问该对象并更改它的属 性。函数执行结束后 obj.a 将变成 4

//虽然传递的是指向数字对象的引用复本，但我们并不能通过它来更改其 中的基本类型值:
function foo(x) {
    x = x + 1;
x; // 3 
}
var a = 2;
var b = new Number( a ); // Object(a)也一样
foo( b );
console.log( b ); // 是2，不是3
//x = x + 1中，x中的标量基本类型值2从数字对象中拆封(或者提取)出来后，x就神不 知鬼不觉地从引用变成了数字对象，它的值为2 + 1等于3。然而函数外的b仍然指向原 来那个值为 2 的数字对象。
