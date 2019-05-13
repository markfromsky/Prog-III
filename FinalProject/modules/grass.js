class Grass extends Liveform{
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