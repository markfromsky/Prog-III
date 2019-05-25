var Liveform = require('./Liveform');
var random = require('./random')
module.exports = class GrassEater extends Liveform{
    constructor(x, y) {
      super(x,y);
      this.multiply = 0;
      this.energy = 10;
    }
    move() {
      var Cells = this.ChooseCell(0);
      var newCell = random(Cells);
  
  
      if (newCell) {
        var x = newCell[0];
        var y = newCell[1];
  
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
  
        this.x = x;
        this.y = y;
      }
    }
    ChooseCell(character){
      super.getNewCoordinates();
      return super.ChooseCell();
    }
    eat(){
      if (this.energy <= 0) {
        this.die();
      }
      else {
        var Cells = this.ChooseCell(1);
        var cell = random(Cells);
        if (cell) {
          var x = cell[0];
          var y = cell[1];
          matrix[y][x] = 2;
          matrix[this.y][this.x] = 0;
    
          this.x = x;
          this.y = y;
    
          this.multiply++;
          this.energy++;
          grasscounter--;

          for (var i in grassArr) {
            if (x == grassArr[i].x && y == grassArr[i].y) {
              grassArr.splice(i, 1);
            }
          }
    
          if (this.multiply >= 3) {
            this.mul();
            this.multiply = 0;
          }
    
        }
        else {
          this.move();
          this.energy--;
        }
      }
  
  
      
    }
    mul() {
      var ChooseCell = this.ChooseCell(0);
      var cell = random(ChooseCell);
  
      if (cell) {
        var x = cell[0];
        var y = cell[1];
  
        this.multiply++;
  
        var newEater = new GrassEater(x, y);
        EaterArr.push(newEater);
  
        matrix[y][x] = 2;
        eatercounter++;
      }
    }
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in EaterArr) {
        if (this.x == EaterArr[i].x && this.y == EaterArr[i].y) {
          EaterArr.splice(i, 1);
          eatercounter--;
        }
      }
    }
  }