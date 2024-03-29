import express from 'express'
const contactRouter = express.Router();
import { ContactController } from '../controllers/ContactController';


 contactRouter.post('/',ContactController.store)
 contactRouter.get('/',ContactController.index)

 export default contactRouter
 
