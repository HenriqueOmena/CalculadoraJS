class CalcController{

    constructor(){
        this.locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._curremtDate;
        this.inicialize();
        this.initButtonsEvents();
    }

    inicialize(){
       this.setDisplayDateTime();
       setInterval(()=>{

        this.setDisplayDateTime();

       }, 800);
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })

    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e=>{

                console.log(btn.className.baseVal.replace("btn-",""));

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"
            });

        });

    }

    setDisplayDateTime(){
        this.displayDate = this.curremtDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
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