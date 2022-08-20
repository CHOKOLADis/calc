
class calc {

    allNum = $('.num');
    s_plus = $('#plus');
    fullClear = $('#fullClear');
    delLast = $('#delLast');

    print = 0;
    lastSymbolNum = true;

    constructor(){
        
    } 

    numClick(num){

        const save = $('.result').text();

        if (save == 0) {
            this.printResult(num.text());
        } else {
            this.printResult(save+num.text());
        }
    }

    plus(){

        let res = '';
        let data = $('.result').text();

        if (this.lastSymbolNum) {
            this.print = data + '+';
            this.lastSymbolNum = false;
        } else{
            this.print = this.equality(data) + '+';
            this.lastSymbolNum = false;
        }

        this.printResult(this.print);
        return res;
    }

    minus(num,sub){

        (sub) ? res = num + sub : res = num + 1;
        return res;
    }

    multiply(num,multy){

        (multy) ? res = num + multy : res = num + 1;
        return res;
    }

    divide(num,div){

        (div) ? res = num + div : res = num + 1;
        return res;
    }
     
    equality(equalStr){

        console.log(equalStr);
        let [num1, sign, num2] = equalStr.split(/([\+\-\*\/])/);
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
            case '*':
            result = num1 * num2;
            break;
            case '/':
            result = num1 / num2;
            break;
        }

        return result;
    }

    delLast(){
        
        let save = $('.result').text();

        if (save.length == 1) {
            $('.result').text(0);
        } else {
            $('.result').text(save.slice(0, save.length-1));
        }
        
    }

    printResult(data){
        $('.result').text(data);
    }
}

let calcObj = new calc();

calcObj.allNum.on('click', function() { calcObj.numClick($(this)); });

calcObj.s_plus.on('click', () => { calcObj.plus(); });

calcObj.fullClear.on('click', () => { calcObj.printResult(0); });

calcObj.delLast.on('click', () => { calcObj.delLast(); });