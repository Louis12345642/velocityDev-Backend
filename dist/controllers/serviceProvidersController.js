"use strict";
/*
* [] Description: This class is containers all the method for working with external services such as apis
* [] Method: subscribe()
* [] @return : void
* [] Date: 14/0/2024
*
* [] Author(s): mubarak kual louis
*
*
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviderController = void 0;
const newsletter_1 = require("../service/newsletter");
class serviceProviderController {
    static subscribe(req, res) {
        newsletter_1.Newsletter.subscribe(req.body.email, res);
    }
}
exports.serviceProviderController = serviceProviderController;
