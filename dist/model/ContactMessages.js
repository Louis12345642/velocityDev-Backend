"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/*
method:
  [] contactMessageSchema() : this method is responsible for creating the database schema

*/
class contactMessage {
    static contactMessageSchema() {
        return new mongoose_1.default.Schema({
            "title": String,
            "message": String,
            "email": String,
            "name": String
        });
    }
}
//creating the model
exports.ContactModel = mongoose_1.default.model("Contact", contactMessage.contactMessageSchema());
