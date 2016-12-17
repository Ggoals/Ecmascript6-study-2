ㅁ hoisting
class 는 호이스팅이 되지 않음
	class 선언문, class 표현식 모두 해당
	function 과 다름


sports();

let result = Member;
// 에러가 발생
// 왜냐하면 Member 가 아래 선언되어 있다.
// 호이스팅이 되지 않기 때문에!!

class Member {
	static getMember() {
		return "member";
	}
}
let result = Member.getMember();
