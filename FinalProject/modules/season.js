module.exports = class seasonhelper{
    constructor(){
        this.seasoncounter = 0;
    }
    Count(){
        this.seasoncounter++;
        if(this.seasoncounter == 3){
            season++;
        }
        else if(this.seasoncounter == 3 && season == 3){
            season = 0;
        }
    }
}