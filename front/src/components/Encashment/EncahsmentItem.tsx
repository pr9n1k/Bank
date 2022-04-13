import { Card } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Encashment } from '../../models/Encashment';
import { departmentAPI } from '../../service/department';
interface EncahsmentItemType{
    encashment: Encashment
}
const EncahsmentItem:FC<EncahsmentItemType> = ({encashment}) => {
    const {data:department} = departmentAPI.useGetByIdQuery(encashment.idDepartment);
    return (
        <Card title={encashment.type}>
            <p>Отдел №{department?.number}</p>
            <p>Город: {department?.city}</p>
            <p>Дата заявки: {encashment.date}</p>
            <Link to={`/admin/encashment/${encashment._id}`}>Открыть</Link>
        </Card>
    );
}

export default EncahsmentItem;