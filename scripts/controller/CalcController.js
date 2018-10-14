class CalcController{

    constructor(){
        this.locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._curremtDate;
        this.inicialize();
    }

    inicialize(){
       this.setDisplayDateTime();
       setInterval(()=>{

           this.displayDate = this.curremtDate.toLocaleDateString(this._locale);
           this.displayTime = this.curremtDate.toLocaleTimeString(this._locale);

       }, 800);
    }

    setDisplayDateTime(){
        this.displayDate = this.curremtDate.toLocaleDateString(this._locale);
        this.displayTime = this.curremtDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get curremtDate(){
        return new Date();
    }

    set curremtDate(value){
        this._curremtDate = value;
    }
}