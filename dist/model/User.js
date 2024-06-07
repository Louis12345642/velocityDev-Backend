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
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/*
method:
  [] userSchema() : this method is responsible for creating the database schema for a user

*/
class userSchema {
    static userSchema() {
        return new mongoose_1.default.Schema({
            "name": String,
            "email": String,
            "password": String
        }).pre('save', function (next) {
            return __awaiter(this, void 0, void 0, function* () {
                //create a salt for the password
                const salt = yield bcrypt_1.default.genSalt(10);
                let unhashedPassword = this.password;
                //hash the password
                const hashedPassword = yield bcrypt_1.default.hash(unhashedPassword, salt);
                //replace the password with the hashed password
                this.password = hashedPassword;
                next();
            });
        });
    }
}
exports.userModel = mongoose_1.default.model("userSchema", userSchema.userSchema());
