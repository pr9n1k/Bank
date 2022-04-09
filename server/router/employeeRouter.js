import {Router} from 'express';
import employeeControllers from '../controllers/employeeControllers.js';

const employeeRouter = new Router();

employeeRouter.post('/add',employeeControllers.add);
employeeRouter.get('/get',employeeControllers.get);
employeeRouter.get('/get/:id',employeeControllers.getById);
employeeRouter.get('/get/department/:id',employeeControllers.getByDepartament);
employeeRouter.put('/update',employeeControllers.update)
employeeRouter.delete('/delete',employeeControllers.deleteById)
employeeRouter.get('/admin',employeeControllers.getAdmin)

export default employeeRouter;