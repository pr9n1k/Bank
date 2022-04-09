import { Button, Col, Row } from 'antd';
import React, { FC } from 'react';
import { Account } from '../../models/Account';
import { departmentAPI } from './../../service/department';
import TableBalance from './TableBalance';
interface BalanceType{
    isOperator: boolean
}
const Balance:FC<BalanceType> = ({isOperator}) => {
    const id = localStorage.getItem('user');
    const {data:account,isLoading,error} = departmentAPI.useGetAccountByEmployeeQuery(id as string);
    if(isLoading){
        return <h1>Загрузка..</h1>
    }
    if(error){
        <h1>{error}</h1>
    }
    return (
        <>  
            <h1 className='h1 title'>Баланс Кассы</h1>
            <Row>
                <Col span={12} offset={6}>
                    <TableBalance account={account || {} as Account}/>
                </Col>
            </Row>
            {isOperator && 
                <Row>
                    <Col span={12} offset={6}>
                        <Button>Отдать деньги</Button>
                        <Button>Заказать деньги</Button>
                    </Col>
                </Row>
            }
        </>
    );
}

export default Balance;