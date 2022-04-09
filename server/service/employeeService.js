import Employee from "../models/Employee.js";
import bcrypt from 'bcrypt';
import EmployeeDto from './../dtos/employee-dto.js';
import createError from 'http-errors';



class employeeService{
    async add(name,patronymic,surname,login,password,phone,role){
        const candidate = await Employee.findOne({login});
        if(candidate){
            throw createError(400,`Пользователь с таким логином ${login} уже существует`);
        }
        const candidatePhone = await Employee.findOne({phone});
        if(candidatePhone){
            throw createError(400,'Пользователь с таким номером телефона уже существует')
        }

        const employee = await Employee.create({name,patronymic,surname,login,password, phone, role});

        const employeeDto = new EmployeeDto(employee);
        return{...employeeDto};
    }

    async get(limit,page){
        const totalCount = await Employee.count();
        const employee = await Employee.find({$nor:[{role:'ADMIN'}]}).skip(Number(page*limit)).limit(limit);
        return {employee,totalCount};
    }

    async getAdmin(){
        const admin = await Employee.findOne({role:'ADMIN'});
        return admin;
    }

    async getById(id){
        if(!id){
            throw createError(400,`Id не найден`);
        }
        const employee = await Employee.findOne({_id:id});
        return employee;
    }

    async getByDepartament(id){
        if(!id){
            throw createError(400,`Id не найден`);
        }
        const employee = await Employee.find({idDepartment:id});
        return employee;
    }    

    async update(_id,idDepartment,name,patronymic,surname,login,password,phone,role){
        const employee = await Employee.findOne({_id:_id});        
        if(!employee){
            throw createError(400,`Сотрудник не найден`);
        }
        
        employee.idDepartment = idDepartment;
        employee.name = name;
        employee.patronymic = patronymic;
        employee.surname = surname;
        employee.login = login;
        employee.phone = phone;
        employee.role = role;
        if(password && password !== employee.password){
            employee.password = password;
        }


        employee.save();
        return employee;
    }
    async deleteById(id){
        if(!id){
            throw createError(400,`Id не найден`);
        }
        const candidate = await Employee.findOne({_id:id});
        if(!candidate){
            throw createError(400,`Сотрудник не найден`);
        }
        const employee = await Employee.deleteOne({_id:id});
        return employee;
    }

}

export default new employeeService();