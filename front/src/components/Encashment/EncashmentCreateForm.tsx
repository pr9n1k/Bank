import { Button, Form, Input, message, Select } from 'antd';
import React, { FC } from 'react';
import { Encashment } from '../../models/Encashment';
import { inputIntAndDot } from '../../utils/input';
import { rules } from '../../utils/rules';
import { operationAPI } from './../../service/operationServise';
interface EncashmentCreateFormType{
    encashment: Encashment,
    setEncashment: React.Dispatch<React.SetStateAction<Encashment>>
}

const EncashmentCreateForm:FC<EncashmentCreateFormType> = ({encashment,setEncashment}) => {
    const [form] = Form.useForm();
    const [add] = operationAPI.useAddEncashmentMutation();
    const handleChange = (e:string[]) => {
        const arrayValue: {
            currency: string,
            money: string
        }[] = []
        e.map(item => {
            arrayValue.push({
                currency: item,
                money: '0'
            })
        })
        setEncashment({...encashment,value:arrayValue});
    }
    const onChange = (e:any, currency: string) => {
        const newArrayValue: {
            currency: string,
            money: string
        }[] = []
        encashment.value.map(val => {
            if(val.currency === currency){
                newArrayValue.push({
                    currency: val.currency,
                    money: e.target.value
                })
            }else{
                newArrayValue.push(val)
            }
        })
        setEncashment({...encashment,value: newArrayValue})
    }
    const submit = () => {
        add(encashment)
            .unwrap()
            .then(()=> {
                message.success('Выполенно!')
                form.resetFields();
                setEncashment({
                    ...encashment,
                    value:[]
                })
            })
            .catch(e => message.error(e.data.message))
    }
    const reset = () => {
        form.resetFields();
        setEncashment({
            ...encashment,
            value:[]
        })
    }
    return (
        <Form
            onFinish={submit}
            onReset={reset}
            form={form}
        >
            <Form.Item
                name='type'
                rules={[rules.required()]}
            >
                <Select
                    placeholder='Выберите тип'
                    onChange={e => setEncashment({...encashment,type:e})}
                >
                    <Select.Option
                        value='инкассация'
                    >
                        инкассация
                    </Select.Option>
                    <Select.Option
                        value='подкрепление'
                    >
                        подкрепление
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='valueArray'
                rules={[rules.required()]}
            >
                <Select
                    mode="multiple"
                    placeholder="Выберите валюту"
                    onChange={handleChange}
                    >
                        <Select.Option
                            value='RUB'
                        >
                            RUB
                        </Select.Option>
                        <Select.Option
                            value='UAH'
                        >
                            UAH
                        </Select.Option>
                        <Select.Option
                            value='USD'
                        >
                            USD
                        </Select.Option>
                        <Select.Option
                            value='EUR'
                        >
                            EUR
                        </Select.Option>
                </Select>
            </Form.Item>
            {encashment.value?.length ? encashment.value.map((val) => {
                return <Form.Item
                    key={val.currency}
                    label={val.currency}
                    name={val.currency}
                    rules={[rules.required()]}
                >
                    <Input 
                        placeholder='__.__'
                        value={val.money}
                        onChange={e => onChange(e,val.currency)}
                        onKeyPress={inputIntAndDot}
                        pattern="\d+.\d{2}"
                    />
                </Form.Item>
            })
            : null
            }
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Создать
                </Button>
                <Button
                    type='default'
                    htmlType='reset'
                >
                    Отмена
                </Button>
            </Form.Item>
        </Form>
    );
}

export default EncashmentCreateForm;