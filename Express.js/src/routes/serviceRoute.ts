import express from 'express'
import serviceController from '../controllers/serviceController'

const serviceRouter = express.Router() 
/*

Description: this ts script exports a route object that will be used in the mean class

*/


//adding a service to db route

serviceRouter.post('/',serviceController.addService);
serviceRouter.get('/',serviceController.getAllServices);
serviceRouter.get('/:id',serviceController.getServiceById);
serviceRouter.put('/:id',serviceController.updateService);
serviceRouter.delete('/:id',serviceController.deleteService);

export default serviceRouter;
