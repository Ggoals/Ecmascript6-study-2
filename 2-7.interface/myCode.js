class ExtendsImage extends Image {
//Image 인터페이스를 상속
//Image 의 특성을 가지게 됌!
	constructor() {
		supter();
	}

	setProperty() {
		this.src = "file/rainbow.jpg";
		this.alt = '하하하';
		this.title = '무지개';
	}
}

let obj = new ExtendsImage();
obj.setProperty();

document.querySelector('body').appendChild(obj);




class ExtendsAudio extends Audio {
//Audio 는 HTML5 인터페이스중 하나임
	constructor() {
		super();
	}
	setProperty() {
		this.src = "file/Beet5.ogg";
		this.controls = true;
		this.muted = true;
		this.loop = true;
	}
}

let obj = new ExtendsAudio();
obj.setProperty();

document.querySelector('body').appendChild(obj);




////강사 의견!!
1. 모든 경우에 class 를 사용해야 하며 적합하다고 할 수는 없습니다.
2. 경우에 따라서는 function 이 좋을 수 있습니다.
3. 하지만, 한가지 분명한 것은 설계를 해야 합니다!!