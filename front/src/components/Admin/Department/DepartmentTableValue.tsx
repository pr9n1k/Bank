import { Table } from 'antd';
import React, { FC } from 'react';
interface DepartmentTableValueType{
    value: [{
        currency: string;
        money: string;
    }]
}
const DepartmentTableValue:FC<DepartmentTableValueType> = ({value}) => {    
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
    value.forEach((item,i) => {
        data.push({
            key: i,
            currency: item.currency,
            money: item.money
        })
    });
    return (                
        <Table columns={columns} dataSource={data} pagination={false}/>
    );
}

export default DepartmentTableValue;