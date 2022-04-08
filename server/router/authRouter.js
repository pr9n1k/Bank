import {Router} from 'express';
import authControllers from '../controllers/authControllers.js';


const authRouter = new Router();


authRouter.post('/login',authControllers.login);



export default authRouter;
