"use strict";
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
exports.Newsletter = void 0;
/*
* [] Description: This class is a service that allows the use of mailchimp news letter subscription
* [] Method: subscribe()
* [] @params : $email
* [] @return : void
* [] Date: 14/0/2024
*
* [] Author(s): mubarak kual louis
*
*
*/
const mailchimp = require("@mailchimp/mailchimp_marketing");
class Newsletter {
    static subscribe(email, res) {
        let errors = [];
        //initialize mailchimp
        mailchimp.setConfig({
            apiKey: process.env.MAIL_CHIMP_API_KEY,
            server: "us17",
        });
        //sub info
        const subscriberEmail = email;
        //validate the request
        if (!subscriberEmail) {
            errors.push({
                message: "Email is required"
            });
        }
        const subscribingUser = {
            email: subscriberEmail
        };
        function run() {
            return __awaiter(this, void 0, void 0, function* () {
                const list_id = process.env.MAIL_CHIMP_API_LIST_ID;
                const response = yield mailchimp.lists.addListMember(list_id, {
                    email_address: subscribingUser.email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: email,
                        LNAME: email
                    }
                });
            });
        }
        try {
            const responseData = {
                "message": "Successfully subscribed to our newsletter",
                "status": 200
            };
            run();
            return res.send(responseData);
        }
        catch (err) {
            errors.push({
                "message": " server Error subscribing to newsletter"
            });
            if (errors.length > 0)
                return res.send(errors);
        }
    }
}
exports.Newsletter = Newsletter;
