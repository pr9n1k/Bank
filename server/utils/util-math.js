

export const summaString = (first,second) => {
    const arrayFirst = first.split('.');
    const arraySecond = second.split('.');
    const arraySumma = [];
    if(!arrayFirst[1]){
        arrayFirst[1] = '00';
    }
    if(!arraySecond[1]){
        arraySecond[1] = '00'
    }
    if(arrayFirst[1].length == 1){
        arrayFirst[1] = arrayFirst[1] + '0';
    }
    if(arraySecond[1].length == 1){
        arraySecond[1] = arraySecond[1] + '0';
    }
    arraySumma[0] = (parseInt(arrayFirst[0]) + parseInt(arraySecond[0])).toString();
    arraySumma[1] = (parseInt(arrayFirst[1]) + parseInt(arraySecond[1])).toString();
    if(parseInt(arraySumma[1]) >= 100){
        arraySumma[0] = (parseInt(arraySumma[0]) + 1).toString();
        arraySumma[1] = (parseInt(arraySumma[1]) - 100).toString();
    }
    return arraySumma[0] + '.' + arraySumma[1]
}

export const differenceString = (first,second) => {
    const arrayFirst = first.split('.');
    const arraySecond = second.split('.');
    const arrayDifference = [];
    if(!arrayFirst[1]){
        arrayFirst[1] = '00';
    }
    if(!arraySecond[1]){
        arraySecond[1] = '00'
    }
    if(arrayFirst[1].length == 1){
        arrayFirst[1] = arrayFirst[1] + '0';
    }
    if(arraySecond[1].length == 1){
        arraySecond[1] = arraySecond[1] + '0';
    }
    arrayDifference[1] = (parseInt(arrayFirst[1]) - parseInt(arraySecond[1])).toString();
    if(parseInt(arrayDifference[1]) < 0){
        arrayFirst[0] = (parseInt(arrayFirst[0]) - 1).toString();
        arrayDifference[1] = (parseInt(arrayDifference[1]) + 100).toString();
    }
    arrayDifference[0] = (parseInt(arrayFirst[0]) - parseInt(arraySecond[0])).toString();

    return arrayDifference[0] + '.' + arrayDifference[1]
}

export const compareMoreOrEqually = (first,second) => {
    const arrayFirst = first.split('.');
    const arraySecond = second.split('.');
    if(!arrayFirst[1]){
        arrayFirst[1] = '00';
    }
    if(!arraySecond[1]){
        arraySecond[1] = '00'
    }
    if(arrayFirst[1].length == 1){
        arrayFirst[1] = arrayFirst[1] + '0';
    }
    if(arraySecond[1].length == 1){
        arraySecond[1] = arraySecond[1] + '0';
    }

    if(parseInt(arrayFirst[0]) > parseInt(arraySecond[0])){
        return true;
    }else if(parseInt(arrayFirst[0]) === parseInt(arraySecond[0]) && parseInt(arrayFirst[1]) >= parseInt(arraySecond[1])){
        return true
    }else{
        return false;
    }
}