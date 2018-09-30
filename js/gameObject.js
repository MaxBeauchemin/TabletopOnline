class GameObject
{
	constructor(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.dragging = false;
	}

	update(){
		if (this.dragging){
			this.x = mouseX - this.draggingOffsetX;
			this.y = mouseY - this.draggingOffsetY;
		}
	}

	show(){
		noFill();
		if (this.dragging){
			strokeWeight(2);
			stroke(255, 0, 0);
			rect(this.x, this.y, this.w, this.h);
			//This will not work with non-rectangular objects
		} else {
			noStroke();
		}
	}
}
