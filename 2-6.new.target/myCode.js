메타 프로퍼티로 모든 function 에 존재
new.target => new 로 생성할 때 해당 function 안에 모든 코드가 출력된다.



let sports = function() {
	console.log(new.target);
	let target = new.target?new.target.name : undefined;
	console.log(target);
}

sports();

let obj = new sports();







//class constructor 에서 new.target 은
//class 의 constructor 를 참조

class Sports {
	constructor() {
		console.log("Sports :", new.target.name);
	}
}

class Soccer extends Sports {
	constructor() {
		console.log("Soccer :", new.target.name);
	}
}

let sportsObj = new Sports();
let soccerObj = new Soccer();