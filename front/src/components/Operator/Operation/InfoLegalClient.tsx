import React, { FC } from 'react';
import { Client } from '../../../models/Client';
import { Legal } from '../../../models/Legal';
import { Operation } from '../../../models/Operation';
import { clientAPI } from './../../../service/clientService';
import InfoClient from './InfoClient';
interface InfoLegalClientType{
    legal: Legal,
    cb: (fullName: string, inn: string, pasport: string) => void,
    money: string
}
const InfoLegalClient:FC<InfoLegalClientType> = ({legal,cb,money}) => {
    const {data: client,isLoading} = clientAPI.useGetByIdQuery(legal.idClient as string);
    if(isLoading){
        return <h2>Загрузка...</h2>
    }
    return (
        <>
            <p>Название предприятия: {legal.title}</p>
            <p>ИНН предприятия: {legal.inn}</p>
            <InfoClient client={client || {} as Client} cb={cb} money={money}/>
        </>
    );
}

export default InfoLegalClient;