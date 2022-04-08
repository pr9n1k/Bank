import DepartmentControllers from './../controllers/departmentControllers.js'
import { Router } from 'express';

const departmentRouter = new Router();

departmentRouter.post('/add',DepartmentControllers.add);
departmentRouter.get('/get',DepartmentControllers.get);
departmentRouter.get('/get/:id',DepartmentControllers.getById);
departmentRouter.get('/employee/:id',DepartmentControllers.getByEmployee);
departmentRouter.delete('/delete/:id',DepartmentControllers.deleteById);
departmentRouter.get('/account-employee/:id',DepartmentControllers.getAccountByEmployee);

export default departmentRouter;