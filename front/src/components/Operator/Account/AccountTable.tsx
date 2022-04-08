import { Table } from 'antd';
import React, { FC } from 'react';
import { Account } from '../../../models/Account';
interface AccountTableType{
    accounts: Account[]
}
const AccountTable:FC<AccountTableType> = ({accounts}) => {
    const columns = [
        {
            title: '№ счета',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Текущая сумма',
            dataIndex: 'money',
            key: 'money',
        }
    ]
    const data: any[] = [];
    accounts.forEach((acc,i) => 
        data.push({
            key:i,
            number: acc.number,
            currency: acc.value[0].currency,
            money: acc.value[0].money
        })
    )
    return (
        <Table columns={columns} dataSource={data} pagination={false}/>
    );
}

export default AccountTable;