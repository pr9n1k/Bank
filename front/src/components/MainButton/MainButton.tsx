import { Button, message } from 'antd';
import React from 'react';
import './MainButton.css'
import { isVatification } from './../../utils/varification';
import { useNavigate } from 'react-router-dom';
import { useTakeEmployee } from './../../hooks/useTakeEmployee';

const MainButton = () => {
    const router = useNavigate();
    const {employee} = useTakeEmployee();
    const onClickAdmin = () => {
        if(isVatification('ADMIN',employee?.role as string) && employee?.idDepartment === 'ADMIN'){
            router('/admin')
        }else{
            message.warning('У Вас нет прав доступа!');
        }
    }
    const onClickCashier = () => {
        if(isVatification('CASHIER',employee?.role as string) && employee?.idDepartment != 'not'){
            router('/cashier')
        }else{
            message.warning('У Вас нет прав доступа!');
        }
    }
    const onClickOperator = () => {
        if(isVatification('OPERATOR',employee?.role as string) && employee?.idDepartment != 'not'){
            router('/operator')
        }else{
            message.warning('У Вас нет прав доступа!');
        }
    }
    
    return (
        <div className='mainButton__body'>
            <Button
                onClick={onClickAdmin}
            >
                Админ
            </Button>
            <Button
                onClick={onClickOperator}
            >
                Оператор
            </Button>  
            <Button
                onClick={onClickCashier}
            >
                Кассир
            </Button>  
        </div>
    );
}

export default MainButton;