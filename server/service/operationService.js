import Account from '../models/Account.js';
import Communal from '../models/Communal.js';
import Department from '../models/Department.js';
import Employee from '../models/Employee.js';
import { differenceString, summaString , compareMoreOrEqually} from '../utils/util-math.js';
import Operation from './../models/Operation.js'
import { randomString } from './../utils/util-random.js';
import createError from 'http-errors';
import DepartmentService from '../service/departmentService.js'



class OperationService {
    async add(idEmployee,numberAccount,type,date,money,currency,fullName,inn,pasport,purpose){
        const numberOperation = randomString();
        const employee = await Employee.findOne({_id:idEmployee});
        const department = await Department.findOne({_id:employee.idDepartment})
        const accountDepartment = await Account.findOne({idObject:department._id});
        const accountClient = await Account.findOne({number:numberAccount})
        if(type === 'расход'){
            accountDepartment.value.forEach(item => {
                if(item.currency === currency && !compareMoreOrEqually(item.money,money)){
                    throw createError(400,'В кассе не достаточно средств')
                }
            })
            if(!compareMoreOrEqually(accountClient.value[0].money,money)){
                throw createError(400,'У клиента недостаточно средств')
            }
        }
        const operation = await Operation.create({
            idEmployee,
            numberAccount,
            accountDepartment:accountDepartment._id,
            type,
            date,
            number:numberOperation,
            money,
            currency,
            isConfirm:false,
            fullName,
            inn,
            pasport,
            purpose
        });
        return operation;
    }
    async addCommunal (idEmployee,accountDepartment,date,city,street,house,flat,fullName,communals){

        const number = randomString();
        const account = await Account.find();
        const accDepartment = await Account.findOne({number: accountDepartment});
        if(!accDepartment){
            throw createError(404,'Номер счета кассы не найден..');
        }
        if(!communal.communals){
            throw createError(400,'Комунальные данные не введены')
        }
        let summa = '0';
        
        communals.forEach(item => {
            let isAccount = false;
            account.forEach( acc => {
                if(item.accountCommunal === acc.number){
                    acc.value[0].money = summaString(acc.value[0].money,item.money);
                    acc.save();
                    summa = summaString(summa, item.money);
                    isAccount = true;
                }
            })
            if(!isAccount){
                throw createError(404,`Номер счета предприятия ${item.title} не найден..`)
            }
        })
        accDepartment.value.forEach(item => {
            if(item.currency === 'RUB'){
                item.money = summaString(item.money,summa);
            }
        })
        accDepartment.save();
        const communal = await Communal.create({
            number,
            idEmployee,
            accountDepartment,
            date,
            city,
            street,
            house,
            flat,
            fullName,
            communals
        })
        return communal;
    }
    async get(){
        const operations = await Operation.find();
        return operations;
    }
    async getByNumber(number){
        if(!number){
            throw createError(400,'Номер не указан')
        }
        const operation = await Operation.findOne({number});
        return operation;
    }
    async getIsNotConfirm(limit,page,idEmployee){
        if(!idEmployee){
            throw createError(404,`id сотрудника не указан`);
        }
        const accountDepartment = await DepartmentService.getAccountByEmployee(idEmployee);
        const totalCount = await Operation.count();
        const isConfirm = false
        const operations = await Operation.find({isConfirm,accountDepartment:accountDepartment._id}).skip(Number(page*limit)).limit(limit);
        return {operations,totalCount};
    }
    async confirm(number){
        if(!number){
            throw createError(400,'Номер не указан')
        }
        const operation = await Operation.findOne({number});
        if(!operation){
            throw createError('Некоректный номер операции');
        }
        if(operation.isConfirm){
            throw createError('Операция была уже подтвержденна');
        }
        const account = await Account.findOne({number:operation.numberAccount})
        const accountDepartment= await Account.findOne({_id:operation.accountDepartment});
        if(!account){
            throw createError('Некоректный номер счёта');
        }
        if(operation.type === 'приход'){
            accountDepartment.value.forEach(element => {
                if(element.currency === operation.currency){
                    element.money = summaString(element.money,operation.money);
                }
            });
            account.value[0].money = summaString(account.value[0].money,operation.money);
        }else if(operation.type === 'расход'){
            let moneyDepartment;
            accountDepartment.value.forEach(element => {
                if(element.currency === operation.currency){
                    moneyDepartment = element.money;
                }
            })
            if(compareMoreOrEqually(moneyDepartment,operation.money) && compareMoreOrEqually(account.value[0].money,operation.money)){
                accountDepartment.value.forEach(element => {
                    if(element.currency === operation.currency){
                        element.money = differenceString(element.money,operation.money)
                    }
                })
                account.value[0].money = differenceString(account.value[0].money,operation.money);
            }else{
                return {message: 'Сумма больше баланса'}
            }
        }else{
            throw ApiError.BadRequest('Некоректный тип операции');
        }
        operation.isConfirm = true;
        accountDepartment.save();
        account.save();
        operation.save();
    }
}

export default new OperationService();