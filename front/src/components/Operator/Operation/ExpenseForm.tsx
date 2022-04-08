import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { inputIntAndDot } from '../../../utils/input';
import { rules } from '../../../utils/rules';
import { Operation } from '../../../models/Operation';
interface ExpenseFormType{
    operation: Operation
    setOperation: React.Dispatch<React.SetStateAction<Operation>>,
    submit: () => void,
    reset: () => void,
}
const ExpenseForm:FC<ExpenseFormType> = ({setOperation,submit,operation,reset}) => {
    return (
        <Form
            onFinish={submit}
            onReset={reset}
            layout="vertical"
        >
            <Form.Item
                label='Валюта'
            >
                <Input 
                    placeholder={operation.currency as string}
                    value={operation.currency as string}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item
                label='Сумма'
                name='money'
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='__.__'
                    value={operation.money as string}
                    onChange={e => setOperation({...operation,money: e.target.value})}
                    type='text'
                    onKeyPress={inputIntAndDot}
                    pattern="\d+.\d{2}"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                >Создать</Button>
                <Button
                style={{marginLeft:'15px'}}
                    type='default'
                    htmlType='reset'
                >Отмена</Button>
            </Form.Item>
        </Form>
    );
}

export default ExpenseForm;