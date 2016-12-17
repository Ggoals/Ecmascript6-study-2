ㅁ primitive data
자바스크립트에 primitive 개념이 있음
	오브젝트가 아닌 데이터
	따라서 메소드를 갖고 있지 않음
let num = 123; 을 실행하면
	num 에는 123 만 할당되고 아무것도 첨부되지 안흥ㅁ
	123은 number data로 primitive
ES5의 primitive data
	string, number, boolean, null, undefiend
ES6에서 symbol 이 추가 됨
primitive 는 wrapper 오브젝트가 있음
	string : String
	number : Number
	boolean : Boolean
	ES6에서 추가된 symbol은 Symbol
undefiend, null 은 wrapper 오브젝트 없음
wrapper 오브젝트에는 메소드가 있음


ㅁ Symbol()
Symbol 은 프로그램 전체를 통해 유일(unique)한 값 제공
코드 형태
	let sym = Symbol("설명");
new Symbol() 과 같이 new 연산자 사용 불가
	Symbol() 은 값을 반환하므로 값을 생성한다는 표현이 적함
생성한 Symbol 값 변경 불가
생성한 Symbol 프로퍼티 설정 불가
	strict mode 에서 에러 발생



const sym = Symbol();
// 1. Symbol 값을 생성하여 반환
// 2. 값을 변경할 수 없으므로 const 변수에 할당 가능
console.log(sym);

console.log(typeof sym);

const symRemark = Symbol('주석');
console.log(symRemark);
console.log(symRemark.toString());
// 1. 파라미터는 선택
// 2. Symbol() 로 생성한 값의 설명, 주석을 문자열로 생성
// 3. Symbol() 실행에 영향을 미치지 않으며, 단지 주석으로 사람이 알기 위한것. 디버깅에 유용
// 4. console.log(), toString() 으로 Symbol 값을 문자열로 바꿀때, 값은 출력되지 않고 주석만 출력됨






let sym = Symbol();
let result = sym == Symbol();
console.log(result);
// 1. Symbol()로 생성한 값은
// 2. 프로그램 전체를 통해서 유일한값
// 3. 다른 프레임워크, 라이브러리도 포함
// 4. Symbol() 의 목적은 유일한 값 제공

try {
	+sym;
} catch(e) {
	console.log('+sym 사용 불가');
}
// 1. +sym 과 같이 단항 + 연산자로
// 2. Number 타입으로 변환 불가

try {
	sym | 0;
} catch (e) {
	console.log('error');
}








let sym = Symbol('할인율');
try {
	sym + '문자열';
} catch(e) {
	consoel.log('문자열 연결 불가');
}


let result = String(sym) + '연결';
console.log(result);

let result2 = sym.toString() + '연결';
console.log(result2);

try {
	new String(sym) + '연결';
} catch(e) {
	console.log('new String(sym) 사용불가');
}




ㅁ Symbol
Object(123) 을 실행하면 Number 인스턴스 반환
Symbol 인스턴스 생성
	 Object() 파라미터에 Symbol() 을 지정하거나
	 Symbol() 로 할당한 변수 이름 지정
 Symbol 인스턴스 구조
 	Object 가 wrapper 오브잭트가 되어
 	Symbol 함수, 메소드 사용 가능



 let sym = Symbole('123');
 const obj = Object(sym);
// 1. obj 는 Symbol 인스턴스
// 2. Symbol.__proto__ 에 Symbol.prototype 에 연결된 프로퍼티가 인스턴스 형태로 연결
 console.log(obj);
//아무리 출력해봐도 값은 알수 없다...
console.log(ojb === sym);
//false
console.log(ojb == sym);
//true


ㅁ Symbol 사용형태
Object 프로퍼티 이름으로 사용
	값이 유일하므로 중복되지 않음
	symbol-keyed property 라고 부름
for-in 에서 사용
	프로퍼티 이름으로 Symbol 이 열거되지 않음
	Symbol 은 [[Enumerable]] : false 이기 때문
	Object.getOwnPropertySymbols() 로 열거
메소드 이름으로 사용
JSON.stringfy() 에서 사용
	Symbole 값이 문자열로 반환되지 않음, 소스 참조



let sym = Symbol('123');
let obj = {[sym]: "456"};

// 1. Symbol 값을 Object 의 프로퍼티 이름으로 사용한 형태
// 2. 대괄호[] 안에 Symbol() 로 할당한 변수 이름 지정
// 3. Object 의 프로퍼티 key 타입이 String 이지만, Symbol 은 문자열이 아님
// 4. {[sym]: "456"} 형태에서 [sym] 을 symbole-keyed property 로 부름

console.log(obj);
let result = obj[sym];
//456

result = obj.sym;
console.log(result);
//undefined
// 무조건 대괄호로 값을 가져 와야함..!! ㅜㅠ 










const - symbolOne = Symbol('symbol one');
const - symbolTwo = Symbol('symbol two');


class Sports {
	static [symbolOne]() {
		return "Symbol-1";
	}

	[symbolTwo]() {
		return 'Symbol-2';
	}
}

let result = Sports[symbolOne]();
console.log(result);



let obj = new Sports();
result = obj[symbolTwo]();
console.log(obj);








let sym = Symbol('key');
let result = JSON.stringfy({[sym]: "값"});
console.log(result);
//출력 안됨... 그니까 볼수는 없음 걍 유니크 한거임..!! ;;







ㅁ Well-Known Symbols
스펙에서 @@iterator 형태를 볼수 있음
ES7 스펙 링크 한번 걸기!!! :)
@@ 가 Symbol 임
	즉, @@iterator 는 Symbol.iterator 와 같음
Symbol.iterator 는 Well-Known Symbol 중 하나

11개의 Well-Known Symbols
스펙에서 알고리즘에 이름을 부여하고
	이름으로 참조하기 위한 빌트인 Symbol 값
개발자 코드에서 Well-Known Symbol 작성
	개발자 코드를 먼저 실행
	따라서 디폴트 @@iterator 를 실행 가능

ㅁ toStringTag
Object.prototype.toString() 과 비슷
toStrign()으로 인스턴스를 변환하면
	[object Object] 형태로 반환
	인스턴스 타입을 명확하게 알 수 없음
Symbol.toStringTag으로 구분 가능
	[object Object]에서 두 번째의 문자열 지정
	예 : "ABC" 지정, [object "ABC"]로 반환




let Sports = function(){};
let sportsObj = new Sports;   //( 파라미터가 없으면 ()생략 가능 ㅋㅋ

let type = sportsObj.toString();
console.log(type);
//[object Object 출력]
Sports.prototype[Symbol.toStringTag] = "Sports-Function";

let result = sportsObj.toString();
console.log(result);
//[object Sports-Function 출력]



class Book {};
let bookObj = new Book();
let reuslt = bookObj.toString();
console.log(result);
//[object Object] 출력 
//당연한거임!! construct 가 호출 되면서 인스턴스 object 가 리턴되는거니까!!

class Sports {
	get [Symbol.toStringTag]() {
		return 'Sports-class';
	}
}
let sportsObj = new Sports();
let result2 = sportsObj.toString();
console.log(result2);
//[object Sports-class]  출력






ㅁ isConcatSpreadable
Array.prototype.concat() 에서 배열의 펼침 여부 정의
Array.prototype.concat() 은
	다수의 배열 엘리먼트를 연결하여 반환
배열이름[Symbol.isConcatSpreadable] = false;
	one.concat(two) 형태에서
	two 배열의 엘리먼트가 아닌 two 배열자체를 연결
배열이름[Symbol.isConcatSpreadable] = true
	one 배열 끝에 two 배열의 엘리먼트를 하나씩 연결
	[Symbol.isConcatSpreadable]를 작성하지 않아도 같음 


let one = [11,12,13], two = [21,22,23];

let result = one.concat(two);
console.log(result);

two[Symbol.isConcatSpreadable] = false;
result = one.concat(two);
console.log(result);
//[11,12,13.[21,22,23]]   출력






let one = [11,12,13];
let fiveSix = {
	0:'five',
	1:'six',
	'length' : 2
};
let result = one.concat(fiveSix);
console.log(result);

let arrayLike = {
	[Symbole.isConcatSpreadable]:true,
	0:'five',
	1:'six',
	length:2
}
result = one.concat(arrayLike);
console.log(result);







ㅁ species
species 사전적 의미
	(공통 특성을 지닌 ) 종류, 인류, 종
Symbol.species 는 construct  함수 반환
	construct를 실행하면 인스턴스를 반환하므로
	결국 인스턴스를 반환하게 됨
Symbol.species를 오버라이드하면
	다른 인스턴스를 반환할 수 있다는 의미
우선 Symbol.species와 관련된 개념을 살펴봅니다.


let arrayObj = [1,2,3];
//arrayObj 구조를 크롬 디버거로 보자!!
// arrayObj 구조를 보면
// prototype 이 없고 __proto__ 가 있으므로
// 빌트인 Array 오브젝트가 아닌 인스턴스 구조
// arrayObj.concat() 형태로 호출 가능

let sliceOne = arrayObj.slice(1,3);
//결과 값이 설정된 인스턴스를 그대로 반환해줌
//그래서 아래에서 sliceOne.slice 를 또 쓸수 있는 거임!
let sliceTwo = sliceOen.slice(1,2);





class ExtendArray extends Array {
	getValue() {}
}

let newArray = new ExtendArray(1,2,3);
let newInst = newArray.slice(1,2);
// newArray.slice 통해 반환되는 값은 ExtendArray 이고
// 코드에서 default 로 인스턴스를 그대로 반환하는 개념을 species 라 한다.!!
console.log(newInst instanceof ExtendArray);
//true 호출





Symbol.species 는 static 악세서 프로퍼티
	getter 만 있고, setter 는 없음
	static get [Symbol.species](){}
Symbol.species 가 포함된 빌트인 오브젝트
	Array, Map, Set, Promise
	RegExp, ArrayBuffer, TypedArray
빌트인 오브젝트를 상속받은 class에
	Symbol.species 를 작성하면 다른 오브젝트를 반환하도록 가능



class ExtendArray extends Array {
	static get [Symbol.species]() {
		return Array;
	}
}

// 빌트인 Array 의 Symbol.species 를 오버라이드
// Array 오브젝트의 메소드를 호출하면 오버라이드한 Symbol.species() 가 홀출됨
// ExtendArray 인스턴스가 아닌 Array 오브젝트를 반환

let oneInstance = new ExtendArray(1,2,3);
let twoInstance = oneInstance.slice(1,2);

let result = oneInstance instanceof ExtendArray;
console.log(result);
//true
result = twoInstance instanceof Array;
console.log(result);
//true
result = twoInstance instanceof ExtendArray;
console.log(result);
//false











class ExtendOne extends Array {
	showOne() {
		console.log('ExtendOne');
	}
}


class ExtendTwo extends Array {
	static get [Symbol.species]() {
		return ExtendOne;
	}

	showTwo() {
		consoe.log('Extend Two');
	}
};

let twoInst = new ExtendTwo(10,20,30);
twoInst = twoInst.filter(value => value > 10);
console.log(twoInst);
twoInst.showOne();
console.log(twoInst.showTwo);




class ExtendOne extends Array {
	static get [Symbol.specied0() {
		return null;;
	}]

}



let twoInst = new ExtendOne(10,20,30);
let arrayList = twoInst.filter(value > 10)





ㅁ toPrimitive
String, Number, Boolean 은 프리미티브 값 제공
Object 는 프리미티브 값을 제공하지 않음
[Symbol.toPrimitive(hint)]() 형태로 작성
Symbol.toPrimitive() 를 호출하면
	프리미티브 값 반환


let obj = {
	[Symbol.toPrimitive](hint) {
		if(hint ==='number') {
			return 30;
		}
		if(hint == 'string') {
			return '문자열';
		}
		return 'defualt';
	}
}


result = obj + 50;
console.log(result);
//defulat50 출력
result = +obj + 50;
console.log(result);
//80 출력
result = 'ABC' + obj
console.log(result);
// string 인지 number 인지 판단을 못함
// 그래서 default 로 출력됌
//ABCdefault 가 출력




ㅁ iterator
Symbol.iterator 가 있는 빌트인 오브젝트
	String.prototype[@@iterator]
	Array.prototype[@@iterator]
	Map, Set, TypedArray.prototype[@@iterator]
빌트인 Object 에는 @@iterator 가 없음
	개발자 코드로 작성할 수 있음
이 장에서는 String, Array, Object 를 다룸
	Map, Set, TypedArray 는 관련된 곳에서 다룸
@@iterator는 프로퍼티와 함수로 사용할 수 있음
Array 오브젝트의 [Symbol.iterator]() 를 호출하면
	이터레이터 오브젝트를 반환
for-of 문에서 배열이 반복되는 것은
	Array 오브젝트에 Symbol.iterator가 있기 때문
	Symbol.iterator()가 반복하면서 엘리먼트를 하나씩 처리



let numArray = [10, 20];
// numArray 구조
// 크롬 디버거로 보기
// Symbol.iterator 가 있음
// Symbol.iterator 는 values() 와 기능이 같음
// values() 크롬 52 버그, 실행되지 않음

for ( let value of numArray) {
	console.log(value);
}

let iterObj = numArray[Symbol.iterator]();

let result = iterObj.next();
console.log(result);


ㅁ String.prototype[@@iterator]


let strValue = '1A';
for(let value of strValue) {
	console.log(value);
}
//문자단위로 반복할 수 있는 것은 String.prototype[@@iterator] 가 있기 때문

let iterObj = strValue[Symbol.iterator]();

let result = iterObj.next();
console.log(result);




ㅁ Object 반복
빌트인 Object 에는 Symbol.iterator 가 없음
	그래서 for-of 문을 사용할 수 없음
	그래서 만들어서 사용해야 함


let obj = {
	[Symbol.iterator]() {
		return {
			count: 0,
			next() {
				if(this.count < 3 ) {
					return { value:{count : this.count++}, done : false };
				}
				return {value : undefiend, done:true};
			}
		}
	}
}

for(let result of obj) {
	//for of 를 반복할 때 마다 next() 가 호출되므로
	//종료조건 ( return 값이 {value : undefiend, done : true}을 작성하지 않으며 무한 루프가 돔 )
	console.log(result.count);
}



ㅁ Generator
빌트인 Object 에 Symbol.iterator 를 작성하고
여기에 generator 함수를 연결하면
이터레이터로 반복할 때 마다 yield 를 발생시킴


let obj = {};
obj[Symbol.iterator] = function*() {
	yield 1;
	yield 2;
	yield 3;
}

let result = [...obj];
//spread 를 실행하면 iterator 를 실행시키면서 
//done:true 를 반환할때까지! 즉, 1,2,3 을 하나씩 반환시킨 array 같은 형태를 만들거임

console.log(reesult);
//[1,2,3] 






let gen = function*() {
	yield 10;
	yield 20;
}

let genObj = gen();
let result = genObj.next();
console.log(result);
//{value : 10, done : false}

let iterObj = genObj.[Symbol.iterator]();
result = iterObj.next();
//{value : 20, done : false}
console.log(result);






ㅁRegExp
정규표현식을 상요할 수 있는 String 메소드
	match(), replace(), search(), split()
	4개의 메소드에 대응하는 Symbol 함수 제공
match() 가 호출되면
	먼저 object 에 Symbol.match 작성 여부 체크
	존재하면 Symbol.match() 실행
	즉, String.prototype.match를 오버라이드한것
오버라이드 목적
	String 메소드 대신에 호출하는것이므로
	시맨틱적으로 기능은 같아야 함
	match  방법, 기준등에 맞춰서 작성해야 함! 반드시



let result = 'Sports'.match(/s/);
console.log(result);
//[s]


class MatchCheck {
	constructor(base) {
		this.base = base;
	}
	[Symbol.match](target) {
		return this.base.indexOf(target) < 0? false:true;
	}
};

let instMatch = new MatchCheck("sports");
result = 'po'.match(instMatch);
//sports 에 po 가 있으므로 true 를 반환
//true

