var Liveform = require('./Liveform');
var random = require('./random');
module.exports = class Grass extends Liveform{
    constructor(x, y) {
      super(x,y);
      this.multiply = 0;
    }
    chooseCell(character){
      super.getNewCoordinates();
      return super.ChooseCell(character);
    }
    mul() {
      this.multiply++;
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
  
      if (this.multiply == 6 && newCell) {
        var x = newCell[0];
        var y = newCell[1];
        matrix[y][x] = 1;
        let newGrass = new Grass(x, y);
        grassArr.push(newGrass);
        this.multiply = 0;
      }
    }
    
  }