import Account from "../models/Account.js";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import { generateNumberAccount } from '../utils/util-random.js';
import createError from 'http-errors';


class DepartmentService{
    async add(number,city,typeAccount){
        const candidate = await Department.findOne({number});
        if(candidate){
            throw createError(404,`Отдел с таким номером ${number} уже существует`)
        }
        const department = await Department.create({number,city});
        const accounts = await Account.find();
        const numberAccount = generateNumberAccount(accounts,typeAccount);
        await Account.create({
            idObject: department._id,
            number: numberAccount,
            value: [
                {
                    currency: 'RUB',
                    money: '0'
                },
                {
                    currency: 'UAH',
                    money: '0'
                },
                {
                    currency: 'USD',
                    money: '0'
                },
                {
                    currency: 'EUR',
                    money: '0'
                },
            ]
        })

        return department;
    }
    async get(){
        const departments = await Department.find();
        return departments;
    }
    async getById(id){
        if(!id){
            throw createError(400,`ID не указан`)
        }
        const department = await Department.findOne({_id:id});
        return department;
    }
    async getByEmployee(id){
        if(!id){
            throw createError(400,`ID не указан`)
        }
        const employee = await Employee.findOne({_id:id});
        if(employee || employee._id !== 'not'){
            const department = await Department.findOne({_id:employee.idDepartment});
            return department;
        }
        return {};
    }
    async deleteById (id){
        const candidate = await Department.findOne({_id:id});
        if(!candidate){
            throw createError(400,'Отдел не найден')
        } 
        const employee = await Employee.find({idDepartment:candidate._id});
        employee.forEach(item =>{
            item.idDepartment = 'not';
            item.save();
        })
        const department = await Department.deleteOne({_id:id});
        return {
            department,
            employee
        };
    }
    async getAccountByEmployee(id){
        if(!id){
            throw createError(400,`ID не указан`)
        }
        const employee = await Employee.findOne({_id:id});
        const department = await Department.findOne({_id:employee.idDepartment});
        const account = await Account.findOne({idObject:department._id});
        return account;
    }
}

export default new DepartmentService();