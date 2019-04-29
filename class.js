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
class GrassEater {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.energy = 15;
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

      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;

      this.x = x;
      this.y = y;
    }
  }
  eat() {
    


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
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in EaterArr) {
      if (this.x == EaterArr[i].x && this.y == EaterArr[i].y) {
        EaterArr.splice(i, 1)
      }
    }
  }
}

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
class Virus{
  constructor(x,y){
  this.x = x;
  this.y = y;
  this.new = 0;
  this.explode = 0;
  this.directions = [];
  this.modifier = 0;
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
charge(){
  this.explode++;
  if(this.explode > 20){
    this.explodee();
  }
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
explodee(){
  var x;
  var y;
    var coords = this.ChooseCell(1).concat(this.ChooseCell(2),this.ChooseCell(3),this.ChooseCell(5));
   
  if(coords){
    for(var i in coords){
    x = coords[i][0];
    y = coords[i][1];
    if(matrix[y][x] == 1){
      
      for(var i in grassArr){
        if(x == grassArr[i].x && y == grassArr[i].y){
          grassArr.splice(i,1);
        }
      }
    }
    else if(matrix[y][x] == 2){
      for(var i in EaterArr){
        if(x == EaterArr[i].x && y == EaterArr[i].y){
          EaterArr.splice(i,1);
        }
      }
    }
    else if(matrix[y][x] == 3){
       console.log("cell");
      for(var i in predArr){
        if(x == predArr[i].x && y == predArr[i].y){
          predArr.splice(i,1);
        }
      }

    }
    else if(matrix[y][x] == 5){

      for(var i in demonArr){
        if(x == demonArr[i].x && y == demonArr[i].y){
          demonArr.splice(i,1);
          
        }
      }
    }
    matrix[y][x] = 0;
  }

  }
  
  this.die();
  this.modifier = 0;
}
move(){
  this.modifier++;
  this.charge();
  if(this.explode <= 20){
  var Cells = this.ChooseCell(0).concat(this.ChooseCell(1),this.ChooseCell(2));
  var Cell = random(Cells);
  if(Cell){
    var x = Cell[0];
    var y = Cell[1];
    var prev = matrix[y][x];
    matrix[y][x] = 4;
        if(this.modifier > 0){
        if(prev == 0){
    matrix[this.y][this.x] = 0;
  }
  else if(prev == 1){
    matrix[this.y][this.x] = 1;
  }
  else if(prev == 2){
    matrix[this.y][this.x] = 2;
  }
    }
    else{ matrix[this.y][this.x] = 0;}
    this.y = y;
    this.x = x;

  }
}
}
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in VirusArr) {
      if (this.x == VirusArr[i].x && this.y == VirusArr[i].y) {
        VirusArr.splice(i, 1);
      }
    }
  }
}
// class VirusInactive{
//   constructor(x,y){
//     this.x = x;
//     this.y = y;
//     this.countdown = 5;
//   }
// activate(){
//   this.countdown--;
//   console.log(matrix[this.y][this.x]);
//   if(this.countdown < 1){
//     matrix[this.y][this.x] = 4;
//     this.die();
//     var newVirus = new Virus(this.x,this.y);
//     VirusArr.push(newVirus);
//     this.die();
//   }
// }
// die(){
//   matrix[this.y][this.x] = 0;
//   for(var i in inactivearr){
//     if(this.x == inactivearr[i].x && this.y == inactivearr[i].y){
//       inactivearr.splice(i,1);
//     }
//   }
// }
// }