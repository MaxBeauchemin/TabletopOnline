class GameObjectDeck extends GameObject{

  constructor(x, y, w, h, cardBackImg){
    super(x, y, w, h);
    this.cardBackImg = cardBackImg;
    this.cards = [];
    this.facedown = true;
  }

  isEmpty(){
    return this.cards == null || this.cards.length == 0;
  }

  addExistingCard(cardObject){
    this.cards.push(cardObject);
  }

  addNewCard(img){
    this.cards.push(new GameObjectCard(this.x, this.y, this.w, this.h, img));
  }

  update(){
    //dragging from the deck should separate out the card object from the top
    if (this.dragging){
      if (this.isEmpty()) return;

      var card = this.cards.shift();
      console.log(card);

      this.dragging = false;
      card.dragging = true;
      card.draggingOffsetX = this.draggingOffsetX;
      card.draggingOffsetY = this.draggingOffsetY;

      addGameObject(card);
    }
  }

  show(){
    super.show();

    if (this.isEmpty()){
      strokeWeight(3);
      stroke(0, 0, 255, 50);
      rect(this.x, this.y, this.w, this.h);
      return;
    }

    if (this.facedown){
      image(this.cardBackImg, this.x, this.y, this.w, this.h);
    } else {

    }
  }
}
