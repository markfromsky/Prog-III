module.exports = class seasonhelper{
    constructor(){
        this.seasoncounter = 0;
    }
    Count(){
        if(this.seasoncounter == 3){
            season++;
        }
        else if(this.seasoncounter == 3 && season == 3){
            season = 0;
        }
        this.counter++;
    }
}