import legalService from "../service/legalService.js";


class LegalControllers{
    async add(req,res,next){
        try{
            const{idClient,title,inn,typeAccount,communalType} = req.body;
            const legal = await legalService.add(idClient,title,inn,typeAccount,communalType);
            return res.json(legal);
        }catch(e){
            next(e);
        }
    }    
    async get(req,res,next){
        try{
            const legal = await legalService.get();
            return res.json(legal);
        }catch(e){
            next(e);
        }
    }   
    async getById(req,res,next){
        try{
            const id = req.params.id;
            const legal = await legalService.getById(id);
            return res.json(legal);
        }catch(e){
            next(e);
        }
    }   
    async getByIdClient(req,res,next){
        try{
            const id = req.params.id;
            const legal = await legalService.getByIdClient(id);
            return res.json(legal);
        }catch(e){
            next(e);
        }
    }   
    async getCommunal(req,res,next){
        try {
            const response = await legalService.getCommunal();
            return res.json(response);
        } catch (e) {
            next(e)
        }
    }
}

export default new LegalControllers();
