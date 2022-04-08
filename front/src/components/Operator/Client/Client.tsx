import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useTakeAccountByLegalId } from '../../../hooks/useTakeAccountByLegal';
import { Account } from '../../../models/Account';
import { accountAPI } from '../../../service/accountService';
import { clientAPI } from '../../../service/clientService';
import AccountTable from '../Account/AccountTable';

const Client = () => {
    const params = useParams();
    const id = params.id || '';
    
    const {data:client,error,isLoading} = clientAPI.useGetByIdQuery(id);
    const {data:accounts,error:accountError, isLoading:accointIsLoading} = accountAPI.useGetQuery(id,{
        pollingInterval: 1000
    });
    const allAccount: Account[] = [];
    const accountsByLegal = useTakeAccountByLegalId(id);
    if(accountsByLegal.length){
        accountsByLegal.forEach(acc => {
            allAccount.push(acc);
        })
    }
    if(accounts?.length){
        accounts.forEach(acc =>{
            allAccount.push(acc);
        })
    }
    
    
    if(isLoading || accointIsLoading){
        return <h1>Загрузка...</h1>
    }
    if(error || accountError){
        return <h1>{error || accountError}</h1>
    }
    let table;
    if(allAccount?.length){
        table = <AccountTable accounts={allAccount}/>
    }
    const flat = client?.flat ? `, кв.${client?.flat}`: '';
    return (
        <>
            <div>
                <h1>{client?.surname} {client?.name} {client?.patronymic}</h1>
                <div style={{display: 'flex',justifyContent:'space-between'}}>
                   <div>
                        <p>ИНН: {client?.inn}</p>
                        <p>Паспорт: {client?.series} {client?.number}</p>
                        <p>Выдан: {client?.issuedDate}</p>
                        <p>Адрес: г.{client?.city}, ул.{client?.street}, д.{client?.house} {flat}</p>
                   </div>
                   <div>
                        {table}
                   </div>
                </div>
                <Link to={'create-account'}>Завести счет</Link>
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    );
}

export default Client;