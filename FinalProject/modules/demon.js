var firepit = require('./firepit')
var Liveform = require('./Liveform.js')
var random = require('./random')
module.exports = class Demon extends Liveform{
    constructor(x,y){
      super(x,y);
      this.movecount = 0;
    }
    ChooseCell(character){
      super.getNewCoordinates();
      return super.ChooseCell(character);
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
          eatercounter--;
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
          predcounter--;
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
                grasscounter--;
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