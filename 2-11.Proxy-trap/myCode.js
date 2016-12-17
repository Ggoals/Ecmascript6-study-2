ㅁ new Proxy()
Proxy 인스턴스 생성 반환
파라미터 ( arg1, arg2)	
	arg1 : Proxy target object
	arg2 : handler object

let obj = Proxy;
console.log(obj);
//function Proxy() { [native code] }
// 크롬으로 까보기
// funciton Proxy() 로 표시되므로 funciton object로 볼수 있으나
//protytype 이 있는데 그것이 없다.
//심지어 new 로 생성하려면 constructor 가 있어야 하는데 없다..!!
//revocable : 취소 가능한 오브젝트 생성 ( 뒤에서 설명 )
//__proto__ 에 연결된 function 은 Function 오브젝트로 생성한 것이므로 Proxy  wkcpdptj wjddmlgksrjtdl dksla
//결론!! Proxy 는 일반적인 형태가 아닌 특별한 형태의 오브젝트로 보아야 한다 :)


try {
	let proxyObj = Proxy();
} catch(e) {
	console.log('new 로 호출해야 되요!!');
}









let target = {};
let newProxy = new Proxy(target, {});
// 1. constructor가 없는 데 어떻게 new 연산자를??
// 2. ES6 스펙에 아래와 같이 기술되어 잇음
//  - when called as a constructor it creates and initializes a new proxy exotic object.


newProxy.sports = '축구';
//handler trap 이 없으므로
//target 의 [[set]]이 실행됌
console.log(newProxy);
console.log(target);
//newProxy 를 까보면
//Object 리터럴 {} 로 생성한 것과 구조가 같음




ㅁ set
target 오브젝트에 프로퍼티 키와 값 설정
파라미터에 파라미터 이름 작성, 값은 엔진이 설정
	외부에서 Proxy 인스턴스의 set() 트랩이 호출되면
	엔진이 호출된 곳의 환경을 분석하여 파라미터 값 설정
	첫 번째 : 프로퍼티 키와 값이 설정될 target 오브젝트
	두 번째 : 프로퍼티 키, 세번째: 프로퍼티 값
	네 번째 : 일반적으로 첫번 째의 target 이 설정됌

set() 트랩에 return 을 작성하지 않으면 TypeError
	처리 성공을 나타내려면 true 반환
	실패를 나타내려면 false 반환
	다른 값을 반환해도 에러가 발생하지 않지만
	strict mode 에서 false 를 반환하면 TypeError
set() 준수 사항 (Invariant), 지키지 않으면 에러 발생
	target의 프로퍼티가 data 디스크립터일 때
	[[Writable]]:false, [[Configurable]]:false 이면
	--프로퍼티 값 설정 불가
	target의 프로퍼티가 악세서 디스크립터일 때
	- [[Configurable]]:false 이면 프로퍼티 값 설정 불가



let target = { event : '축구'};
let sportsProxy = new Proxy(target, {});

sportsProxy.sports = '스포츠';
//sportxProxy 의 [[Set]] 이 호출됨
console.log(sportsProxy.sports);
//스포츠   





let target = {};
let musicProxy = new Proxy(target, {
	set(target, key, value, receiver ) {
		console.log(target);
		console.log(key, ' : ', value);
		return true;
	}
});

musicProxy.music = '음악';
console.log(musicProxy.music);
//Object{}
//music : 음악
//undfined 
//가 출력됨



let target = {};
let musicProxy = new Proxy(target, {
	set(target, key, value, receiver ) {
		console.log(target);
		console.log(key, ' : ', value);
		return true;
	}
});

musicProxy.music = '음악';
console.log(musicProxy.music);
//undefined 



let target = {};
let musicProxy = new Proxy(target, {
	set(target, key, value, receiver ) {
		//이렇게 작성할거면 할 필요가 없긴하다
		//왜냐면 애초에 target 의 [[Set]]이 하는 역할이기 때문!!
		target[key] = value;
		return true;
	}
});

musicProxy.music = '음악';
console.log(musicProxy.music);
//음악



ㅁ set()
set 트랩의 네번째 파라미터 설정 기준
receiver는 프록시를 호출한 즉, 결과를 받을 객체임

	
let target = {event : '축구'};
let handler = {
	set(target, key, value, receiver ) {
		console.log(target === receiver);
		//false
		console.log(receiver.event);
		//축구
		return true;
	}
};

let sportsProxy = new Proxy(target, handler);
sportsProxy.sports = '스포츠';





	
let target = {event : '축구'};
let setProxy = new Proxy(target, {
	set(target, key, value, receiver ) {
		target[key] = value;
		target['time'] = receiver.time;
		//이때 receiver는 setter 를 호출한 객체
		//즉, createObj 가 receiver 가 된다.
		//receiver.time = '' 이렇게는 쓰면 안됨
		//그럼 다시 setter 가 호출되면서 무한루프에 빠짐
		return true;
	}
});

let createObj = Object.createProxy(setProxy, {
	time : {value : 90}
});
createObj.player = 11;



set() 트랩 안에서 this는
	new Proxy() 두번째 파라미터의 hanlder를 참조
	단, arrow 가 아닌 funciton 을 사용해야 한다


let target = {event : '축구'};
let handler = {
	ground:'상암구장',
	set(target, key, value, receiver ) {
		console.log(this.ground);
		//상암구장
		this.home = '서울';
		return true;
	}
};

let sportsProxy = new Proxy(target, handler);
sportsProxy.sports = '스포츠';





let target = {event : '축구'};
let handler = {
	ground:'상암구장',
	set : (target, key, value, receiver ) => {
		//여기선 arrow 펑션을 막 쓰면 안된다.
		console.log(this === window);
		//true
		console.log(ground);
		//undefinded
		return true;
	}
};

let sportsProxy = new Proxy(target, handler);
sportsProxy.sports = '스포츠';





ㅁ get()
get(arg1, arg2, arg3)
	arg1 : target object
	arg2 : key
	arg3 : receiver


let target = {sccoer : '축구'};
let handler = {
	get(target, key, receiver) {
		return target[key] + ",11명";
		//get 트랩은 반환값을 변경할 수 있음
	}
}
let sportsProxy = new Proxy(target, handler);
let value = sportsProxy.soccer;
conso.log(value);



ㅁ get()
데이터 디스크립터
	value, enumerable, configurable, writable  사용가능
	get(), set() 사용 불가
악세서 디스크립터
	get() 또는 set()이 있으면 악세서 디스크립터
	enumerable, configurable 사용 가능
	value, writable 사용 불가



let sportsObj = Object.defineProperty({}, "sports", {
	value : "스포츠",
	writable: false,
	configurable: false
});

let sportsProxy = new Proxy(sportsObj, {
	get(target, key, receiver) {
		return target[key] + '변경';
	}
})


try {
	sportsProxy.value = '스포츠2';
} catch(e) {
	console.log('error!! writable: false, configurable: false 인것은 변경 불가!')
}






let sportsObj = Object.defineProperty({}, "sports", {
	set() {this.dummy = 123}
	configurable: false
});

let sportsProxy = new Proxy(sportsObj, {
	get(target, key, receiver) {
		return target[key] || 123;
	}
})


try {
	sportsProxy.dummy;
} catch(e) {
	console.log('error!! configurable: false 인것은 반환 불가!')
}





ㅁ has 트랩


let newProxy = new Proxy({sports:'스포츠'} , {
	has(target, key ) {
		return target[key];
	}
});

//예시좀 채워넣기!!
let defineObj = Object.defineProperty({}, "sports", {
	value : "스포츠",
	configurable : false
})

let hasProxy = new Proxy(defineObj, {
	has(target, key) {
		return target[key];
	}
})



ㅁ ownKeys()
오브젝트에서 프로퍼티 key 반환
	배열의 엘리먼트 타입은 String 또는 Symbol
	[[Configurable]]:false 이거나
	오브젝트가 확장 불가 상태라도 반환
ownKeys() 트랩이 호출되는 형태
	Object.getOwnPropertyNames(), Object.keys()
	Object.getOwnPropertySymbols(), Reflect.ownKeys



let sportsObj = Object.definProperties( {}, {
	baseball: { value: '축구', enumerable : true },
	swim : { value : '수영'}
})

let newProxy = new Proxy(sportsObj, {
	ownKeys(target) {
		return Object.getOwnPropertyNames(target);
		//target 의 모든 프로퍼티 키를 배열로 반환
		//Symbol 과 상속받은 프로퍼티 제외
	}
});

let result = Object.getOwnPropertyNames(newProxy);

console.log(result);

result = Object.keys(newProxy);
//트랩에서는 다 반환하고, keys 에서 걸러내는 것이다.
//enumerable : false 인것은 반환하지 않는다!
console.log(result);
//[baseball]




ㅁ constructor
class Sports {
	constructor(event) {
		this.event = event;
	}
}

let newProxy = new Proxy(Sports, {
	constructor(target, args, proxy) {
		erturn new target(args[0]);
	}
})

let sportsObj = new newProxy('축구');
console.log(sportsObj.event);






ㅁ apply
call 과 apply 를 포함한 function 호출에 대한 트랩
appy() 트랩이 호출되는 형태
	proxy(...args)
	Function.prototype.apply() 또는 Function.prototype.call()
	Reflect.apply()

호출한 함수와 apply() 트랩의 파라미터 매핑방법
proxy(1,2,3) 형태로 호출
	모든 파라미터가 apply 트랩의 세번째에 설정
	두 번째 파라미터 지정 불가
apply("", [1,2,3]) 형태로 호출
call("", 1,2, 3) 형태로 호출


function getValue(...values) {
	let sum = 0;
	for(const value of values) {
		sum = sum + value;
	}
}

let newProxy = new Proxy(getValue, {
	apply(target, thisObj, args) {
		return target.apply(thisObj.args);
	}
});


let result = newProxy.apply('', [10, 20, 30]);



ㅁ Proxy.revocable()
Proxy 기능 무효화를 위한 오브젝트 생성, 반환
	Proxy.revocable(target, handler);
	Proxy 오브젝트 반환
	반환된 오브젝트의 revoke() 를 호출하면 Proxy 기능이 정지됨
	정지된 Proxy를 사용하면 TypeError 발생

let result = revocalbelObj.proxy.sports;
console.log(result);