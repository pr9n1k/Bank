import DepartmentService from './../service/departmentService.js'

class DepartmentControllers{
    async add(req,res,next){
        try{
            const{number,city,typeAccount} = req.body;
            const department = await DepartmentService.add(number,city,typeAccount);
            return res.json(department);
        }catch(e){
            next(e);
        }
    }    
    async get(req,res,next){
        try{
            const departments = await DepartmentService.get();
            return res.json(departments);
        }catch(e){
            next(e);
        }
    }    
    async getById(req,res,next){
        try{
            const id = req.params.id;
            const department = await DepartmentService.getById(id);
            return res.json(department);
        }catch(e){
            next(e);
        }
    }
    async getByEmployee(req,res,next){
        try{
            const id = req.params.id;
            const department = await DepartmentService.getByEmployee(id);
            return res.json(department);
        }catch(e){
            next(e);
        }
    }
    
    async deleteById(req,res,next){
        try{
            const id = req.params.id;
            const response = await DepartmentService.deleteById(id);
            return res.json(response);
        }catch(e){
            next(e);
        }
    }
    async getAccountByEmployee(req,res,next){
        try {
            const id = req.params.id;
            const account = await DepartmentService.getAccountByEmployee(id);
            return res.json(account);
        } catch (e) {
            next(e);
        }
    }
}
    
//6232f5ea6c5a5e21ec3f68ff getByEmployee
export default new DepartmentControllers();