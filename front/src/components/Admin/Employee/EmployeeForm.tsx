import { Button, Form, FormInstance, Input, Select } from 'antd';
import React, { FC } from 'react';
import { Employee } from '../../../models/Employee';
import { rules } from '../../../utils/rules';
import { roleAPI } from '../../../service/roleService';
import { inputInt } from './../../../utils/input';
interface CreateEmployeeFormType{
    submit: () => void,
    employee: Employee,
    setEmployee: React.Dispatch<React.SetStateAction<Employee>>
    reset : () => void,
    isLoading: boolean,
    titleButton: string,
}
const EmployeeForm:FC<CreateEmployeeFormType> = ({employee,reset,setEmployee,submit,isLoading,titleButton}) => {
    const {data:roles} = roleAPI.useGetAllQuery(null);
    return (
        <Form
            onFinish={submit}
            onReset={reset}
        >
            <Form.Item
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите имя..'
                    value={employee.name as string}
                    onChange={e => setEmployee({...employee,name:e.target.value})}
                    type='text'
                />
            </Form.Item>
            <Form.Item
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите отчество..'
                    value={employee.patronymic as string}
                    onChange={e => setEmployee({...employee,patronymic:e.target.value})}
                    type='text'
                />
            </Form.Item>
            <Form.Item
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите фамилию..'
                    value={employee.surname as string}
                    onChange={e => setEmployee({...employee,surname:e.target.value})}
                    type='text'
                />
            </Form.Item>
            <Form.Item
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите логин..'
                    value={employee.login as string}
                    onChange={e => setEmployee({...employee,login:e.target.value})}
                    type='text'
                />
            </Form.Item>
            <Form.Item
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите пароль..'
                    value={employee.password as string}
                    onChange={e => setEmployee({...employee,password:e.target.value})}
                    type='password'
                />
            </Form.Item>
            <Form.Item
                rules={[rules.required()]}
            >
                <Input 
                    placeholder='Введите телефон..'
                    value={employee.phone as string}
                    onChange={e => setEmployee({...employee,phone:e.target.value})}
                    type='text'
                    onKeyPress={inputInt}
                    maxLength={10}
                    minLength={10}
                />
            </Form.Item>
            <Form.Item
                rules={[rules.required()]}
            >
                <Select
                    placeholder='Выберите роль'
                    onChange={e => setEmployee({...employee,role:e})}
                    defaultValue={employee.role}
                >
                    {/* {roles?.map(((role,i) => {
                        return <Select.Option
                            key={i}
                            value={role.value}
                        >
                            {role.title}
                        </Select.Option>
                    }
                    ))}  */}
                    <Select.Option
                        key={1}
                        value='ADMIN'
                    >
                        Админ
                    </Select.Option>
                    <Select.Option
                        key={2}
                        value='OPERATOR'
                    >
                        Операционист
                    </Select.Option>
                    <Select.Option
                        key={3}
                        value='CASHIER'
                    >
                        Кассир
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                >{titleButton}</Button>
                <Button
                style={{marginLeft:'15px'}}
                    type='default'
                    htmlType='reset'
                >Отмена</Button>
            </Form.Item>
            
        </Form>
    );
}

export default EmployeeForm;