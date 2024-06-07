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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = void 0;
/*
* [] Description: This class is contains all the methods for sending contact emails after the user fills the contact me form
* [] Method: sendEmail()
* [] @return : void
* [] Date: 14/0/2024
*
* [] Author(s): mubarak kual louis
*
*
*/
const nodemailer_1 = __importDefault(require("nodemailer"));
class sendContactEmail {
    static sendEmail(req, res) {
        //nodemailer code 
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "luismubarak@gmail.com",
                pass: "zclj zyzl jiyd nuuq",
            },
        });
        // async..await is not allowed in global scope, must use a wrapper
        function main() {
            return __awaiter(this, void 0, void 0, function* () {
                // send mail with defined transport object
                const info = yield transporter.sendMail({
                    from: `Mubarak Louis 👻 <luismubarak@gmail.com>`,
                    to: req.body.email,
                    subject: `Hello ${req.body.name}: Your message has been received`,
                    text: req.body.message,
                    html: `<b>Thank you ${req.body.name} for contacting velocityDev we are so thrilled to work with you</b>`, // html body
                });
                console.log("Message sent: %s", info.messageId);
            });
        }
        //calling the main fucntion
        main().catch(console.error);
    }
}
exports.sendContactEmail = sendContactEmail;
