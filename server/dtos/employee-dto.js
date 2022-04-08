

export default class EmployeeDto{
    login;
    id;
    name;
    patronymic;
    surname;
    phone;
    role;

    constructor(userModel){
        this.login = userModel.login;
        this.id = userModel._id;
        this.name = userModel.name;
        this.patronymic = userModel.patronymic;
        this.surname = userModel.surname;
        this.phone = userModel.phone;
        this.role = userModel.role;
    }

}