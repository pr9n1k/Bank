import React, { FC, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { Legal } from '../../../models/Legal';
import { rules } from '../../../utils/rules';
import {inputInt} from '../../../utils/input';
import { useParams, useNavigate } from 'react-router-dom';
import { legalAPI } from '../../../service/legalService';
interface CreateLegalFormType{
    isCommunal: boolean
}
const CreateLegalForm:FC<CreateLegalFormType> = ({isCommunal}) => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id || '';
    const [legal,setLegal] = useState({} as Legal);
    const [add,{isLoading}] = legalAPI.useAddMutation();
    const submit = async () => {  
        await add({
            idClient: id,
            title: legal.title as string,
            inn: legal.inn as string,
            typeAccount: '40602',
            communalType: legal.communalType as string
        })
            .unwrap()
            .then(() => {
                message.success('Готово')
                navigate(-1);
            })
            .catch(e => message.error(e.data.message))
    }
    const reset = () => {
        navigate(-1);
    }
    return (
        <>
            <Form
                onFinish={submit}
                onReset={reset}
            >
                <Form.Item
                    name='title'
                    rules={[rules.required()]}
                >
                    <Input 
                        placeholder='Введите название организации...'
                        value={legal.title as string}
                        onChange={e => setLegal({...legal,title:e.target.value})}
                        type='text'
                    />
                </Form.Item>
                <Form.Item
                    name='number'
                    rules={[rules.required()]}
                >
                    <Input 
                        minLength={8}
                        maxLength={8}
                        placeholder='Введите инн...'
                        onKeyPress={inputInt}
                        value={legal.inn as string}
                        onChange={e => setLegal({...legal,inn:e.target.value})}
                        type='text'
                    />
                </Form.Item>
                {isCommunal &&
                <Form.Item>
                    <Select
                        placeholder="Выберите тип"
                        onChange={e => setLegal({...legal,communalType: e})}
                        defaultValue={legal.communalType}
                    >
                        <Select.Option
                            key={1}
                            value='Свет'   
                        >
                            Свет
                        </Select.Option>
                        <Select.Option
                            key={2}
                            value='Вода'
                        >
                            Вода
                        </Select.Option>
                        <Select.Option
                            key={3}
                            value='Газ'
                        >
                            Газ
                        </Select.Option>
                    </Select>
                </Form.Item>
                }
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={isLoading}
                    >
                        Создать
                    </Button>
                    <Button
                        type='default'
                        htmlType='reset'
                        style={{marginLeft: '15px'}}
                    >
                        Отмена
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateLegalForm;