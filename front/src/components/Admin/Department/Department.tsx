import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { departmentAPI } from './../../../service/department';
import { Account } from './../../../models/Account';
import DepartmentTableValue from './DepartmentTableValue';
import { Row, Col, Popconfirm, Button } from 'antd';
import DepartmentEmployee from './DepartmentEmployee';
import { accountAPI } from '../../../service/accountService';

const Department = () => {
    const params = useParams();
    const id = params.id || '';
    const navigate = useNavigate();

    const {data:department,isLoading,error} = departmentAPI.useGetByIdQuery(id);
    const {data:accouns,isLoading: accointIsLoading,error: accountError} = accountAPI.useGetQuery(id);
    const [deleteById] = departmentAPI.useDeleteByIdMutation();
    const account = accouns ?  accouns[0] : {} as Account;
    if(error || accountError){
        return <h1>{error}</h1>
    }
    if(isLoading || accointIsLoading){
        return <h1>Загрузка...</h1>
    }

    const hundleDelete = (id: string) => {
        deleteById(id);
        navigate(-1);
    }

    return (
        <>
            <h1 className='h1 title'>Информация про отдел</h1>
            <Row gutter={20}>
                <Col span={6}>
                    <p>Номер отдела: {department?.number}</p>
                    <p>Город: {department?.city}</p>
                    <p>Номер счёта: {account.number}</p>
                    <DepartmentTableValue  value={account.value}/>
                    <Popconfirm title='Удалить?' onConfirm={() => hundleDelete(id)}>
                        <Button>Удалить</Button>
                    </Popconfirm >
                </Col>
                <Col span={18}>
                    <DepartmentEmployee />
                </Col>
            </Row>
        </>
    );
}

export default Department;