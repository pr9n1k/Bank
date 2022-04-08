import { Account } from '../models/Account';
import { accountAPI } from './../service/accountService';
import { legalAPI } from '../service/legalService';

export const useTakeAccountByLegalId = (id: string) => {
    const {data:legals} = legalAPI.useGetByIdClientQuery(id);
    const {data:accounts} = accountAPI.useGetAllQuery()
    const arrayAccounts: Account[] = [];
    legals?.forEach(legal => {
        accounts?.forEach(account => {
            if(legal._id === account.idObject){
                arrayAccounts.push(account);
            }
        })
    })
    return arrayAccounts;
}
export const useTakeAccountByLegal = () => {
    const {data:legals} = legalAPI.useGetQuery();
    const {data:accounts} = accountAPI.useGetAllQuery()
    const arrayAccounts: Account[] = [];
    legals?.forEach(legal => {
        accounts?.forEach(account => {
            if(legal._id === account.idObject){
                arrayAccounts.push(account);
            }
        })
    })
    return arrayAccounts;
}