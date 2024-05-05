/*
Description: this controller contains all the crude functionality of the service

*/

import { ServiceModel } from "../model/Services";
import { ContactModel } from "../model/ContactMessages";


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
    service.save();

    res.send(service);

   }

   
    /*
    Description: this method view all the service from service database
    @return: json response of the entry
    */

    public static async index(req: any, res: any) {
        const services = await ServiceModel.find({});
        return res.send(services);
      }
    
      
    /*
    Description: updates a single service
    @return: json response of the entry
    */

    public static async updateService(req:any,res:any) {
        //Get the service id  from params

        let service_id = req.params.id;
        //get the service data to be updated
        const validated ={
            "serviceName":req.body.serviceName,
            "description":req.body.description,
            "imageUri":req.body.imageUri
        }

        //update the record in the database
        const service = await ServiceModel.findByIdAndUpdate(service_id,validated);

        return res.send(service);
    }

    /*
    Description: deletes a single service
    @return: json response of the entry
    */
    
static async deleteService(req:any,res:any):Promise<void>{
        //get the id of the service from the param
        let service_id = req.params.id;
        //remove the service from the database
        let service =  await ServiceModel.findByIdAndDelete(service_id);

        return res.send(service); 
    }


    
    /*
    Description: get a single service by the id
    @return: json response of the entry
    */


    public static async getServiceById(req:any,res:any){
        let service_id = req.params.id;
        let service = await ServiceModel.findById(service_id);
        return res.send(service);
    }

}
export default serviceController;



   
