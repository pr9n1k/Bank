import { Router } from "express";
import operationControllers from './../controllers/operationController.js';



const operationRouter = new Router();


operationRouter.post('/add',operationControllers.add);
operationRouter.post('/communal',operationControllers.addCommunal)
operationRouter.get('/get',operationControllers.get)
operationRouter.get('/get/:number',operationControllers.getByNumber);
operationRouter.get('/not-confirm',operationControllers.getIsNotConfirm); //?
operationRouter.post('/confirm/:number',operationControllers.confirm);


export default operationRouter;