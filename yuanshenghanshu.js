//常用的原生函数
//String(),Number(),Boolean(),Array(),Object(),Function(),RegExp(),Date(),Error(),Symbol()
//var s = new String("Hello world!");
//console.log(s.toString());
//var a = new String("abc");
//typeof a;//"object"
//a instanceof String;//true 实例a在不在String构造函数中
//Object.prototype.toString.call(a);//"[object String]"
//通过构造函数(如new String("abc"))创建出来的是封装了基本类型值(如"abc")的封 装对象
//可以这样来查看封装对象:
//console.log(a)//["a","b","c"]

//在JavaScript里使用typeof判断数据类型，只能区分基本类型，即：number、string、undefined、boolean、object。对于null、array、function、object来说，使用typeof都会统一返回object字符串。

//要想区分对象、数组、函数、单纯使用typeof是不行的。在JS中，可以通过Object.prototype.toString方法，判断某个对象之属于哪种内置类型。分为null、string、boolean、number、undefined、array、function、object、date、math。
//Object.prototype.toString.call(null); // "[object Null]"
//Object.prototype.toString.call(undefined); // "[object Undefined]"
//Object.prototype.toString.call("abc");// "[object String]"
//Object.prototype.toString.call(123);// "[object Number]"
//Object.prototype.toString.call(true);// "[object Boolean]"

//所有 typeof 返回值为 "object" 的对象(如数组)都包含一个内部属性 [[Class]](我们可 以把它看作一个内部的分类，而非传统的面向对象意义上的类)。这个属性无法直接访问， 一般通过 Object.prototype.toString(..) 来查看

//Object.prototype.toString.call([1,2,3]);// "[object Array]"
//Object.prototype.toString.call(/regex-literal/i);// "[object RegExp]"

//封装对象包装
//封装对象(object wrapper)扮演着十分重要的角色。由于基本类型值没有 .length 和 .toString() 这样的属性和方法，需要通过封装对象才能访问，此时 JavaScript 会自动为 基本类型值包装(box 或者 wrap)一个封装对象
//var a ="abc";
//a.length;//3
//a.toUpperCase();//"ABC"
//一般情况下，我们不需要直接使用封装对象。最好的办法是让 JavaScript 引擎自己决定什 么时候应该使用封装对象。换句话说，就是应该优先考虑使用 "abc" 和 42 这样的基本类型 值，而非 new String("abc") 和 new Number(42)

var a = new Boolean(false);
if(!a){
    console.log("Oops");// 执行不到这里
}
//我们为 false 创建了一个封装对象，然而该对象是真值(“truthy”，即总是返回 true,所以这里使用封装对象得到的结果和使用 false 截然相反
//如果想要自行封装基本类型值，可以使用 Object(..) 函数(不带 new 关键字):
/*
var a = "abc";
var b = new String(a);
var c = Object(a);

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String;// true
c instanceof String;//true

Object.prototype.toString.call(b);// "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
*/

//拆封
//如果想要得到封装对象中的基本类型值，可以使用 valueOf() 函数:
/*
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

a.valueOf();//"abc"
b.valueOf();//42
c.valueOf();//true

//在需要用到封装对象中的基本类型值的地方会发生隐式拆封
var a = new String("abc");
var b = a + "";
typeof a;//"object"
typeof b;//"string"
*/

//关于数组(array)、对象(object)、函数(function)和正则表达式，我们通常喜欢以常 量的形式来创建它们。实际上，使用常量和使用构造函数的效果是一样的(创建的值都是 通过封装对象来包装)。
//应该尽量避免使用构造函数

/*
var a = new Array(1,2,3);
a;// [1, 2, 3]
var b = [1,2,3];
b;// [1, 2, 3]
var c = Array(1,2,3);
c;//[1,2,3]
//构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。 因此 Array(1,2,3) 和 new Array(1,2,3) 的效果是一样的
*/


//Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度(length)，而 非只充当数组中的一个元素.数组并没有预设长度这个概念。这样创建出来的只是一个空数组，只不过它的 length 属性被设置成了指定的值。

/*
var a = new Array( 3 );
var b = [ undefined, undefined, undefined ];
var c = [];
c.length = 3;
a;//[empty × 3]
b;// [undefined, undefined, undefined]
c;//[empty × 3]

a.join( "-" ); // "--"
b.join( "-" ); // "--"
a.map(function(v,i){ return i; }); // [empty × 3]
b.map(function(v,i){ return i; }); // [ 0, 1, 2 ]
//a.map(..) 之所以执行失败，是因为数组中并不存在任何单元，所以 map(..) 无从遍历。
*/

/*
function fakeJoin(arr,connector){
    var str = "";
    for(var i =0;i<arr.length;i++){
        if(i>0){
            str += connector;
        }
        if(arr[i] !== undefined){
            str += arr[i];
        }
    }
    return str;
}
var a = new Array(3);
fakeJoin(a,"-");
//从中可以看出，join(..) 首先假定数组不为空，然后通过 length 属性值来遍历其中的元 素。而 map(..) 并不做这样的假定
*/

//我们可以通过下述方式来创建包含 undefined 单元(而非“空单元”)的数组:
//var a = Array.apply( null, { length: 3 } );
//a;// [ undefined, undefined, undefined ]

//我们可以设想 apply(..) 内部有一个 for 循环(与上述 join(..) 类似)，从 0 开始循环到length。假设在 apply(..) 内部该数组参数名为 arr，for 循环就会这样来遍历数组:arr[0]、 arr[1]、arr[2]。然而，由于{ length: 3 }中并不存在这些属性，所以返回值为 undefined。

//除非万不得已，否则尽量不要使用 Object(..)/Function(..)/RegExp(..):
var c = new Object();
c.foo = "bar";
c; // { foo: "bar" }
var d = { foo: "bar" };
d; // { foo: "bar" }

var e = new Function("a","return a*2;");
var f = function(a){
    return a*2;
}
function g(a){return a*2;}

var h = new RegExp("^a*b+","g");
var i =/^a*b+/g;

//在实际情况中没有必要使用new Object()来创建对象，因为这样就无法像常量形式那样一 次设定多个属性，而必须逐一设定。

//构造函数 Function 只在极少数情况下很有用，比如动态定义函数参数和函数体的时候

//强烈建议使用常量形式(如 /^a*b+/g)来定义正则表达式，这样不仅语法简单，执行效率 也更高，因为 JavaScript 引擎在代码执行前会对它们进行预编译和缓存
//RegExp(..) 有时还是很有用的，比如动态定义正则表达式时
/*
var name = "Kyle";
var namePattern = new RegExp("\\b(?:" +name+ ")+\\b","ig");
var matches = someText.match( namePattern);
*/


if(!Date.now){
    Date.now = function(){
        return (new Date()).getTime();
    };
}

function foo(x){
    if(!x){
        throw new Error("x wasn't provided")
    }
}

//一个数据结构只要部署了Symbol.iterator属性就能使用 for...of遍历 与 ...运算符 操作
//我们可以使用 Symbol(..) 原生构造函数来自定义符号。但它比较特殊，不能带 new 关键字，否则会出错
var mysym = Symbol( "my own symbol" );
mysym;// Symbol(my own symbol)
mysym.toString();// Symbol(my own symbol)
typeof mysym;// "symbol"

var a = { };
a[mysym] = "foobar";
Object.getOwnPropertySymbols( a );
// [ Symbol(my own symbol) ]