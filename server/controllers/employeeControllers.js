import employeeService from "../service/employeeService.js";


class employeeController{
    async add(req,res,next){
        try{
            const {
                name,
                patronymic,
                surname,
                login,
                password,
                phone,
                role,
            } = req.body;
            const employee = await employeeService.add(name,patronymic,surname,login,password,phone,role);
            return res.json(employee);
        }catch(e){
            next(e);
        }
    }

    async get(req,res,next){
        try{
            const page = req.query.page;
            const limit = req.query.limit;
            const response = await employeeService.get(limit,page);
            res.header('X-Total-Count',response.totalCount);
            return res.json(response.employee);
        }catch(e){
            next(e);
        }
    }

    async getById(req,res,next){
        try{
            const id = req.params.id;
            const employee = await employeeService.getById(id);
            return res.json(employee);

        }
        catch(e){
            next(e);
        }
    }
    async getByDepartament(req,res,next){
        try{
            const id = req.params.id;
            const employee = await employeeService.getByDepartament(id)
            return res.json(employee);
        }catch(e){
            next(e);
        }
    }    

    async update(req,res,next){
        try {
            const {
                _id,
                idDepartment,
                name,
                patronymic,
                surname,
                login,
                password,
                phone,
                role,
            } = req.body;
            const employee = await employeeService.update(_id,idDepartment,name,patronymic,surname,login,password,phone,role);
            return res.json(employee);
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req,res,next){
        try {
            const {id} = req.body;
            const employee = await employeeService.deleteById(id);
            return res.json(employee);
        } catch (e) {
            next(e)
        }
    }
}

export default new employeeController();