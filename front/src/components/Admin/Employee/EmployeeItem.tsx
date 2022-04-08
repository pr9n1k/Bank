import { Card } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../../../models/Employee';
import { updateValueRole } from './../../../utils/updateValueRole';
interface EmployeeItemType{
    employee: Employee
}
const EmployeeItem:FC<EmployeeItemType> = ({employee}) => {
    const role = updateValueRole(employee?.role as String);
    return (
        <Card title={`${employee.surname} ${employee.name} ${employee.patronymic}`}>
            <h2>Информация:</h2>
            <p>Телефон: {employee.phone}</p>
            <p>Роль: {role}</p>
            <Link to={`${employee?._id}`}>Открыть</Link>
        </Card>
    );
}

export default EmployeeItem;