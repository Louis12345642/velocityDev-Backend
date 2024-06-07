"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
    static ServiceSchema() {
        return new mongoose_1.default.Schema({
            "serviceName": String,
            "description": String,
            "imageUri": String
        });
    }
}
//export a model of the service
exports.ServiceModel = mongoose_1.default.model("serviceModel", Service.ServiceSchema());
