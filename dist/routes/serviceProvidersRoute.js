"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceProvidersController_1 = require("../controllers/serviceProvidersController");
const serviceProviderRouter = express_1.default.Router();
/*

Description: this ts script exports a route to be use in app.ts all the routes for external services api

*/
//adding a service to db route
serviceProviderRouter.post('/', serviceProvidersController_1.serviceProviderController.subscribe);
exports.default = serviceProviderRouter;
