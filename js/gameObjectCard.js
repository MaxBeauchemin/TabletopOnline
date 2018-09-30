class GameObjectCard extends GameObject{

  constructor(x, y, w, h, frontImg, backImg){
    super(x, y, w, h);
    this.frontImg = frontImg;
    this.backImg = backImg;
  }

  show(){
    super.show();

    image(this.frontImg, this.x, this.y, this.w, this.h);
  }
}
