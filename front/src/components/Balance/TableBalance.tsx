import { Table } from 'antd';
import React, { FC } from 'react';
import { Account } from './../../models/Account';
interface TableBalanceType{
    account: Account
}
const TableBalance:FC<TableBalanceType> = ({account}) => {
    const columns = [
        {
            title: 'Валюта',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Сумма',
            dataIndex: 'money',
            key: 'money',
        }
    ] 
    const data: any[] = [];
    account.value.forEach((acc,i) => 
        data.push({
            key:i,
            currency: acc.currency,
            money: acc.money
        })
    )
    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false}
        />
    );
}

export default TableBalance;