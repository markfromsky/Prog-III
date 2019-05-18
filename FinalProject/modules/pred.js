var Liveform = require('./Liveform');
var random = require('./random');
module.exports = class Predator extends Liveform {
  constructor(x, y) {
    super(x, y);
    this.multiply = 0;
    this.energy = 5;
  }
  ChooseCell(character) {
    super.getNewCoordinates();
    return super.ChooseCell(character);
  }
  move() {
    var Cells = this.ChooseCell(0);
    var newCell = random(Cells);


    if (newCell) {
      var x = newCell[0];
      var y = newCell[1];

      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.x = x;
      this.y = y;
    }
  }
  eat() {
    var Cells = this.ChooseCell(2);
    var cell = random(Cells);
    if (cell) {
      var x = cell[0];
      var y = cell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;

      this.x = x;
      this.y = y;

      this.multiply++;
      this.energy++;

      for (var i in EaterArr) {
        if (x == EaterArr[i].x && y == EaterArr[i].y) {
          EaterArr.splice(i, 1);
        }
      }

      if (this.multiply >= 5) {
        this.mul();
        this.multiply = 0;
      }

    }
    else {
      this.move();
      this.energy--;
      if (this.energy <= 0) {
        this.die();
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

      var newPredator = new Predator(x, y);
      predArr.push(newPredator);

      matrix[y][x] = 3;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in predArr) {
      if (this.x == predArr[i].x && this.y == predArr[i].y) {
        predArr.splice(i, 1)
      }
    }
  }
}