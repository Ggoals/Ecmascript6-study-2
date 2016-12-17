메모리 관점, 바이트 사용의 효율성 관점에서 접근해야함

ㅁTyped Array
Typed Array : 단어를 띄우면 개념적인 접근
TypedArray : 하나의 단어로 포괄적인 오브젝트 이름
Typed Array
	배열 형태로 각 엘리먼트가 일정한 타입으로 구성
	각 엘리먼트의 값을 바이너리(binary)로 표현
	Typed Array에서 Typed는 바이트수에 따른 타입
	배열 형태이지 Array 는 아님
	Array.isArray()로 체크하면 false 반환
자바스크립트에서 Array 는 엘리먼트 추가/삭제 용이
	반면, 배열 길이가 유동적이면 처리속도에 영향을 미침
Array 처리 메커니즘
	배열의 길이가 조정되는 것을 최소화하기 위해 엘리먼트를 삭제하면 그 위치에 undefined 설정
	배열을 읽을 때 undefined로 설정된 엘리먼트 제외
	삭제한 엘리먼트 위치에 다음 엘리면트를 당겨서 설정하고
	다시 당겨서 설정하면 처리 속도가 떨어짐
메모리 측면의 자바스크립트 단점
	64bit(8Byte)를 사용하므로 필요 이상의 메모리 차지
	숫자 1은 1바이트이면 충분
	작은 데이터는 문제가 없지만 이미지 같은 정크 데이터는 문제
Type Array 필요성
	배열 길이가 변하지 않는 형태 필요
	숫자 1표현에 바이너리로 1바이트 사용
	값을 메모리에 설정하려면 바이너리로 변환 필요
	처음부터 바이너리로 저장하므로 변환 처리 불필요

Type Array 출현 배경
	처음 WebGL에서 스펙 작성, 현재는 ES6로 통합
	WebGL 에서 스펙을 만든 이유는
	바이너리 데이터를 웹에서 처리하기 위한 것으로
	빠른 처리 속도가 필요하기 때문
WebGL에서 작성한 Typed Array Spec 문서 찾아보기!! 
-> 이게 자바스크립트 스펙으로 고대로 옮겨져 와서 이걸 봐도 될정도라고 해도 과언이 아님
Typed Array를 사용하는 Web API
	FileReader.prototype.readAsArrayBuffer()
	XMLHttpRequest.prototype.send()
	Canvas의 ImageData.ImageData
	최근 API에 적용 증가

Typed Array 구현 요소
	Buffer, View 개념과 같이 구현
	Buffer: 메모리에 바이너리 데이터 저장
	View: Buffer 데이터 CRUD 시준정의 - view 바이트 단위, 시작/끝 위치


let bufferObj = new ArrayBuffer(20);
파라미터에 지정한 20바이트의 버퍼 오브젝트 생성
let int32View = new int32Array(bufferObj);
파라미터에 지정한 bufferObj를 32비트(4바이트) 단위로 view(CRUD) 정의
20바이트 / 4바이트 = 5
다섯개의 값을 view 할 수 있음


ㅁArrayBuffer
길이가 고정된 바이너리 버퍼 오브젝트
	new ArrayBuffer() 로 인스턴스 생성
	생성한 인스턴스의 길이 변경 불가
ArrayBuffer에 직접 악세스 불가
	TypedArray 또는 DataView를 사용하여 악세스
	이를 사용하여 ArrayBuffer의 데이터 타입 지정 - 8비트, 16비트, 32비트 등
	ArrayBuffer의 엘리먼트 구조(structure)정의
	- 구간(시작/끝) 타입


ㅁ new ArrayBuffer()
ArrayBuffer 인스턴스 생성, 반환
파라미터에 ArrayBuffer의 바이트 수 지정
	new ArrayBuffer(20)
	20 바이트의 인스턴스 생성
생성한 인스턴스의 각 바이트에 초깃값으로 0 설정
인스턴스에 내부 슬롯 설정
	[[ArrayBufferData]], [[ArrayBufferByteLength]]


let bufferObj = new ArrayBuffer(20);
-->> 크롬 으로 까보기
bytelength getter 가 생성되어 있음
get Symbol -> species ( 같은 모습으로 인스턴스 생성해주는 )

let bufferObj1 = new ArrayBuffer();
// 에러가 발생하진 않음; 기본으로 0이 설정됨 
//사실상 쓸모 없는 거임. Buffer 는 나중에 못바꾸기 때문에
// 한번 0으로 설정되면 바꿀수 없다
let bufferObj1 = new ArrayBuffer("20");
//에러 안남
//안에값이 숫자이면 알아서 숫자로 변형해서 쓴다


for ( var k = 300000000; k < 300000001; k++) {
	new ArrayBuffer(k);
}
console.log(k);
// 크롬 51에서는 1억까지는 되고
// 크롬 52에서는 대략 3억까지는 괜찮은데 4억부터는 에러가 남







let bufferObj = new ArrayBuffer(20);
let proxyObj = new Proxy( bufferObj, {
	get(target, key, receiver) {
		return target[key] + '바이트';
	}
});




ㅁ slice()
ArrayBuffer 인스턴스에서 지정한 범위 복사
	slice(arg1, arg2)
	arg1 : 시작 인덱스
	arg2 : 끝 인덱스, 지정하지 않으면 시작인덱스부터 끝까지, 지정하면 끝 인덱스 직전까지 복사
	시작인덱스는 포함하지만 끝 인덱스는 포함하지 않음

let newBuffer = newArrayBuffer(20);
let oneObj = newBuffer.slice(0);
console.log(oneObj.bytelength);
let towObj = newBuffer.slice(3,7);
console.log(towObj.bytelength);





