import React, { FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Operation } from './../../../models/Operation';
import { rules } from '../../../utils/rules';
import { inputIntAndDot } from '../../../utils/input';
import { inputInt } from './../../../utils/input';
import { operationAPI } from '../../../service/operationServise';
interface ArrivlFormType{
    operation: Operation,
    setOperation: React.Dispatch<React.SetStateAction<Operation>>
}

const ArrivalForm:FC<ArrivlFormType> = ({operation,setOperation}) => {
    const [addOperation] = operationAPI.useAddMutation();
    const [form] = Form.useForm();
    const submit = () => {
        addOperation(operation)
            .unwrap()
            .then(() => {
                message.success('Операция создана');
                form.resetFields();
            })
            .catch(e => message.error(e.data.message))
    }
    return (
        <Form
            onFinish={submit}
            form={form}
        >
            <Form.Item
                name='fullName'
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите ФИО..'
                    value={operation.fullName as string}
                    onChange={e => setOperation({...operation,fullName:e.target.value})}
                    type='text'
                />
            </Form.Item>
            <Form.Item
                name='inn'
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите ИНН..'
                    value={operation.inn as string}
                    onChange={e => setOperation({...operation,inn:e.target.value})}
                    type='text'
                    onKeyPress={inputInt}
                    maxLength={10}
                    minLength={10}
                />
            </Form.Item>
            <Form.Item
                name='pasport'
            >
                <Input 
                    placeholder='Введите паспорт..'
                    value={operation.pasport as string}
                    onChange={e => setOperation({...operation,pasport:e.target.value})}
                    type='text'
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    placeholder={operation.currency as string}
                    value={operation.currency as string}
                    disabled={true}
                />
            </Form.Item>
            <Form.Item
                name='money'
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите сумму..'
                    value={operation.money as string}
                    onChange={e => setOperation({...operation,money:e.target.value})}
                    type='text'
                    onKeyPress={inputIntAndDot}
                    pattern="\d+.\d{2}"
                />
            </Form.Item>
            <Form.Item
                name='purpose'
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите назначение платежа..'
                    value={operation.purpose as string}
                    onChange={e => setOperation({...operation,purpose:e.target.value})}
                    type='text'
                />
            </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        Ок
                    </Button>
                </Form.Item>
        </Form>
    );
}

export default ArrivalForm;