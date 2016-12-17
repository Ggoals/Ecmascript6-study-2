var type = "Type";

class Sports {
	static ["get"+type](kind) {
		return kind? "스포츠" : "음악";
	}
}

let result = Sports["get" + type](1);