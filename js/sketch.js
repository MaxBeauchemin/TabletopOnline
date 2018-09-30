var firestore;
var database;
var objects;
var mouseHeld;

function setup() {
	var canvas = createCanvas(1500, 600);
	canvas.parent('canvasContainer');

	objects = [];
	mouseHeld = false;

	// Initialize Firebase
	//const firebase = require("firebase");
	//require("firebase/firestore");

	var config = {
    apiKey: "AIzaSyDgEbBQa_9gJBuvvPQGJAw27RDwkrqP6Bo",
    authDomain: "tabletop-007.firebaseapp.com",
    databaseURL: "https://tabletop-007.firebaseio.com",
    storageBucket: "tabletop-007.appspot.com"
  };
  firebase.initializeApp(config);
	//firestore = firebase.firestore();
	database = firebase.database();
	//firestore.settings({
	 // timestampsInSnapshots: true
	//});

	//firestore.collection("rooms").get().then(function (docs){
		//docs.forEach(function (d){
			//console.log(d.data());
		//});
	//});

	//Unknown if syntax is still the same
	var ref = database.ref('rooms');
  ref.on('value', gotRoomsData, errRoomsData);
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

		var deck = new GameObjectDeck(mouseX, mouseY, 80, 120);
		deck.addNewCard(cardImg, backImg);
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

function gotRoomsData(data){
	var val = data.val();
	for (key in val){
		console.log(val[key]);
	}
}

function errRoomsData(error){
	console.log('Error getting Rooms: => ' + error);
}

/*
function saveData(){
	var data = currPath.format();
	if(currPath.key == null){
		var res = database.ref('rooms').push(data);
		currPath.key = res.key;
	} else {
		var ref = database.ref('rooms/' + currPath.key);
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
*/
