export interface Operation{
    _id:String,
    idEmployee:String,
    numberAccount:String,
    accountDepartment:String,
    type:String,//приход / расход
    date: String,
    number:String,// Номер операции
    money:String,
    currency:String,
    isConfirm:boolean
    fullName:String,
    inn:String,
    pasport:String,
    purpose:String
}