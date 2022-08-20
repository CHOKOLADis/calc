
class calc {

    constructor(){
        
    } 

    numClick(num){

        const save = $('.result').text();

        if (save == 0) {
            $('.result').text(num.text());
        } else {
            $('.result').text(save+num.text());
        }
    }

    plus(num,add){

        (add) ? res = num + add : res = num + 1;
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

        let [num1, sign, num2] = equalStr.split(/([\+\-\*\/])/);
        console.log([num1, sign, num2]);
        [num1, num2] = [+num1, +num2];
        console.log([num1, sign, num2]);

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

    fullClear(){
        $('.result').text(0);
    }

    delLast(){
        
        let save = $('.result').text();

        if (save.length == 1) {
            $('.result').text(0);
        } else {
            $('.result').text(save.slice(0, save.length-1));
        }
        
    }
}

let calcObj = new calc();

$(document).ready( function(){

    $('.num').on('click',function(){
      
        calcObj.numClick($(this));

    });

    $('#fullClear').on('click',function(){
      
        calcObj.fullClear();

    });

    $('#delLast').on('click',function(){
      
        calcObj.delLast();

    });
});