module.exports = class firepit{
    constructor(x,y){
      this.x = x;
      this.y = y
      this.lifespan = 4;
    }
    burn(){
      if(this.lifespan == 0){
        this.die();
      }
      this.lifespan--;
    }
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in pitArr) {
        if (this.x == pitArr[i].x && this.y == pitArr[i].y) {
          pitArr.splice(i, 1);
        }
      }
    }
  }