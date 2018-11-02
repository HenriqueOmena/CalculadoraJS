class CalcController{

    constructor(){
        this._operation = [];
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

       this.setLastnumberToDisplay();
       console.log(2);

    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })

    }

    clearAll(){

        this._operation = [];

        this.setLastnumberToDisplay();

    }

    clearEntry(){

        this._operation.pop();

        this.setLastnumberToDisplay();

    }

    getLastOperation(){

        return this._operation[this._operation.length-1];

    }

    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value){

        return (['+','-','*','%','/'].indexOf(value) > -1);

    }

    pushOperation(value){

        this._operation.push(value);

        if (this._operation.length > 3 ) {

            this.calc();

        }

    }

    calc(){

        let last = '';

        if (this._operation > 3) {
            last = this._operation-pop();
        }

        let result = eval(this._operation.join(""));

        if (last == '%') {

            result = result / 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if(last) this._operation-push(last);

        }

        this.setLastnumberToDisplay();

    }

    setLastnumberToDisplay(){

        let lastNumber;
        
        for(let i = this._operation.length-1; i >= 0; i--){
            
            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
            
        }
        
        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }


    addOperation(value){

        if (isNaN(this.getLastOperation())) {

            //em caso de string cai aqui
            if(this.isOperator(value)){

                //troca operador
                this.setLastOperation(value);

            }else if(isNaN(value)){

                console.log('Outra coisa', value);

            }else {

                this.pushOperation(value)

                this.setLastnumberToDisplay();

            }

        }else{

            if (this.isOperator(value)) {
                
                this.pushOperation(value)

            } else{
                //em caso de NUMERO cai aqui
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));


                //Atualizar display
                this.setLastnumberToDisplay()
            }
   
        }

    }

    setError(){

        this.displayCalc = "Error";

    }

    execBtn(value){

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
            this.addOperation('+');
                break;
            case 'subtracao':
            this.addOperation('-');
                break;
            case 'divisao':
            this.addOperation('/');
                break;
            case 'multiplicacao':
            this.addOperation('*');
                break;
            case 'porcento':
            this.addOperation('%');
                break;
            case 'igual':
            this.calc();
                break
            case 'ponto':
            this.addOperation('.');     
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e=>{

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);


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