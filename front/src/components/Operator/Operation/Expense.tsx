import React, { FC, useEffect, useState } from 'react';
import { Account } from '../../../models/Account';
import { clientAPI } from './../../../service/clientService';
import { useAccount } from './../../../hooks/useAccount';
import InfoClient from './InfoClient';
import InfoLegalClient from './InfoLegalClient';
import ExpenseForm from './ExpenseForm';
import { Operation } from './../../../models/Operation';
import { nowDate } from './../../../utils/date';
import { message } from 'antd';
import { operationAPI } from '../../../service/operationServise';
import { legalAPI } from '../../../service/legalService';
interface ExpenseType{
    account: Account
}
const Expense:FC<ExpenseType> = ({account}) => {
    const date = nowDate(new Date());
    const {data:client} = clientAPI.useGetByIdQuery(account.idObject);
    const {data:legal} = legalAPI.useGetByIdQuery(account.idObject);
    const [addOperation] = operationAPI.useAddMutation();
    const [visible,setVisible] = useState(false);
    const [operation,setOperation] = useState({} as Operation);
    const idEmployee = localStorage.getItem('user') || '';
    const departmentAccount = useAccount(idEmployee);
    useEffect(()=>{
        setOperation({
            ...operation,
            idEmployee:idEmployee,
            numberAccount: account.number,
            type: 'расход',
            date: date,
            currency: account.value[0].currency,
            purpose: 'Снятие наличных средств'
        })
    },[])
    const reset = () => {
        setVisible(false);
    }
    const submit = () => {
        addOperation(operation).
            unwrap()
            .then(() => {
                setVisible(false);
                message.success('Операция создана')
            })
            .catch(e => message.error(e.data.message))
    }
    const onClick = (fullName: string,inn:string,pasport:string) =>{
        setOperation({
            ...operation,
            fullName: fullName,
            inn: inn,
            pasport: pasport
        })
        setVisible(true)
    }
    return (
        <>
            <h1 className='h1 title'>Расход</h1>
            <div>
                <p>Номер счета кассы: {departmentAccount.number}</p>
                <p>Номер счета клиента: {account.number}</p>
                <div className='d-flex'>
                    <div className='info__client'>
                        {client?._id &&
                            <InfoClient client={client} cb={onClick} money={account.value[0].money}/>
                        }
                        {legal?._id &&
                            <InfoLegalClient legal={legal} cb={onClick} money={account.value[0].money}/>
                        }
                    </div>
                    {visible &&
                        <ExpenseForm reset={reset} submit={submit} operation={operation} setOperation={setOperation}/>
                    }
                </div>
            </div>
        </>
    );
}

export default Expense;