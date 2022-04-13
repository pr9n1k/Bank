export interface Encashment{
    _id:string,
    date:string,
    idDepartment:string,
    idOperator:string,
    idCashier:string,
    isAdmin:boolean,
    isCashier:boolean,
    type:string,
    value:{
        currency: string,
        money:string
    }[]

}