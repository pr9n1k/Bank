import { Radio } from 'antd';
import React, { useState } from 'react';
import { Account } from '../../../models/Account';
import AccountFilter from '../Account/AccountFilter';
import Arrival from './Arrival';
import Expense from './Expense';

const Operation = () => {
    const [factor,setFactor] = useState(true);
    const [account,setAccount] = useState({} as Account)
    
    const options = [
        { label: 'Приход', value: true },
        { label: 'Расход', value: false },
    ];
    return (
        <>
            <div>
                <Radio.Group
                options={options}
                onChange={e => setFactor(e.target.value)}
                value={factor}
                optionType="button"
                buttonStyle="solid"
                />
            </div>
            <div>
            <AccountFilter setAccount={setAccount}/>
            </div>
            <div>
                {factor && account.number 
                    ?<Arrival account={account}/>
                    : null
                }
                {!factor && account.number
                    ?<Expense account={account}/>
                    :null
                }
            </div>
        </>
    );
}

export default Operation;