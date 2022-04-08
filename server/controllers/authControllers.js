import authService from "../service/authService.js";

class authController {
    async login(req,res,next){
        try{
            const {login,password} = req.body;
            const employeeData = await authService.login(login,password);
            return res.json(employeeData);
        }catch(e){
            next(e) 
        }
    }
}

export default new authController();