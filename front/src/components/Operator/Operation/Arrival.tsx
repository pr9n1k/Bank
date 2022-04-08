import React, { FC, useEffect, useState } from 'react';
import { Account } from './../../../models/Account';
import ArrivalForm from './ArrivalForm';
import { Operation } from './../../../models/Operation';
import { nowDate } from '../../../utils/date';
import { clientAPI } from './../../../service/clientService';
import { departmentAPI } from './../../../service/department';
import { employeeAPI } from './../../../service/employeeService';
import { Col, Row } from 'antd';
interface ArrivalType{
    account: Account
}
const Arrival:FC<ArrivalType> = ({account}) => {
    const idEmployee = localStorage.getItem('user') || '';
    const [operation,setOperation] = useState({} as Operation)
    const date = nowDate(new Date());
    useEffect(()=>{
        setOperation({
            ...operation,
            idEmployee:idEmployee,
            date: date,
            currency: account.value[0].currency,
            type: 'приход',
            isConfirm: false,
            numberAccount: account.number,
        });

    },[])
    return (
        <>
            <h1 className='h1 title'>Приход</h1>
            <Row>
                <Col span={12} offset={6}>
                    <ArrivalForm operation={operation} setOperation={setOperation}/>
                </Col>
            </Row>
        </>
    );
}

export default Arrival;