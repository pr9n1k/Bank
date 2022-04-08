import { Button, Card, message, Popconfirm } from 'antd';
import React, { FC } from 'react';
import { Operation } from './../../../models/Operation';
import { employeeAPI } from './../../../service/employeeService';
import { operationAPI } from '../../../service/operationServise';
interface PaymentsItemType{
    opertaion: Operation
}
const PaymentsItem:FC<PaymentsItemType> = ({opertaion}) => {
    const {data: employee} = employeeAPI.useGetByIdQuery(opertaion.idEmployee as string);
    const [confirm] = operationAPI.useConfirmMutation();
    const fullNameEmployee = `${employee?.surname} ${employee?.name} ${employee?.patronymic}`
    const onConfirm = () => {
        confirm(opertaion.number as string)
            .unwrap()
            .then(() => message.success('Выполнено'))
            .catch(e => message.error(e.data.message));
    }
    return (                
        <Card title={opertaion.number}>
            <p>Дата: {opertaion.date}</p>
            <p>Тип: {opertaion.type}</p>
            <p>Валюта: {opertaion.currency}</p>
            <p>Сумма: {opertaion.money}</p>
            <p>Операционист: {fullNameEmployee}</p>
            <Popconfirm title='Заверить?' onConfirm={onConfirm}>
                <Button>Заверить</Button>
            </Popconfirm>
        </Card>
    );
}

export default PaymentsItem;