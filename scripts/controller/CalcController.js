class CalcController{


    constructor(){

        this._audio = new Audio('click.mp3');
        this._audioOnoff = true;
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this.locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._curremtDate;
        this.inicialize();
        this.initButtonsEvents();
        this.initiKeybard();
    }

    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();


    }

    pasteFromClipboard(){

        document.addEventListener('paste', e=>{

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);


        })

    }

    inicialize(){
       this.setDisplayDateTime();
       setInterval(()=>{

        this.setDisplayDateTime();

       }, 800);

       this.setLastnumberToDisplay();
       this.pasteFromClipboard();

       document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e=>{

                this.toggleAudio();

            });
           
       });
    }

    toggleAudio(){

        // modo 1 
        this._audioOnoff = !this._audioOnoff;        

        // //modo 2
        // this._audioOnoff = (this._audioOnoff) ? false : true;

        // //modo 3
        // if (this._audioOnoff) {
        //     this._audioOnoff = false;
        // }else{
        //     this._audioOnoff = true;
        // }

    }

    playAudio(){

        if (this._audioOnoff) {

            this._audio.currentTime = 0;
            this._audio.play();

        }

    }

    initiKeybard(){

        document.addEventListener('keyup', e => {

            this.playAudio();

            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                this.calc();
                    break
                case '.':
                case ',':
                this.addDot();     
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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;
                
            }

        });

    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })

    }

    clearAll(){

        this._operation = [];
        this._lastNumber = "";
        this._lastOperator = "";

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

    getResult(){
        try{
            return eval(this._operation.join(""));
        }catch(e){

            setTimeout(() => {
                this.setError();        
            }, 1);
            
            console.log('catch', e);

        }
        

    }

    calc(){

        let last = '';

        this._lastOperator = this.getLastitem();

        if (this._operation < 3) {
            
            let firstUItem = this._operation = [0];
            this._operation = [firstUItem, this._lastOperator, this._lastNumber];

        }
        

        if (this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if(this._operation.length == 3) {

            this._lastNumber = this.getLastitem(false);
            

        }

        //console.log('_lastOperator', this._lastOperator);
        //console.log('_lastNumber', this._lastNumber);
        
        let result = this.getResult();

        if (last == '%') {

            result = result / 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastnumberToDisplay();

    }

    getLastitem(isOperator = true){

        let lastItem;
        
        for(let i = this._operation.length-1; i >= 0; i--){
          
                if (this.isOperator(this._operation[i]) == isOperator) {
                    lastItem = this._operation[i];
                    break;
                }
            
        }  

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    setLastnumberToDisplay(){

        let lastNumber = this.getLastitem(false);
        
        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }


    addOperation(value){

        if (isNaN(this.getLastOperation())) {

            //em caso de string cai aqui
            if(this.isOperator(value)){

                //troca operador
                this.setLastOperation(value);

            } else {

                this.pushOperation(value)

                this.setLastnumberToDisplay();

            }

        }else{

            if (this.isOperator(value)) {
                
                this.pushOperation(value)

            } else{
                //em caso de NUMERO cai aqui
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);


                //Atualizar display
                this.setLastnumberToDisplay()
            }
   
        }

    }

    setError(){

        this.displayCalc = "Error";

    }

    addDot(){

        let lastOperation = this.getLastOperation();
        
        //console.log('lastOperation', lastOperation);

        if (lastOperation && lastOperation.split('').indexOf('.') > -1 ) return

        if (this.isOperator(lastOperation) || !lastOperation) {
            
            this.pushOperation('0.')

        } else{

            this.setLastOperation(lastOperation.toString() + '.');

        }
        
        this.setLastnumberToDisplay();

    }

    execBtn(value){

        this.playAudio();

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
            this.addDot();     
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

    set displayDate(value ){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        if (value.toString().length > 10) {
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;
    }

    get curremtDate(){
        return new Date();
    }

    set curremtDate(value){
        this._curremtDate = value;
    }
}
