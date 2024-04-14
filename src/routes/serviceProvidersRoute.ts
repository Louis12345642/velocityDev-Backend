import express from 'express'
import { serviceProviderController } from '../controllers/serviceProvidersController';


const serviceProviderRouter = express.Router() 
/*

Description: this ts script exports a route to be use in app.ts all the routes for external services api

*/


//adding a service to db route
serviceProviderRouter.post('/',serviceProviderController.subscribe);

export default  serviceProviderRouter;
