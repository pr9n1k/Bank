import { Space, Button, Table, Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { employeeAPI } from './../../../service/employeeService';
import { Employee } from './../../../models/Employee';
import { updateValueRole } from '../../../utils/updateValueRole';

const DepartmentTableEmployee = () => {
    const params = useParams();
    const depId = params.id || '';

    const [visible,setVisible] = useState(false);
    const {data:employee,isLoading:isLoadDep} = employeeAPI.useGetByDepartmentQuery(depId)
    const {data:employeeNotDep,isLoading:isLoadNotDep} = employeeAPI.useGetByDepartmentQuery('not')

    const [update,{isLoading}] = employeeAPI.useUpdateMutation();
    const columns = [
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname'
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Отчество',
            dataIndex: 'patronymic',
            key: 'patronymic'
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role'
        },
        {
          title: 'Действие',
        //   dataIndex: 'idDepartment',
          key: 'action',
          render: (record: Employee) => (
              record.idDepartment === 'not'
              ?
                <Popconfirm title='Добавить?' onConfirm={() => hundlerAdd(record.id)}>
                    <a>Добавить</a>
                </Popconfirm >
              :
                <Popconfirm title='Убрать?' onConfirm={() => hundleDelete(record.id)}>
                    <a>Убрать</a>
                </Popconfirm >
          ),
        }
    ]
    const hundlerAdd = (id:String) => {
        employeeNotDep && employeeNotDep.map(item => {
            if(item._id === id){
                update({...item, idDepartment:depId})
            }
        })
    }
    const hundleDelete = (id: String) => {
        employee && employee.map(item => {
            if(item._id === id){
                update({...item,idDepartment:"not"})
                
            }
        })
    }
    const dataTable: any[] = [];
    let index = 0;
    if(!isLoadDep && !isLoadNotDep){
        employee && employee.forEach((item,i) => {
            const role = updateValueRole(item.role);
            dataTable.push({
                key: i,
                id: item._id,
                surname: item.surname,
                name: item.name,
                patronymic: item.patronymic,
                role: role,
                phone: item.phone,
                idDepartment: item.idDepartment
            })
            index++;
        })    
        employeeNotDep && employeeNotDep.forEach((item,i) => {
            const role = updateValueRole(item.role);
            i+=index;
            if(item.role !== 'ADMIN' && visible){
                dataTable.push({
                    key: i,
                    id: item._id,
                    surname: item.surname,
                    name: item.name,
                    patronymic: item.patronymic,
                    role: role,
                    phone: item.phone,
                    idDepartment: item.idDepartment
                })
            }
        })
    }
    
    
    return (
        <>
            <Table  columns={columns} dataSource={dataTable} pagination={false}/>
            <Button
            style={{marginTop:'20px'}}
                onClick={()=>{setVisible(!visible)}}
            >
                {visible? 'Скрыть' : 'Показать'} резерв
            </Button>
        </>
    );
}

export default DepartmentTableEmployee;