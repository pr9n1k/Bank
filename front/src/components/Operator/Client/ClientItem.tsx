import { Card } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../../../models/Client';
interface ClientItemType{
    client: Client
}
const ClientItem:FC<ClientItemType> = ({client}) => {
    return (
        <Card title={`${client.surname} ${client.name} ${client.patronymic}`}>
            <h2>Информация:</h2>
            <p>Дата рождения: {client.birthDay}</p>
            <p>Телефон: {client.phone}</p>
            <p>ИНН: {client.inn}</p>
            <Link to={`${client?._id}`}>Открыть</Link>
        </Card>
    );
}

export default ClientItem;