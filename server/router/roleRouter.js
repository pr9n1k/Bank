import {Router} from 'express';
import roleControllers from '../controllers/roleControllers.js';

const roleRouter = new Router();

roleRouter.get('/get',roleControllers.get);
roleRouter.post('/add',roleControllers.add);

export default roleRouter;