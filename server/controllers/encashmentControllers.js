import EncashmentService from "../service/encashmentService.js";


class encashmentControllers{
    async add(req,res,next){
        try {
            const {date,idDepartment,idOperator,type,value} = req.body;
            const encashment = await EncashmentService.add(date,idDepartment,idOperator,type,value);
            return res.json(encashment);
        } catch (e) {
            next(e);
        }
    }
    async get(req,res,next){
        try {
            const encashment = await EncashmentService.get();
            return res.json(encashment);
        } catch (e) {
            next(e);
        }
    }
    async getById(req,res,next){
        try {
            const id = req.params.id;
            const encashment = await EncashmentService.getById(id);
            return res.json(encashment);
        } catch (e) {
            next(e);
        }
    }
    async getAdmin(req,res,next){
        try {
            const encashment = await EncashmentService.getAdmin();
            return res.json(encashment);
        } catch (e) {
            next(e);
        }
    }
    async getCashier(req,res,next){
        try {
            const idDepartment = req.query.idDepartment;
            const encashment = await EncashmentService.getCashier(idDepartment);
            return res.json(encashment);
        } catch (e) {
            next(e);
        }
    }
    async confirm(req,res,next){
        try {
            const {id,value,employee} = req.body;
            const encashment = await EncashmentService.confirm(id,value,employee);
            return res.json(encashment);
        } catch (e) {
            next(e);
        }
    }
}

export default new encashmentControllers();