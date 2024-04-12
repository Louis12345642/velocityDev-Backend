
import mongoose from  'mongoose';

/*
Description: this class exports the model and schema of a service 

*/
class Service {

    /*

    Method Name: getModelAndSchema()
    Description: returns the mongoose schema
    @return: mongoose schema for a single service
    */

    //create a service model class that return a schema of  the service

    public static ServiceSchema() {
        return new mongoose.Schema({
            "serviceName": String,
            "description": String,
        })
    }

}

 //export a model of the service

 export const ServiceModel = mongoose.model("serviceModel", Service.ServiceSchema());

