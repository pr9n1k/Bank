import { Button, Col, List, Row } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Encashment as IEncashment } from '../../models/Encashment';
import { departmentAPI } from '../../service/department';
import { operationAPI } from '../../service/operationServise';
import EncashmentUpdateForm from './EncashmentUpdateForm';

const Encashment = () => {
    const params = useParams();
    const id = params.id || '';
    const [visible,setVisible] = useState(false);
    const [encashment, setEncashment] = useState({} as IEncashment);
    const {data,isLoading,error,isSuccess} = operationAPI.useGetByIdEncashmentQuery(id);
    const {data:department,isLoading:isLoadingDepartment} = departmentAPI.useGetByIdQuery(data?.idDepartment || '');
    if(isSuccess && !encashment.idDepartment){
        data && setEncashment(data);
    }
    if(isLoading){
        return <h1>Загрузка...</h1>
    }
    return (
        <>
            <h1 className='h1 title'>Инкассация</h1>
            <Row>
                <Col span={8}>
                    <p>Отдел №{department?.number}</p>
                    <p>Город {department?.city}</p>
                    <p>Тип: {data?.type}</p>
                    <List
                        header={<div>Сумма</div>}
                        bordered
                        dataSource={encashment?.value}
                        renderItem={item => (
                            <List.Item>
                                {item.currency}: {item.money}
                            </List.Item>
                        )}
                    />
                    <Button
                        type='primary'
                        style={{margin:'20px 20px 0 0'}}
                    >
                        Подвтердить
                    </Button>
                    <Button
                        type='default'
                        onClick={_=>setVisible(true)}
                    >
                        Редактировать
                    </Button>
                </Col>
                {visible &&
                    <Col span={8} offset={4}>
                        <EncashmentUpdateForm encashment={encashment} setEncashment={setEncashment} setVisible={setVisible}/>
                    </Col>
                }
            </Row>
        </>
    );
}

export default Encashment;