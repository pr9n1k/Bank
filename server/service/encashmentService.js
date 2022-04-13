import Department from "../models/Department.js";
import Encashment from "../models/Encashment.js";
import Account from "../models/Account.js";
import createError from 'http-errors';
import { summaString, differenceString, compareMoreOrEqually } from "../utils/util-math.js";


class EncashmentService{
    async add(date,idDepartment,idOperator,type,value){
        const candidate = await Encashment.findOne({idDepartment:idDepartment,isAdmin:false,isCashier:false});
        // if(candidate){
        //     throw createError(404,'Вы не можете сделать более 1 заявки');
        // }
        const departmentAccount = await Account.findOne({idObject:idDepartment});
        if(!departmentAccount){
            throw createError(404,`${departmentAccount}`)
        }
        if(type === 'инкассация'){
            value.map(item => {
                departmentAccount.value.map(department=> {
                    if(department.currency === item.currency && !compareMoreOrEqually(department.money,item.money)){
                        throw createError(404,`В банке не хватает ${department.currency}`)
                    }
                })
            })
        }
        const encashment = await Encashment.create({
            date,
            idDepartment,
            idOperator,
            type,
            value
        })
        return encashment;
    }
    async get(){
        const encashment = await Encashment.find();
        return encashment;
    }
    async getById(id){
        const encashment = await Encashment.findOne({_id:id});
        return encashment;
    }
    async getAdmin(){
        const encashment = await Encashment.find({
            $or:[
                {
                    type:'подкрепление',
                    isAdmin:false,
                    isCashier:false
                },
                {
                    type:'инкассация',
                    isAdmin:false,
                    isCashier:true
                }
            ]
        });
        return encashment;
    }
    async getCashier(idDepartment){
        const department = await Department.findOne({_id:idDepartment});
        if(!department){
            throw createError(400,'Отдел не найден')
        }
        const encashment = await Encashment.find({
            $or:[
                {
                    type:'инкассация',
                    isAdmin:false,
                    isCashier:false,
                    idDepartment
                },
                {
                    type:'подкрепление',
                    isAdmin:true,
                    isCashier:false,
                    idDepartment
                }
            ]
        });
        return encashment;
    }
    async confirm (id,value,employee){
        const encashment = await Encashment.findOne({_id:id});
        const bankAccount = await Account.findOne({idObject:"BANK"});
        const departmentAccount = await Account.findOne({idObject:encashment.idDepartment});
        if(!encashment){
            throw createError(404,'ID инкассации не верный..');
        }
        if(employee === 'ADMIN'){
            if(encashment.type === 'подкрепление'){
                value.map(item => {
                    bankAccount.value.map(bank=> {
                        if(bank.currency === item.currency && !compareMoreOrEqually(bank.money,item.money)){
                            throw createError(404,`В банке не хватает ${bank.currency}`)
                        }
                    })
                })
            }
            encashment.isAdmin = true;
            if(value){
                encashment.value = value;
            }
        }
        if(employee === 'CASHIER'){
            encashment.isCashier = true;
        }
        await encashment.save();
        const newEncashment = await Encashment.findOne({_id:id});
        if(newEncashment.isAdmin === true && newEncashment.isCashier === true){
            newEncashment.value.map(item => {
                bankAccount.value.map(bank => {
                    if(bank.currency === item.currency){
                        if(newEncashment.type === 'подкрепление'){
                            bank.money = differenceString(bank.money,item.money)
                        }
                        if(newEncashment.type === 'инкассация'){
                            bank.money = summaString(bank.money,item.money)
                        }
                    }
                })
                departmentAccount.value.map(department => {
                    if(department.currency === item.currency){
                        if(newEncashment.type === 'подкрепление'){
                            department.money = summaString(department.money,item.money)
                        }
                        if(newEncashment.type === 'инкассация'){
                            department.money = differenceString(department.money,item.money)
                        }
                    }
                })
            })
            departmentAccount.save();
            bankAccount.save();
        }
        return newEncashment;
    }
}

export default new EncashmentService();