class GameObjectCard extends GameObject{

  constructor(x, y, w, h, img){
    super(x, y, w, h);
    this.img = img;
  }

  show(){
    super.show();

    image(this.img, this.x, this.y, this.w, this.h)
  }
}
