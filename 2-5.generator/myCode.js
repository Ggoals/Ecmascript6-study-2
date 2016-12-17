class Member {
	*gen() {
		yield 10;
		yield 20;
	}
}

let obj = new Member();
let genObj = obj.gen();

let result = genObj.next();
console.log(result);
let result = genObj.next();
console.log(result);



