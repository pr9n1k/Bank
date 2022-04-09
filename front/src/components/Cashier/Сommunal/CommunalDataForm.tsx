import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC, useState } from 'react';
import { rules } from '../../../utils/rules';
import { inputInt, inputIntAndDot } from '../../../utils/input';
import { Communal } from '../../../models/Communal';
import { legalAPI } from './../../../service/legalService';
interface CommunalDataFormType{
    communal: Communal,
    setCommunal: React.Dispatch<React.SetStateAction<Communal>>
    submit: React.Dispatch<React.SetStateAction<void>>
}
const CommunalDataForm:FC<CommunalDataFormType> = ({communal,setCommunal,submit}) => {
    const {data:communalAccount,isLoading} = legalAPI.useGetCommunalQuery();
    const [gas,setGas] = useState({title:'Газ',accountCommunal:'',startDate:'',endDate:'',startCounter:'',endCounter:'',money:''})
    const [light,setLight] = useState({title:'Свет',accountCommunal:'',startDate:'',endDate:'',startCounter:'',endCounter:'',money:''});
    const [water, setWater] = useState({title:'Вода',accountCommunal:'',startDate:'',endDate:'',startCounter:'',endCounter:'',money:''});
    const onSubmit = () => {
        const arrayCommunal = [];
        if(gas.money.length){
            arrayCommunal.push(gas);
        }
        if(light.money.length){
            arrayCommunal.push(light);
        }
        if(water.money.length){
            arrayCommunal.push(water);
        }
        setCommunal({
            ...communal,
            communals: arrayCommunal
        })        
        submit();
    }
    if(isLoading){
        return <h1>Загрузка..</h1>
    }
    if(communalAccount && !communalAccount.length){
        return <h1 style={{color:'red'}} className='h1 title'>Создайте комунальные предприятия!</h1>
    }
    console.log(communalAccount);
    
    return (
        <>
            <Form
                onFinish={onSubmit}
            >
                <h2 className='h1 title'>Личные данные</h2>
                <Row>
                    <Col span={2}>ФИО</Col>
                    <Col span={15}>
                        <Form.Item
                            rules={[rules.required()]}
                            name='fullName'
                        >
                            <Input
                                placeholder='Введите ФИО'
                                value={communal.fullName}
                                onChange={e => setCommunal({...communal, fullName: e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>Адрес</Col>
                    <Col span={3}>
                        <Form.Item
                            rules={[rules.required()]}
                            name='city'
                        >
                            <Input
                                placeholder='Введите город'
                                value={communal.city}
                                onChange={e => setCommunal({...communal, city: e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item
                            rules={[rules.required()]}
                            name='street'
                        >
                            <Input
                                placeholder='Введите улица'
                                value={communal.street}
                                onChange={e => setCommunal({...communal, street: e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item
                            rules={[rules.required()]}
                            name='house'
                        >
                            <Input
                                placeholder='Введите дом'
                                value={communal.house}
                                onChange={e => setCommunal({...communal, house: e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item
                            name='flat'
                        >
                            <Input
                                placeholder='Введите кв'
                                value={communal.flat}
                                onChange={e => setCommunal({...communal, flat: e.target.value})}
                                type='text'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <h2 className="h1 title">Коммунальные услуги</h2>
                <Row>
                    <Col className="gutter-row" span={2} style={{textAlign:'center'}}>Услуга</Col>
                    <Col className='gutter-row' span={6}>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>Период оплаты</Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{textAlign:'center'}}>нач</Col>
                            <Col span={12} style={{textAlign:'center'}}>кон</Col>
                        </Row>
                    </Col>
                    <Col className='gutter-row' span={6}>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>Показания счетчика</Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{textAlign:'center'}}>кон</Col>
                            <Col span={12} style={{textAlign:'center'}}>нач</Col>
                        </Row>
                    </Col>
                    <Col className='gutter-row' span={3} style={{textAlign:'center'}}>Сумма</Col>
                </Row>
                {communalAccount?.filter(item => item.communalType === 'Свет').length ?
                    <Row>
                        <Col className="gutter-row" span={2}>Свет</Col>
                        <Col className='gutter-row' span={6}>
                            <Row>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={light.startDate}
                                        onChange={e=>setLight({...light,startDate: e.target.value})}
                                        onKeyPress={inputIntAndDot}
                                        pattern="\d{1,2}.\d{2}.\d{4}"
                                    />
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={light.endDate}
                                        onChange={e=>setLight({...light,endDate: e.target.value})}
                                        onKeyPress={inputIntAndDot}
                                        pattern="\d{1,2}.\d{2}.\d{4}"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' span={6}>
                            <Row>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={light.endCounter}
                                        onChange={e=>setLight({...light,endCounter: e.target.value})}
                                        onKeyPress={inputInt}
                                    />
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={light.startCounter}
                                        onChange={e=>setLight({...light,startCounter: e.target.value})}
                                        onKeyPress={inputInt}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' span={3}>
                            <Input 
                                placeholder='__.__'
                                value={light.money}
                                onChange={e => setLight({...light, money: e.target.value})}
                                onKeyPress={inputIntAndDot}
                                pattern="\d+.\d{2}"
                            />
                        </Col>
                    </Row>
                    : null
                }
                {communalAccount?.filter(item => item.communalType === 'Газ').length ? 
                    <Row>
                        <Col className="gutter-row" span={2}>Газ</Col>
                        <Col className='gutter-row' span={6}>
                            <Row>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={gas.startDate}
                                        onChange={e=>setGas({...gas,startDate: e.target.value})}
                                        onKeyPress={inputIntAndDot}
                                        pattern="\d{1,2}.\d{2}.\d{4}"
                                    />
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={gas.endDate}
                                        onChange={e=>setGas({...gas,endDate: e.target.value})}
                                        onKeyPress={inputIntAndDot}
                                        pattern="\d{1,2}.\d{2}.\d{4}"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' span={6}>
                            <Row>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={gas.endCounter}
                                        onChange={e=>setGas({...gas,endCounter: e.target.value})}
                                        onKeyPress={inputInt}
                                    />
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={gas.startCounter}
                                        onChange={e=>setGas({...gas,startCounter: e.target.value})}
                                        onKeyPress={inputInt}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' span={3}>
                            <Input 
                                placeholder='__.__'
                                value={gas.money}
                                onChange={e => setGas({...gas, money: e.target.value})}
                                onKeyPress={inputIntAndDot}
                                pattern="\d+.\d{2}"
                            />
                        </Col>
                    </Row>
                    : null
                }
                {communalAccount?.filter(item => item.communalType === 'Вода').length ? 
                    <Row>
                        <Col className="gutter-row" span={2}>Вода</Col>
                        <Col className='gutter-row' span={6}>
                            <Row>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={water.startDate}
                                        onChange={e=>setWater({...water,startDate: e.target.value})}
                                        onKeyPress={inputIntAndDot}
                                        pattern="\d{1,2}.\d{2}.\d{4}"
                                    />
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={water.endDate}
                                        onChange={e=>setWater({...water,endDate: e.target.value})}
                                        onKeyPress={inputIntAndDot}
                                        pattern="\d{1,2}.\d{2}.\d{4}"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' span={6}>
                            <Row>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={water.endCounter}
                                        onChange={e=>setWater({...water,endCounter: e.target.value})}
                                        onKeyPress={inputInt}
                                    />
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <Input
                                        value={water.startCounter}
                                        onChange={e=>setWater({...water,startCounter: e.target.value})}
                                        onKeyPress={inputInt}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row' span={3}>
                            <Input 
                                placeholder='__.__'
                                value={water.money}
                                onChange={e => setWater({...water, money: e.target.value})}
                                onKeyPress={inputIntAndDot}
                                pattern="\d+.\d{2}"
                            />
                        </Col>
                    </Row>
                    : null
                }
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                            >
                                Готово
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default CommunalDataForm;