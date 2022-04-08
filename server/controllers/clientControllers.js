import clientService from "../service/clientService.js";


class clientControllers{
    async add(req,res,next){
        try{
            const{
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
            } = req.body;
            const client = await clientService.add(name,patronymic,surname,sex,phone,birthDay,inn,city,street,house,flat,series,number,issued,issuedDate);
            return res.json(client);
        }catch(e){
            next(e);
        }
    }
    async createAccount(req,res,next){
        try{
            const idObject = req.params.id;
            const {value,typeAccount} = req.body;
            const account = await clientService.createAccount(idObject,value,typeAccount);
            return res.json(account);
        }catch(e){
            next(e);
        }
    }
    async get(req,res,next){
        try{
            const page = req.query.page;
            const limit = req.query.limit;
            const response = await clientService.get(limit,page);
            res.header('X-Total-Count',response.number)
            return res.json(response.client);
        }catch(e){
            next(e);
        }
    }
    async getById(req,res,next){
        try{
            const id = req.params.id;
            const client = await clientService.getById(id);
            return res.json(client);
        }catch(e){
            next(e);
        }
    }
    async getAccountsById(req,res,next){
        try{
            const id = req.params.id
            const accounts = await clientService.getAccountsById(id);
            return res.json(accounts);
        }catch(e){
            next(e);
        }
    }
    async getAccounts(req,res,next){
        try{
            const accounts = await clientService.getAccount();
            return res.json(accounts);
        }catch(e){
            next(e);
        }
    }

    async getAccountByNumber(req,res,next){
        try{
            const number = req.params.number;
            const account = await clientService.getAccountByNumber(number);
            return res.json(account);
        }catch(e){
            next(e);
        }
    }

    async getAccountByEmplyee(req,res,next){
        try {
            const id = req.params.id;
            const account = await clientService.getAccountByEmplyee(id);
            return res.json(account);
        } catch (e) {
            next(e)
        }
    }

}

export default new clientControllers();