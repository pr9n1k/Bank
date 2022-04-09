import { Button, Col, Popconfirm, Row } from 'antd';
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { employeeAPI } from './../../../service/employeeService';
import { departmentAPI } from './../../../service/department';
import EmployeeUpdate from './EmployeeUpdate';
import { updateValueRole } from './../../../utils/updateValueRole';

const Employee = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id || '';
    
    const [visible,setVisible] = useState(false);
    const {data:employee,isLoading,error} = employeeAPI.useGetByIdQuery(id);
    const idDepartment = (employee && employee.idDepartment !=='not') ? employee.idDepartment : ' ';
    const {data:department} = departmentAPI.useGetByIdQuery(idDepartment as string);
    const role = updateValueRole(employee?.role as String);
    const [deleteById] = employeeAPI.useDeleteByIdMutation();
    

    if(error){
        return <h1>{error}</h1>
    }
    if(isLoading ){
        return <h1>Загрузка...</h1>
    }

    const hundlerDelete = () => {
        deleteById(employee?._id as string);
        navigate('/admin/employee');
    }
    return (
        <>
            <h1 className='h1 title'>Сотрудник</h1>
            <Row>
                <Col span={12}>
                    <h2 className='h1 title'>Информация</h2>
                    <p>Фамилия: {employee?.surname}</p>
                    <p>Имя: {employee?.name}</p>
                    <p>Отчество: {employee?.patronymic}</p>
                    <p>Роль: {role}</p> 
                    {employee?.role !== 'ADMIN' && employee?.idDepartment!=='not'
                        ?   
                        <p>Отделение:  
                            <Link 
                                to={`/admin/department/${department?._id}`}
                            >
                                {department?.number}
                            </Link>
                        </p>
                        :
                        null
                    }    
                    <div>
                        {
                            !visible &&
                            <Button
                                style={{marginRight: '15px'}}
                                type='primary'
                                onClick={()=>setVisible(true)}
                            >
                                Редактировать
                            </Button>
                        }
                        <Popconfirm
                            title='Удалить сотрудника?'
                            onConfirm={hundlerDelete}
                        >
                            <a>Уволить</a>
                        </Popconfirm>
                    </div>
                    
                </Col>
                <Col span={12}>
                    {
                        (visible && employee) ?
                        <EmployeeUpdate setVisible={setVisible} thisEmployee={employee}/>
                        :null
                    }
                </Col>
            </Row>
        </>
    );
}

export default Employee;