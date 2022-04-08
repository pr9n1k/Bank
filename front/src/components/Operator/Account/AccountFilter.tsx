import Search from 'antd/lib/input/Search';
import React, { FC, useState } from 'react';
import { Account } from '../../../models/Account';
import { useTakeAccountByLegal } from '../../../hooks/useTakeAccountByLegal';
import { accountAPI } from './../../../service/accountService';
type BorrowerFilterType = { 
    setAccount: React.Dispatch<React.SetStateAction<Account>>
}

const AccountFilter:FC<BorrowerFilterType> = ({setAccount}) => {
    const {data:accounts} = accountAPI.useGetAllQuery();
    const accountsByLegal = useTakeAccountByLegal();
    const allAccount: Account[] = [];
    if(accountsByLegal?.length){
        accountsByLegal.forEach(acc => allAccount.push(acc));
    }
    if(accounts?.length){
        accounts.forEach(acc => allAccount.push(acc));
    }
    const [input,setInput] = useState('');
    const onSearch = () => {
        allAccount?.forEach(acc => {
            if(acc.number === input) {
                setAccount(acc);
            }
        })
    }
    return (
        <Search 
            value={input}
            onChange={e => setInput(e.target.value)}
            onSearch={onSearch}
            placeholder='Введите номер счета..'
            style={{width:"200px", margin:"20px auto"}}
        />
    );
}

export default AccountFilter;