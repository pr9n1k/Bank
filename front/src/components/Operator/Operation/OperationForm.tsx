import { Form } from 'antd';
import React, { FC } from 'react';
import { Account } from '../../../models/Account';
import { Client } from '../../../models/Client';
interface OperationFormType{
    data: {
        client: Client,
        account: Account
    }
    type: Boolean
}
const OperationForm:FC<OperationFormType> = ({data,type}) => {
    const submit = () => {

    }
    const title = type ? 'Приход' : 'Расход';
    return (
        <>
            <h1>{title}</h1>
            <Form
                onFinish={submit}
            >
                <Form.Item
                    name='name'
                >
                    
                </Form.Item>
            </Form>
        </>
    );
}

export default OperationForm;