class CalcController{

    constructor(){

        this._displayCalc = "0";
        this._curremtDate;
        this.inicialize();
    }

    inicialize(){

    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }

    get curremtDate(){
        return this.curremtDate;
    }

    set curremtDate(valor){
        this._curremtDate = valor;
    }
}