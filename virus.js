class Demon {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.movecount = 0;
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
  destroy(){
    var Cells = this.ChooseCell(3).concat(this.ChooseCell(2));
    var newCell = random(Cells);


    if(newCell){
      var x = newCell[0];
      var y = newCell[1];
      if(matrix[y][x] == 2){
        for(var i in EaterArr){
          if(x == EaterArr[i].x && y == EaterArr[i].y){
            EaterArr.splice(i,1);
            matrix[y][x] = 0;
            //console.log('eat');
            break;
          }
        }
      }
      if(matrix[y][x] == 3){
        for(var i in predArr){
          if(x == predArr[i].x && y == predArr[i].y){
            predArr.splice(i,1);
            matrix[y][x] = 0;
            //console.log('eat');
            break;
          }
        }
      }
  }
  else{
    this.move();
  }

}
  move(){
    this.movecount++;
    if(this.movecount > 4){
    var Cells = this.ChooseCell(0).concat(this.ChooseCell(1));
    var newCell = random(Cells);
      if(newCell){var x = newCell[0];
      var y = newCell[1];
      if(matrix[y][x] == 1){
        for(var i in grassArr){
          if(x == grassArr[i].x && y == grassArr[i].y){
              grassArr.splice(i, 1);
          }
        }
      }
      matrix[y][x] = 5;
      matrix[this.y][this.x] = 6;
      var newfire = new firepit(this.x,this.y)
      pitArr.push(newfire);

      this.x = x;
      this.y = y;
      this.movecount = 0;
    }
  }
  }
}

class firepit{
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