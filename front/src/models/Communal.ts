export interface Communal {
    _id:string,
    number:string,
    idEmployee:string,
    accountDepartment:string,//-
    date: string,
    city: string;
    street: string,
    house: string,
    flat: string,
    fullName: string,
    communals:{
        title:string,
        accountCommunal:string,//-
        startDate:string,
        endDate:string,
        startCounter: string,
        endCounter: string,
        money:string
    }[]
}