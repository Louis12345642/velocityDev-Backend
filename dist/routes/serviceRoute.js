"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceController_1 = __importDefault(require("../controllers/serviceController"));
const serviceRouter = express_1.default.Router();
/*

Description: this ts script exports a route object that will be used in the mean class

*/
//adding a service to db route
serviceRouter.get('/', serviceController_1.default.index);
serviceRouter.post('/', serviceController_1.default.addService);
serviceRouter.get('/:id', serviceController_1.default.getServiceById);
serviceRouter.put('/:id', serviceController_1.default.updateService);
serviceRouter.delete('/:id', serviceController_1.default.deleteService);
exports.default = serviceRouter;
