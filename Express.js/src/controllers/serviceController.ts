/*
Description: this controller contains all the crude functionality of the service


*/

import { ServiceModel } from "../model/Services";

class serviceController
{
    /*
    Description: this method adds a service to service database
    @return: json response of the entry
    */

   public static addService(req:any,res:any) {
    //call the service model to add a service to the DB
    let service = new ServiceModel({
        "serviceName":req.body.serviceName,
        "description":req.body.description,
    })

    res.send(service);

   }

}

export default serviceController;