export const randomString = () => {
    return (Math.floor(Math.random() * (999999999999999 - 100000000000000)) + 100000000000000).toString();
}

export const generate = (firstNumber) => {
    const random =  randomString();
    return firstNumber + random;
}

export const generateNumberAccount = (list,firstNumber) => {
    let number = '';
    let flag = false;
    while(!flag){
        const random = generate(firstNumber);
        flag = true;
        for(let i = 0; i < list.length;i++){
            if(i.number === random){
                flag = false;
                break;
            }
        }
        if(flag){
            number = random;
        }
    }
    return number;
}
