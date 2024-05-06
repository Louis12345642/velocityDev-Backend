import express from 'express'
import userController from '../controllers/userController';
const app = express()

const userRouter = express.Router()



userRouter.post('/',userController.create);
userRouter.get('/',userController.index);
userRouter.delete('/:id',userController.destroy)


//all users route to be exposed here

export default userRouter;


