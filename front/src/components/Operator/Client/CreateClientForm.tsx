import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import React, { FC } from 'react';
import { useState } from 'react';
import { Client } from '../../../models/Client';
import { rules } from '../../../utils/rules';
import { clientAPI } from '../../../service/clientService';
import { inputInt, inputIntAndDot } from './../../../utils/input';
interface CreateClientFormType {
}
const CreateClientForm:FC<CreateClientFormType> = () => {
    const [form] = Form.useForm();
    const [add,{isLoading}] = clientAPI.useAddMutation();
    const [client,setClient] = useState({} as Client)
    
    const submit = async() => {
        await add(client)
        .unwrap()
        .then(() =>{
            form.resetFields();
            message.success('Клиент создан!')
        })
        .catch(error => message.error(error.data.message))
    }
    return (
        <Form
            onFinish={submit}
            layout="vertical"
            form={form}
        >
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name='name'
                        rules={[rules.required()]}
                        label='Личная информация'
                    >
                        <Input 
                            placeholder='Введите имя..'
                            value={client.name as string}
                            onChange={e => setClient({...client,name:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='patronymic'
                    >
                        <Input 
                            placeholder='Введите отчество..'
                            value={client.patronymic as string}
                            onChange={e => setClient({...client,patronymic:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='surname'
                    >
                        <Input 
                            placeholder='Введите фамилию..'
                            value={client.surname as string}
                            onChange={e => setClient({...client,surname:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='sex'
                    >
                        <Select
                            placeholder='Выберите пол'
                            onChange={e => setClient({...client,sex:e})}
                        >
                            <Select.Option value='М'>М</Select.Option>
                            <Select.Option value='Ж'>Ж</Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='phone'
                    >
                        <Input 
                            placeholder='Введите номер телефона..'
                            value={client.phone as string}
                            onChange={e => setClient({...client,phone:e.target.value})}
                            onKeyPress={inputInt}
                            minLength={10}
                            maxLength={10}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='birthday'
                    >
                        <Input 
                            placeholder='Введите дату рождения..'
                            value={client.birthDay as string}
                            onChange={e => setClient({...client,birthDay:e.target.value})}
                            onKeyPress={inputIntAndDot}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='inn'
                    >
                        <Input 
                            placeholder='Введите инн..'
                            value={client.inn as string}
                            onChange={e => setClient({...client,inn:e.target.value})}
                            onKeyPress={inputInt}
                            minLength={10}
                            maxLength={10}
                            type='string'
                        />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        rules={[rules.required()]}
                        label='Адрес'
                        name='city'
                    >
                        <Input 
                            placeholder='Введите город..'
                            value={client.city as string}
                            onChange={e => setClient({...client,city:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='street'
                    >
                        <Input 
                            placeholder='Введите улицу..'
                            value={client.street as string}
                            onChange={e => setClient({...client,street:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='house'
                    >
                        <Input 
                            placeholder='Введите дом..'
                            value={client.house as string}
                            onChange={e => setClient({...client,house:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        name='flat'
                    >
                        <Input 
                            placeholder='Введите кв..'
                            value={client.flat as string}
                            onChange={e => setClient({...client,flat:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        label='Данные паспорта'
                        name='series'
                    >
                        <Input 
                            placeholder='Введите серию паспорта..'
                            value={client.series as string}
                            onChange={e => setClient({...client,series:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='number'
                    >
                        <Input 
                            placeholder='Введите номер паспорта..'
                            value={client.number as string}
                            onChange={e => setClient({...client,number:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='issued'
                    >
                        <Input 
                            placeholder='Кем выдан..'
                            value={client.issued as string}
                            onChange={e => setClient({...client,issued:e.target.value})}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[rules.required()]}
                        name='issuedDate'
                    >
                        <Input 
                            placeholder='Дата выдачи..'
                            value={client.issuedDate as string}
                            onChange={e => setClient({...client,issuedDate:e.target.value})}
                            onKeyPress={inputIntAndDot}
                            type='text'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                >Создать</Button>
            </Form.Item>
        </Form>
    );
}

export default CreateClientForm;