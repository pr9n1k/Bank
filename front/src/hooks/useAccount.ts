
import { departmentAPI } from './../service/department';
import { employeeAPI } from './../service/employeeService';
import { Account } from '../models/Account';
import { accountAPI } from './../service/accountService';

export const useAccount = (id:string) => {
    const {data: employee} = employeeAPI.useGetByIdQuery(id);
    const {data: department} = departmentAPI.useGetByIdQuery(employee?.idDepartment as string);
    const {data: account} = accountAPI.useGetQuery(department?._id as string)
    if(account?.length){
        return account[0];
    }else{
        return {} as Account;
    }
}