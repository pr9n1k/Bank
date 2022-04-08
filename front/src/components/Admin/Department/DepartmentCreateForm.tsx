import { Button, Col, Form, Input, Row, message } from 'antd';
import React, { useState } from 'react';
import { Department } from '../../../models/Department';
import { departmentAPI } from '../../../service/department';
import { inputIntAndSlesh } from '../../../utils/input';
import { rules } from '../../../utils/rules';

const DepartmentCreateForm = () => {
    const [department,setDepartment] = useState({} as Department);
    const [add,{isLoading}] = departmentAPI.useAddMutation();
    const [form] = Form.useForm();
    const submit = async () => {
        await add({
            number: department.number as string,
            city: department.city as string,
            typeAccount: '20202'
        })
        .unwrap()
        .then(()=>{
            message.success('Отдел создан');
            form.resetFields();
        })
        .catch((e)=>message.error(e.data.message))
    }
    const reset = () => {
        form.resetFields();
    }
    return (
        <>
            <h1 className='h1 title'>Создание отдела</h1>
            <Row>
                <Col span={12} offset={6}>
                    <Form
                        form={form}
                        onFinish={submit}
                        onReset={reset}
                    >
                        <Form.Item
                            name='number'
                            rules={[rules.required()]}
                        >
                            <Input 
                                minLength={7}
                                maxLength={7}
                                placeholder='Введите номер отдела...'
                                onKeyPress={inputIntAndSlesh}
                                value={department.number as string}
                                onChange={e => setDepartment({...department,number:e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                        <Form.Item
                            name='city'
                            rules={[rules.required()]}
                        >
                            <Input 
                                placeholder='Введите город...'
                                value={department.city as string}
                                onChange={e => setDepartment({...department,city:e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={isLoading}
                            >
                                Создать
                            </Button>
                            <Button
                            style={{marginLeft: '15px'}}
                                type='default'
                                htmlType='reset'
                            >
                                Отмена
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default DepartmentCreateForm;