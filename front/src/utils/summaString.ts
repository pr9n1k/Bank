

export const summaString = (arrayString: string[]) => {
    const summa = ['0','0'];
    arrayString.forEach(item => {
        const value = item.split('.');
        let cent = parseInt(summa[1]) + parseInt(value[1]);
        let money = parseInt(summa[0]) + parseInt(value[0]);
        if(cent >=100){
            money = money + 1;
            cent = cent - 100;
        }
        summa[0] = money.toString();
        summa[1] = cent.toString();
    })
    return `${summa[0]}.${summa[1]}`;
}