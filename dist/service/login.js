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
exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../model/User");
const errors_1 = require("../database/errors");
/*
description : this class handles the login LoginController
 methods: Login handle the login logic

 */
class Login {
    static login(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //find the user in the database
                let user = yield User_1.userModel.findOne({ email });
                //if the user exists login compare the password
                const auth = yield bcrypt_1.default.compare(password, user.password);
                //login the user here
                if (auth) {
                    return user;
                }
                else {
                    //password is incorrect
                    return errors_1.errors.push({ message: "invalid password" });
                }
            }
            catch (_a) {
                //user not found
                errors_1.errors.push({ message: "user not found" });
            }
        });
    }
}
exports.Login = Login;
