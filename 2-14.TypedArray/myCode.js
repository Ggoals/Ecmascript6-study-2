ㅁ TypedArray
TypedArray 오브젝트
	ArrayBuffer 데이터를 Array-like 형태로 view(CRUD)
	9개 TypedArray 오브젝트를 총칭하는 스펙상의 오브젝트
	- 9개 오브젝트!
		Int8Array				| 1바이트	| signed char
		UInt8Array 				| 1바이트	| unsigned char
		UInt8ClampedArray 		| 1바이트	| unsigned char
		Int16Array 				| 2바이트	| short
		UInt16Array				| 2바이트	| unsigned short
		Int32Array				| 4바이트	| int
		UInt32Array				| 4바이트	| unsigned int
		Float32Array			| 4바이트	| float
		Float64Array			| 8바이트	| double
	스펙에서 %TypedArray% 표기
	- 강좌에서는 TypedArray로 표기
ArrayBufferView
	9개 TypedArray와 DataView 지칭
	ES6 스펙에서는 사용하지 않음
	표준화가 진행중인 W3C IDL 에서 사용
	W3C IDL 링크 찾아보기!!

9개 TypedArray 오브젝트
	엘리먼트 타입과 바이트 수에 따라 생성자 이름이 다름
	적합한 생성자 이름으로 인스턴스 생성

TypedArray 오브젝트 프로퍼티 구분
	TypedArray 오브젝트에만 있는 프로퍼티 Array에 같은 이름의 프로퍼티 없음
	Array메소드와 이름이 같으 메소드 - 일부는 기능이 다르지만 대부분 기능이 같음
	Array 에만 있고 TypedArray에는 없는 메소드
Array에만 있는 메소드
	concat(), pop(), push(), shift(), splice(), unshift()
	위 메소드를 보면 실제 구조가 바뀐다. 가령 push? 이건 완전히 붙이는건데 TypedArray 는 이미 고정된 길이 아닌가? 
	라는 원리부터 파고 들어가면 왜 없는지를 알 수 있는것 같다.
	이외의 Array메소드는 TypedArray에도 있음


ㅁ new TypedArray()
-> 실제 이런 표현이 있는건 아니구;; 실제 사용은
new Int8Array(3), new UInt32Array(4) 이런식으로 typed 에 해당 type 이 들어가서 쓰임
9개 타임의 인스턴스 생성, 반환
	파라미터에 엘리먼트 수 지정


let int16Obj = new int16Array(3);
console.log(int16Obj);
// 2바이트 단위로 값을 저장하는 3개의 엘리먼트를 생성
// 그러므로 총 6바이트
// 각 엘리먼트는 초기값 0으로 설정
// 각 엘리먼트는 사인부호(+, -) 를 가진
// 바이너리 데이터이며 2의 보수법으로 음수 표현
int16Obj[0] = 123;
int16Obj[1] = 456;
//Array-like 의 개념으로 들어감!
let result = int16Obj[0];
console.log(result);


let int16Obj = new Int16Array(3);
int16Obj[0] = 12345;

let int16Copy = new Int16Array(int16Obj);
console.log(int16Copy);
// 찍어보면 int16Obj과 int16Copy는 같음을 알 수 있다.

let int8Copy = new Int8Array(int16Obj);
console.log(int8Copy);
// 찍어보면 12345 가 짤림!! 왜냐면 얜 8비트니까!!
// 짤리면 255가 나옴?? 그건 아님 짤리는거에 따라 어떤 값이 표현될지는 알 수 없음!!



let oneObj = new Int16Array([12, 34, 56]);
let result = oneObj.length;
console.log(result);




ㅁ new TypedArray()
ArrayBuffer 로 9개 타입의 ㅇ니스턴스 생성, 반환
파라미터
	첫번째에 ArrayBuffer 인스턴스 지정
	두번째에 ArrayBuffer의 offset을 바이트 수로 지정
	세번째에 offset 에서부터 사용할 엘리먼트 수 지정
	offset 인덱스부터 지정한수의 엘리먼트로 인스턴스 생성
















