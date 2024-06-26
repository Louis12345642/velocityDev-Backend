import express from 'express'
const contactRouter = express.Router();
import { ContactController } from '../controllers/ContactController';


 contactRouter.post('/',ContactController.store);
 contactRouter.get('/',ContactController.index);
 contactRouter.put('/:id',ContactController.update);
 contactRouter.delete('/:id',ContactController.delete);

 export default contactRouter
 
