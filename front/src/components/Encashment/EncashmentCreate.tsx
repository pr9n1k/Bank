import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Encashment } from '../../models/Encashment';
import { departmentAPI } from '../../service/department';
import { nowDate } from '../../utils/date';
import EncashmentCreateForm from './EncashmentCreateForm';


const EncashmentCreate = () => {
    const date = nowDate(new Date());
    const [encashment,setEncashment] = useState({} as Encashment);
    const id = localStorage.getItem('user') || '';
    const {data:department,isLoading,error,isSuccess} = departmentAPI.useGetByEmployeeQuery(id);
    if(isSuccess && !encashment.idDepartment){
        setEncashment({
            ...encashment,
            date,
            idDepartment: department?._id as string,
            idOperator: id,
        })
    }
    if(isLoading){
        return <h1>Загрузка...</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    return (
        <>
            <h1 className='h1 title'>Инкассация</h1>
            <Row>
                <Col span={8} offset={8}>
                    <EncashmentCreateForm encashment={encashment} setEncashment={setEncashment}/>
                </Col>
            </Row>
        </>
    );
}

export default EncashmentCreate;