ㅁ for()
let sym = Symbol.for("sports");
글로벌 Symbol 레지스트리(registry)에 Symbol 값 저장
	{ key:value } 형태로 저장
	파라미터()의문자열이 key 가 되고
	Symbol() 로 생성한 값이 value 가 됨
Symbol.for()는 함수로 사용, 프로퍼티 사용 불가
key 값이 같으면 같은 값을 사용할 가능성이 있음
	파라미터 key값을 유일하도록 정의하면 유용
	예: Symbol.for("corechain.customer.code")
Symbol 형태
	Symbol(): Symbol 값을 생성하여 스코프에서 사용
	Symbol.for(): 글로벌 Symbol 레지스트리에 저장
	Symbol.iterator 와 같은 Well-known symbol



let sym = Symbol.for('sports');
cosole.log(sym);


let result = Symbol.for("ABC") === Symbol.for("ABC");
console.log(result);
//true

result = Symbol.for("DEF") === Symbol("DEF");
console.log(result);
//false

result = Symbol("456") === Symbol("456");
console.log(result);
//false

console.log(Symbol.for(true));




ㅁ keyFor()
코드 형태
	let sym123 = Symbol.for("123");
	let result = Symbol.keyFor(sym123);
	글로절 registry에 존재하면 키값을 반환! 없으면 undefined 반환



let sym123 = Symbol.for('123');
let result = Symbol.keyfor(sym123);
console.log(result);
//123

console.log(typeof result);
//string

result = Symbol.keyFor(Symbol.toPrimitive);
console.log(result);
//undefiend
// 글로벌 레지스트리는 well-known symbol 을 지원하지 않기 때문!

let symTwo = Symbol("222");
result = Symbol.keyFor(symTwo);
console.log(result);
//undefiend
//글로벌 스코프에 Symbol 을 생성하더라도 글로벌 Symbol 레지스트리에 등록되지 않음






ㅁ toString()
let result = Symbole("123").toString();
Symbol 을 문자열로 변환하여 반환
	Symbol 값이 반환되는 것은 아님
	Well-known symbol, 글로벌 Symbol도 변환
Symbol 을 문자열에 연결하면 TypeError
	toString() 으로 변환하면 연결할 수 있음




 let result = Symbol('123').toString();
 console.log(result);

 result = Symbol.for('ABC').toString();
 console.log(result);

 result = Symbol.iterator.toString();
 console.log(result);





 ㅁ valueOf()
let result = Symbol("123").valueOf();
console.log(result);
//Symbol(123);

console.log(typeof result);
//symbol