import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { rules } from '../../utils/rules';
import { inputIntAndDot } from '../../utils/input';
import { Encashment } from '../../models/Encashment';
interface EncashmentUpdateFormType{
    encashment: Encashment,
    setEncashment: React.Dispatch<React.SetStateAction<Encashment>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}
const EncashmentUpdateForm:FC<EncashmentUpdateFormType> = ({encashment,setEncashment,setVisible}) => {
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
        console.log(encashment);
        setVisible(false);
    }
    const reset = () => {
        setVisible(false);
    }
    return (
        <Form
            onFinish={submit}
            onReset={reset}
        >
            {encashment.value?.length ? encashment.value.map((val) => {
                return <Form.Item
                    key={val.currency}
                    label={val.currency}
                    name={val.currency}
                    rules={[rules.required()]}
                    initialValue={val.money}
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
                    Обновить
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

export default EncashmentUpdateForm;