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
exports.ContactController = void 0;
const ContactMessages_1 = require("../model/ContactMessages");
const sendContactEmail_1 = require("../service/sendContactEmail");
/*
  this class is where all the crude operation related to contact are set

*/
class ContactController {
    /*
      store() : stores contact information
      @return : void
      @params : message:object
   
   */
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactMsg = yield new ContactMessages_1.ContactModel({
                "title": req.body.title,
                "message": req.body.message,
                "email": req.body.email,
                "name": req.body.name
            });
            //sending an alert email to the user 
            sendContactEmail_1.sendContactEmail.sendEmail(req, res);
            contactMsg.save();
            return res.json(contactMsg);
        });
    }
    /*
  index() : gets all the contact messages saved in the database
  @return : json
  @params : null
   
  */
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield ContactMessages_1.ContactModel.find({});
            return res.json(contacts);
        });
    }
    /*
    update() : update a single contact messages saved in the database
    @return : json
    @params : contact_id
     */
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validated = { "title": req.body.title, "body": req.body.message, "email": req.body.email, "name": req.body.name };
            //find the contact using the id
            let contact_id = req.params.id;
            //get the data to be saved
            let contacts = yield ContactMessages_1.ContactModel.findByIdAndUpdate(contact_id, validated);
            //update the contact with the data given
            return res.send(contacts);
        });
    }
    /*
    delete() : deletes a contact from the database
    @return : json
    @params : request and response
     */
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //get the contact id
            let contact_id = req.params.id;
            let contact = yield ContactMessages_1.ContactModel.deleteOne({ _id: contact_id });
            return res.send(contact);
        });
    }
}
exports.ContactController = ContactController;
