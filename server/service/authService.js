import Employee from "../models/Employee.js";
import bcrypt from 'bcrypt';
import EmployeeDto from './../dtos/employee-dto.js';
import createError from 'http-errors';


class AuthService {
    async login(login, password){
        const employee = await Employee.findOne({login});
        if(!employee){
            throw createError(401,'Не верный логин');
        }
        const isPassEquals = await bcrypt.compare(password,employee.password);
        if(!isPassEquals){
            throw createError(401,'Неверный пароль');
        }
        const employeeDto = new EmployeeDto(employee);
        return{...employeeDto};
    }
}

export default new AuthService();