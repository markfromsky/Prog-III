class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.energy = 3;
    // this.index = index;
    this.directions = []
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }

  ChooseCell(t) {
    this.getNewCoordinates();
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == t) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
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