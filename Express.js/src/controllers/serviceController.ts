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

   
    /*
    Description: this method view all the service from service database
    @return: json response of the entry
    */

    public static async getAllServices(req:any,res:any) {
        //get data from the services model and return as a

        let services = await ServiceModel.find({});
        res.send(services);
    }

      
    /*
    Description: updates a single service
    @return: json response of the entry
    */

    public static async updateService(req:any,res:any) {
        //Get the service id  from params

        let service_id = req.params.id;
        //get the service data to be updated
        let validated ={
            "serviceName":req.body.serviceName,
            "description":req.body.description,
        }

        //update the record in the database
        let service = await ServiceModel.findByIdAndUpdate(service_id,validated);
        res.send(service);
    }

    /*
    Description: deletes a single service
    @return: json response of the entry
    */
    
    public static deleteService(req:any,res:any) {
        //get the id of the service from the param
        let service_id = req.params.id;
        //remove the service from the database
        let service = ServiceModel.findByIdAndDelete(service_id);
        res.send(service); 
    }


    
    /*
    Description: get a single service by the id
    @return: json response of the entry
    */


    public static async getServiceById(req:any,res:any){
        let service_id = req.params.id;
        let service = await ServiceModel.findById(service_id);
        res.send(service);
        
    }

}
export default serviceController;



   
