static 메서드에서 this 는
	메소드가 속한 class오브젝트 참조
constructor 에서 
	this.constructor.name() 형태로
	static 메소드 호출 가능
	static 메소드가 Funciton 오브젝트이기 때문



class Sports {
	static getNumber() {
		return '66.765';

	}

	static setGround(ground) {
		this.ground = ground;
	}

	static getGround() {
		return this.ground + this.getNumber();
	}
}


Sports.setGround('상암구장');
console.log(Sports.getGround());










class Sports {
	constructor() {
		//이미 constructor가 호출된 이 시점에 인스턴스 가 생성됨.
		// 생성한 인스턴스 this 로 참조가 가능해짐
		let ground = Sports.getGround();
		console.log(ground);
		//getGround 가 static 이므로 바로 호출이 가능
		//'상암구장' 출력


		ground = this.constructor.getGround();
		console.log(ground);
		//getGround() 가 스테틱 메소드이고
		//constructor 에서 인스턴스를 생성했으므로 this 는 인스턴스를 참조
		//this.getGround() 로 호출 불가
		//this 가 참조하는 인스턴스 구조를 보면 proto 가 있고 여기에 constructor 가 첨부되어 있음
		//constructor 를 class 를 참조하므로 this.constructor.getGround()로 호출 가능
		//'상암구장' 출력
	}

	static getGround() {
		return '상암구장';
	}
}