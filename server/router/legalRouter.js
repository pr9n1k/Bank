import { Router } from "express";
import LegalControllers from './../controllers/legalControllers.js'

const legalRouter = new Router();

legalRouter.post('/add',LegalControllers.add);
legalRouter.get('/get/:id',LegalControllers.getById);
legalRouter.get('/get',LegalControllers.get);
legalRouter.get('/get/client/:id',LegalControllers.getByIdClient);
legalRouter.get('/communal',LegalControllers.getCommunal);

export default legalRouter;