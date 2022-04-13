import { Router } from "express";
import operationControllers from './../controllers/operationController.js';
import encashmentControllers from './../controllers/encashmentControllers.js'



const operationRouter = new Router();


operationRouter.post('/add',operationControllers.add);
operationRouter.post('/communal',operationControllers.addCommunal)
operationRouter.get('/get',operationControllers.get)
operationRouter.get('/get/:number',operationControllers.getByNumber);
operationRouter.get('/not-confirm',operationControllers.getIsNotConfirm); //?
operationRouter.post('/confirm/:number',operationControllers.confirm);
operationRouter.post('/encashment',encashmentControllers.add);
operationRouter.get('/encashment',encashmentControllers.get);
operationRouter.get('/encashment/:id',encashmentControllers.getById);
operationRouter.get('/encashment-admin',encashmentControllers.getAdmin);
operationRouter.get('/encashment-cashier',encashmentControllers.getCashier);
operationRouter.put('/confirm/encashment',encashmentControllers.confirm);

export default operationRouter;