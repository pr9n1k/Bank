export interface Account{
    _id:string,
    idObject:string,
    number:string,
    value:[{
        currency: string,
        money:string
    }]
}