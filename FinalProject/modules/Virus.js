var random = require('./random')
var Liveform = require('./Liveform');
module.exports = class Virus extends Liveform{
    constructor(x,y){
    super(x,y);
    this.new = 0;
    this.explode = 0;
    this.directions = [];
    this.modifier = 0;
    }
  ChooseCell(character){
    super.getNewCoordinates();
    return super.ChooseCell(character);
  }
  charge(){
    this.explode++;
    if(this.explode > 20){
      this.explodee();
    }
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
        grasscounter--;
      }
      else if(matrix[y][x] == 2){
        for(var i in EaterArr){
          if(x == EaterArr[i].x && y == EaterArr[i].y){
            EaterArr.splice(i,1);
          }
        }
        eatercounter--;
      }
      else if(matrix[y][x] == 3){
        for(var i in predArr){
          if(x == predArr[i].x && y == predArr[i].y){
            predArr.splice(i,1);
          }
        }
        predcounter--;
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
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
    }
  }
  }
    die() {
      matrix[this.y][this.x] = 4;
      for (var i in VirusArr) {
        if (this.x == VirusArr[i].x && this.y == VirusArr[i].y) {
          VirusArr.splice(i, 1);
        }
      }
    }
  }