import Legal from './../models/Legal.js'
import Account from "../models/Account.js";
import { generateNumberAccount } from '../utils/util-random.js';
import createError from 'http-errors';

class LegalService {
    async add(idClient,title,inn,typeAccount,communalType){
        
        const candidate = await Legal.findOne({inn});
        if(candidate){
            throw createError(400,`Юр. лицо с таким ИНН ${inn} уже существует`)
        }
        const communal = await Legal.findOne({communalType});
        if(communal){
            throw createError(400,`Ком.Предприятие с таким типом уже существует`)
        }
        
        const legal = await Legal.create({idClient,title,inn});
        const accounts = await Account.find();
        const numberAccount = generateNumberAccount(accounts,typeAccount);
        await Account.create({
            idObject: legal._id,
            number: numberAccount,
            value: [
                {
                    currency: 'RUB',
                    money: '0'
                },
            ],
            communalType
        })
        return legal;
    }

    async get(){
        const legal = await Legal.find();
        return legal;
    }

    async getById(id){
        if(!id){
            throw createError(400,`ID не указан`)
        }
        const legal = await Legal.findOne({_id:id});
        return legal;
    }

    async getByIdClient(id){
        if(!id){
            throw createError(400,`ID не указан`)
        }
        const legal = await Legal.find({idClient: id});
        return legal;
    }
    async getCommunal(){
        const legal = await Legal.find();
        return legal.filter(item => item.communalType === 'Свет' || item.communalType === 'Газ' || item.communalType === 'Вода');
    }
}

export default new LegalService();