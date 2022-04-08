import operationService from './../service/operationService.js';

class operationControllers{
    async add(req,res,next){
        try{
            const{
                idEmployee,
                numberAccount,
                type,
                date,
                money,
                currency,
                fullName,
                inn,
                pasport,
                purpose
            } = req.body;
            const operation = await operationService.add(idEmployee,numberAccount,type,date,money,currency,fullName,inn,pasport,purpose);
            return res.json(operation);
        }catch(e){
            next(e);
        }
    }
    async addCommunal(req,res,next){
        try{
            const{
                idEmployee,
                accountDepartment,
                date,
                city,
                street,
                house,
                flat,
                fullName,
                communals
            } = req.body;
            const communal = await operationService.addCommunal(idEmployee,accountDepartment,date,city,street,house,flat,fullName,communals);
            return res.json(communal);
        }catch(e){
            next(e);
        }
    }
    
    
    async get(req,res,next){
        try{
            const operations = await operationService.get();
            return res.json(operations);
        }catch(e){
            next(e);
        }
    }
    async getByNumber(req,res,next){
        try{
            const number = req.params.number;
            const operation = await operationService.getByNumber(number);
            return res.json(operation);
        }catch(e){
            next(e);
        }
    }
    async getIsNotConfirm(req,res,next){
        try{
            const idEmployee = req.query.id;
            const page = req.query.page;
            const limit = req.query.limit;
            const response = await operationService.getIsNotConfirm(limit,page,idEmployee);
            res.header('X-Total-Count',response.number)
            return res.json(response.operations);
        }catch(e){
            next(e);
        }
    }
    async confirm(req,res,next){
        try{
            const number = req.params.number;
            await operationService.confirm(number);
            return res.json({message:'Операция заверена'});
        }catch(e){
            next(e);
        }
    }
}

export default new operationControllers();