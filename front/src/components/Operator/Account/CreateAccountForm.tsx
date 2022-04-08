import { Button, Form, Select } from 'antd';
import React, { useState } from 'react';
import { rules } from '../../../utils/rules';
import { Account } from '../../../models/Account';
import { useNavigate, useParams } from 'react-router-dom';
import { accountAPI } from './../../../service/accountService';

const CreateAccountForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id || '';
    const [account, setAccount] = useState({} as Account);
    const [create, {isLoading,error}] = accountAPI.useAddMutation();
    const submit = () => {
        create({
            id,
            value: account.value,
            typeAccount: '40817'
        });
        navigate(-1);
    }
    const reset = () => {
        navigate(-1);
    }
    if(error){
        alert(error)
    }
    return (
        <Form
            onFinish={submit}
            onReset={reset}
        >
            <Form.Item
                rules={[rules.required()]}
                name='currency'
            >
                <Select
                    placeholder='Выберите валюту'
                    onChange={e => setAccount({...account,value:[{currency:e,money:'0'}]})}
                >
                    <Select.Option value='RUB'>RUB</Select.Option>
                    <Select.Option value='USD'>USD</Select.Option>
                    <Select.Option value='UAH'>UAH</Select.Option>
                    <Select.Option value='EUR'>EUR</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                >Создать</Button>
                <Button
                    type='default'
                    htmlType='reset'
                    style={{marginLeft: '15px'}}
                >Отмена</Button>
            </Form.Item>
        </Form>
    );
}

export default CreateAccountForm;