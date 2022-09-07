
class calc {

    allNum = $('.num');
    s_plus = $('#plus');
    s_minus = $('#minus');
    s_multiply = $('#multiply');
    s_divide = $('#divide');

    s_plus_minus = $('#plus_minus');

    
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

            if (this.checkOn2Vars(data)){

                this.print = this.equality(data)  + `${operation}`;
                
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

    plus_minus(data){
        if ( !this.checkOn2Vars(data) ){

            let num = $('#res').text();
            Number(num);
            if (num < 0) {
                return Math.abs(num)
            } else {
                return -Math.abs(num)
            }
            
        }
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

    checkOn2Vars(data){

        const text = data;
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

        // Округление 
        let f_data = data;
        let f_type_data = typeof(data);
        Number(data);
        let s_data = data;
        if ( f_data === s_data && typeof(data) == 'number' ){
            data = +data.toFixed(2);
        } else {
            data = f_data;
        }

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

calcObj.s_plus_minus.on('click', () => { 
    console.log(1);
    calcObj.plus_minus($('#res').text()); 
});

calcObj.s_equal.on('click', () => { 
    let res = calcObj.equality($('#res').text());
    // console.log(res);
    calcObj.printResult(res);
});

calcObj.fullClear.on('click', () => { calcObj.printResult('0'); });

calcObj.s_delLast.on('click', () => { calcObj.delLast(); });