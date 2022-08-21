
class calc {

    allNum = $('.num');
    s_plus = $('#plus');
    s_minus = $('#minus');
    s_multiply = $('#multiply');
    s_divide = $('#divide');
    s_equal = $('#equal');
    fullClear = $('#fullClear');
    s_delLast = $('#delLast');

    print = 0;
    lastSymbolNum = true;

    constructor(){
        
    } 

    numClick(num){

        const save = $('#res').text();

        if (save == 0) {
            this.printResult(num.text());
        } else {
            this.printResult(save+num.text());
        }

        this.lastSymbolNum = true;
    }

    defAction(operation){

        let res = '';
        let data = $('#res').text();

        if (this.lastSymbolNum) {

            this.print = data + `${operation}`;
            this.lastSymbolNum = false;

            if (this.checkOn2Vars()){
                this.print = this.equality(data) + `${operation}`;
                this.lastSymbolNum = false;
            }

        } else{

            return false;
            this.lastSymbolNum = false;
        }

        this.printResult(this.print);
        return res;

    }
   
    equality(equalStr){

        let [num1, sign, num2] = equalStr.split(/([\+\-\×\/])/);
        
        if (equalStr != 0) {
            this.history = equalStr;
        }

        console.log([num1, sign, num2]);

        if ([num2] == null){
            return [num1];
        }

        [num1, num2] = [+num1, +num2];

        let result = null;

        switch (sign) {
            case '+':
            result = num1 + num2;
            break;
            case '-':
            result = num1 - num2;
            break;
            case '×':
            result = num1 * num2;
            break;
            case '/':
            result = num1 / num2;
            break;
        }

        return result;
    }

    delLast(){

        let save = $('#res').text();

        if (save.length == 1) {
            $('#res').text(0);
        } else {
            $('#res').text(save.slice(0, save.length-1));
        }

        this.checkLastSymbol();
        
    }

    checkLastSymbol(){
        
        const text = $('#res').text();
        const lastSymbol = text.split('').pop();
        const regCheck = lastSymbol.split(/([\+\-\*\/])/);

        if (regCheck.length>1){
            this.lastSymbolNum = false;
        } else {
            this.lastSymbolNum = true;
        }

        return lastSymbol;
    }

    checkOn2Vars(){

        const text = $('#res').text();
        const items = text.split(/([\+\-\*\/])/);
        
        console.log(items.length);
        if (items.length>1){
            return true;
        } else {
            return false;
        }
    }

    printResult(data){

        
        $('.history').text(this.history);
        $('#res').text(data);

        if (data === null || data == 0){

            this.lastSymbolNum = true;
            $('.history').text();
            $('#res').text('0');
        }
        
    }
}

let calcObj = new calc();

calcObj.allNum.on('click', function() { calcObj.numClick($(this)); });

calcObj.s_plus.on('click', () => { calcObj.defAction('+'); });
calcObj.s_minus.on('click', () => { calcObj.defAction('-'); });
calcObj.s_multiply.on('click', () => { calcObj.defAction('×'); });
calcObj.s_divide.on('click', () => { calcObj.defAction('/'); });

calcObj.s_equal.on('click', () => { calcObj.equality($('#res').text()); });

calcObj.fullClear.on('click', () => { calcObj.printResult('0'); });

calcObj.s_delLast.on('click', () => { calcObj.delLast(); });