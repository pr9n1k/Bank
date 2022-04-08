import Account from "../models/Account.js";
import Client from "../models/Client.js";
import Employee from "../models/Employee.js";
import { generateNumberAccount } from "../utils/util-random.js";
import createError from 'http-errors';


class ClientService{
    async add(name,patronymic,surname,sex,phone,birthDay,inn,city,street,house,flat,series,number,issued,issuedDate){
        const candidate = await Client.findOne({inn});
        if(candidate){
            throw createError(400,`Пользователь с таким инн ${inn} уже существует`)
        }
        const client = await Client.create({
            name,
            patronymic,
            surname,
            sex,
            phone,
            birthDay,
            inn,
            city,
            street,
            house,
            flat,
            series,
            number,
            issued,
            issuedDate
        })
        return client;
    }
    async createAccount(idObject,value,typeAccount){
        const accounts = await Account.find();
        const numberAccount = generateNumberAccount(accounts,typeAccount);
        const account = await Account.create({
            idObject,
            number:numberAccount,
            value
        })
        return account;
    }
    async get(limit,page){
        const totalCount = await Client.count();
        if(limit === "-1"){
            const client = await Client.find();
            return {client,number: totalCount}
        }
        const client = await Client.find().skip(Number(page*limit)).limit(Number(limit));
        return {client,number:totalCount};
    }
    async getById(id){
        if(!id){
            throw createError(400,'Id не указан');
        }
        const client = await Client.findOne({_id:id});
        return client;
    }
    async getAccountsById(id){
        if(!id){
            throw createError(400,'Id не указан');
        }
        const accounts = await Account.find({idObject:id});
        return accounts;
    }
    async getAccount(){
        const accounts = await Account.find();
        return accounts;
    }
    async getAccountByNumber(number){
        if(!number){
            throw createError(400,'Номер не указан');
        }
        const account = await Account.findOne({number});
        return account;
    }
    async getAccountByEmplyee(id){
        if(!id){
            throw createError(400,'ID не указан');
        }
        const employee = await Employee.findOne({_id:id});
        const account = await Account.findOne({idObject:employee.idDepartment});
        return account;
    }

}

export default new ClientService();