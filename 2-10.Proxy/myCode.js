ㅁ Proxy
기본적인 오퍼레이션의 동작 행위(behavior)를 가로채어 재정의
Proxy의 사전적 의미 : 대리, 대신
식당에서 3명이 식사하고 있는 모습 연상
왼쪽 사람이 오른쪽 사람 앞의 밥을 가져오라고 함
	왼쪽 사람이 가운데 사람에게 밥을 달라고 말하고
	가운데 사람이 오른쪽 사람에게 말하면
	오른쪽 -> 가운데 -> 왼쪽 순서로 밥을 받을 수 있음
이 모습에서 가운데 사람이 Proxy
	왼쪽 사람의 말을 받아 오른쪽 사람에게 말하고
	오른쪽 사람에게서 밥을 받아 왼쪽 사람에게 전달
이와 같이 Proxy는 중간에서 대리 역할을 함
왼쪽 사람이 오른쪽 사람에게 직접 말하고 받을 수 있음
	이때는 대리 역할( Proxy)이 필요하지 않음

식당 모습을 프로그램 코드로 바꾸면
가운데 사람(Proxy)을 거치지 않는 모습
	let target = {food: '밥'};
	let left = target.food;
	코드를 실행하면 left 에 밥이 설정됨
식당모습과 코드 비교
	target: 오른쪽 사람
	food: 밥
	target.food: 오른쪽 사람에게 밥을 달라는 동작
	left : 왼쪽 사람
	= : 오른쪽 사람이 왼쪽 사람에게 주는 동작


자바스크립트 논리
target.food 가 실행되면 getter 호출
	파라미터 값으로 'food'를 넘겨줌
	그러면 getter 가 target 에서 food 프로퍼티 값을 반환
	food 프로퍼티가 없으면 undefined 반환
엔진이 프로퍼티 key 를 변수에 할당하는 코드를 만나면
	내부 메소드인 [[get]]호출
이와 같은 (getter, setter) 
	기본적인 오퍼레이션 동작/행위를 위해
	ES6는 빌트인으로 13개 내부 메소드 제공





가운데 사람(Proxy)를 거쳐서 받는 모습
	let target = {food: '밥'};
	let middle = new Proxy(target, {});
	let left = middle.food;
식당 모습과 코드 비교
	target: 오른쪽 사람, food : 밥
	Proxy 인스턴스를 middle 에게 할당, middle : 가운데 사람
	middle.food: 가운데 사람에게 밥을 달라는것과 가운데 사람이 오른쪽 사람에게 밥을 달라는것
	left : 왼쪽 사람
	=: 가운데 사람이 왼쪽 사람에게 주는 동작



left = middle.food 논리는???
	middle.food 로 Proxy 의 getter 가 호출됨
다시 Proxy 에서 target의 getter 호출
	"food" 를 파라미터로 넘겨줌
	Proxy() 의 파라미터에 target 을 지정했으므로
	middle은 food 값을 구할 대상(target) 인식 가능
target 의 getter 가 food 값을 구함
	구한 food 값을 middle 로 반환
	middle은 받은 값을 자신을 호출한 곳으로 반환
	middle.food 로 반환된 값이 left에 할당됨
그래서 Proxy 가 가운데 역할, 대리 역할




let target = { food : '밥'};
let middle = Proxy(target, {} );


ㅁ target
타깃(target)
	Proxy 에서 사용하는 요어
	new Proxy(target, {}) 형태에서
	첫번째 파라미터에 지정한 오브젝트
target 이외에 트랩(Trap)과 핸들러(Handler)가 있음

ㅁ Trap
식당모습
	왼쪽 사람이 가운데 사람에게 밥을 달라고 했을 때
	오른쪽 사람에게 말해 밥을 받고
	자신 앞에 있는 수저도 왼쪽 사람에게 건네 준다면
	Proxy 에 수저를 건네주는 코드 필요
getter 가 오른쪽에서 받아 왼쪽으로 건네주므로
	getter 에 수저를 같이 건네주는 코드 작성
	즉, 기보적인 getter 기능에 개발자 코드로 기능추가
트랩
	getter, setter를 트랩이라고 함



let target = {food : '밥'};
//트랩이 작성된 오브잭트를 핸들러 오브젝트 또는 핸들러라고 부름
let handler = {
	//handler 아래 지정되는 것을 트랩이라 부름
	//get 트랩, set 트랩
	get(target, key) {
		return target[key] + ',수저';
	},
	set(target, key) {}
}

let middle = new Proxy(target, handler);
let left = middle.food;
console.log(left);
//밥,수저




ㅁ Trap
트랩
	OS 에서 사용하는 용어
	실행 중인 프로그램에 이상이 발생했을 때 실행을 중단하고
	자동으로 사전에 정의된 제어로 이동하는 동작
Proxy 외부에서 ( middle.food;) 형태로 getter 가 호출되면
	target 오브젝트의 getter 가 호출되기 전에
	Proxy 의 getter 가 수행되도록 가로채기를 하여
	getter 에 대응하기 위해 작성된 getter 호출
핸들러에 트랩을 작성하지 ㅇ낳으면
	[[get]]()과 같은 내부 메소드 호출
	핸들러에 트랩을 작성하여 [[get]]() 호출을 가로챔
ES6는 기본적인 오퍼레이션을 위한 13개의 내부 메소드 제공
	"모든 빌트인" 오브젝트에 13개 메소드가 설정되어 있음
	따라서 모든 오브젝트에서 기본적인 오퍼레이션을 수행할 수 있음
	또한 Proxy 를 사용하여 개발자 코드를 추가할 수 있음
	오브젝트에 따라 [[call]], [[constructor]] 미포함
ES7 spec 추가 : Proxy handler Method
	Table 에서 handler Method 를 Proxy 에 작성하게 되고 이를 Trap 이라 함


let target = {food:'밥'};
let middle = new Proxy(target, {
	get(target, key) {
		return target[key] + ',수저';
	}
})

let left = middle.food;
consoel.log(left);

//Proxy 에 get() 을 작성하면
//target 의 [[get]] 이 작동하기 전에 가로채서 개발자 코드가 실행
//이것이 Proxy trap 의 목적이다.







