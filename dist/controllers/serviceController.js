"use strict";
/*
Description: this controller contains all the crude functionality of the service

*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../model/Services");
class serviceController {
    /*
    Description: this method adds a service to service database
    @return: json response of the entry
    */
    static addService(req, res) {
        //call the service model to add a service to the DB
        let service = new Services_1.ServiceModel({
            "serviceName": req.body.serviceName,
            "description": req.body.description,
        });
        service.save();
        res.send(service);
    }
    /*
    Description: this method view all the service from service database
    @return: json response of the entry
    */
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield Services_1.ServiceModel.find({});
            return res.send(services);
        });
    }
    /*
    Description: updates a single service
    @return: json response of the entry
    */
    static updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get the service id  from params
            let service_id = req.params.id;
            //get the service data to be updated
            const validated = {
                "serviceName": req.body.serviceName,
                "description": req.body.description,
                "imageUri": req.body.imageUri
            };
            //update the record in the database
            const service = yield Services_1.ServiceModel.findByIdAndUpdate(service_id, validated);
            return res.send(service);
        });
    }
    /*
    Description: deletes a single service
    @return: json response of the entry
    */
    static deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //get the id of the service from the param
            let service_id = req.params.id;
            //remove the service from the database
            let service = yield Services_1.ServiceModel.findByIdAndDelete(service_id);
            return res.send(service);
        });
    }
    /*
    Description: get a single service by the id
    @return: json response of the entry
    */
    static getServiceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let service_id = req.params.id;
            let service = yield Services_1.ServiceModel.findById(service_id);
            return res.send(service);
        });
    }
}
exports.default = serviceController;
