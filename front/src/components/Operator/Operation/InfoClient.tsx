import { Button } from 'antd';
import React, { FC } from 'react';
import { Client } from '../../../models/Client';
interface InfoClientType{
    client: Client,
    cb: (fullName: string, inn: string, pasport: string) => void,
    money: string
}
const InfoClient:FC<InfoClientType> = ({client,cb,money}) => {
    const fullName = `${client.surname} ${client.name} ${client.patronymic}`
    const pasport = `${client.series}${client.number}`;
    const onClick = () => {
        cb(fullName,client.inn as string,pasport)
    }
    const adress = client.flat
        ? `г.${client.city}, ул.${client.street}, д.${client.house}, кв.${client.flat}`
        : `г.${client.city}, ул.${client.street}, д.${client.house}`
    return (
        <>
            <p>ФИО: {client.name} {client.patronymic} {client.surname}</p>
            <p>Паспорт: {pasport}</p>
            <p>ИНН: {client.inn}</p>
            <p>Адрес: {adress}</p>
            <p>Сумма: {money}</p>
            <Button
                type='default'
                onClick={onClick}
            >
                Ок
            </Button>
        </>
    );
}

export default InfoClient;