var database;
var objects;
var mouseHeld;

function setup() {
	var canvas = createCanvas(1500, 600);
	canvas.parent('canvasContainer');

	objects = [];
	mouseHeld = false;

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrfjBMqGQGt4mmZyj7eP3OLakc5ShRJPU",
    authDomain: "customservices-dfe9a.firebaseapp.com",
    databaseURL: "https://customservices-dfe9a.firebaseio.com",
    projectId: "customservices-dfe9a",
    storageBucket: "",
    messagingSenderId: "54272558564"
  };
  firebase.initializeApp(config);
	database = firebase.database();

	var ref = database.ref('tabltop');
  ref.on('value', gotData, errData);
}

function draw() {
	background(200);

	objects.forEach(function(o){
		o.update();
		o.show();
	});
}

function mousePressed() {
	//Ignore if outside screen
	if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height){
		return;
	}

	//See if on top of existing object
	var dragging = false;
	objects.reverse().forEach(function (o){
		if (!dragging && mouseX >= o.x && mouseX <= o.x + o.w && mouseY >= o.y && mouseY <= o.y + o.h){
			dragging = true;
			o.dragging = true;
			o.draggingOffsetX = mouseX - o.x;
			o.draggingOffsetY = mouseY - o.y;
		} else {
			o.dragging = false;
		}
	});

	objects.reverse();

	//Testing purposes only
	if (!mouseHeld && !dragging){
		var cardImg = loadImage("images/2C.png");
		var backImg = loadImage("images/blue_back.png");

		var deck = new GameObjectDeck(mouseX, mouseY, 80, 120, backImg);
		deck.addNewCard(cardImg);
		addGameObject(deck);

		//objects.push(new GameObjectCard(mouseX, mouseY, 80, 120, image));
	}

	mouseHeld = true;
}

function mouseReleased(){
	mouseHeld = false;
	objects.forEach(function (o){
		o.dragging = false;
	});
}

function addGameObject(object){
	objects.push(object);
}

function saveData(){
	var data = currPath.format();
	if(currPath.key == null){
		var res = database.ref('tabletop').push(data);
		currPath.key = res.key;
	} else {
		var ref = database.ref('tabletop/' + currPath.key);
		if(ref != null){
			ref.set(data);
		} else {
			currPath.key = null;
			saveData();
		}
	}
}

function gotData(data){
	var value = data.val();
	for(key in value){
		console.log(value[key]);
	}
}

function errData(error){
	console.log(error);
}
