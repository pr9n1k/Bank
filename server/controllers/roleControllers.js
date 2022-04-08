import roleService from './../service/roleService.js';
class roleController{
    
    async get(req,res,next){
        try{
            const role = await roleService.get();
            return res.json(role)
        }catch(e){
            next(e);
        }
    }
    async add(req,res,next){
        try{
            const {title,value} = req.body;
            const role = await roleService.add(title,value);
            return res.json(role);
        }catch(e){
            next(e);
        }
    }
}

export default new roleController();