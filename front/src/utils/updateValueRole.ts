export const updateValueRole = (role:String):string => {
    if(role === 'ADMIN'){
        return 'Админ';
    }else if(role === 'OPERATOR'){
        return 'Операционист';
    }else if(role === 'CASHIER'){
        return 'Кассир';
    }else{
        return '';
    }
}