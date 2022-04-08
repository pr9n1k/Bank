import { Router } from "express";
import clientControllers from '../controllers/clientControllers.js'


const clientRouter = new Router();

clientRouter.post('/add',clientControllers.add);
clientRouter.post('/:id/create-account',clientControllers.createAccount);
clientRouter.get('/get',clientControllers.get);
clientRouter.get('/get-account',clientControllers.getAccounts);
clientRouter.get('/get/:id',clientControllers.getById);
clientRouter.get('/get/:id/account',clientControllers.getAccountsById);
clientRouter.get('/get/account/:number',clientControllers.getAccountByNumber);
clientRouter.get('/get/account-employee/:id',clientControllers.getAccountByEmplyee);

export default clientRouter;