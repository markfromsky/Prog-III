class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
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
  chooseCell() {
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == 0) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell();
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