import { accountAPI } from '../service/accountService';
import { legalAPI } from '../service/legalService';
export const useCommunal = () => {
    const {data: legal, isLoading: isLoadingLegal} = legalAPI.useLegalCommunalGetQuery();
    const {data:account, isLoading: isLoadingAccount} = accountAPI.useGetAllQuery()
    const accountCommunal: any[] = [];
    if(legal && account){
        legal.forEach(el => {
            account.forEach(acc => {
                if(acc.idObject === el._id){
                    accountCommunal.push({
                        title: el.communalType,
                        accountCommunal: acc.number,
                    })
                }
            })
        })
    }
    return {
        account: accountCommunal,
        isLoading: isLoadingLegal && isLoadingAccount
    };
}