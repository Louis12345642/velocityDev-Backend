"use strict";
/*
Description: this controller contains all the crude functionality of the user

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class userController {
    //create(): this function creates a new user in the database
    //@return json
    //creating a token before the user is being saved in the database
    static createToken(id) {
        const token = jsonwebtoken_1.default.sign({ id }, "secret", {
            expiresIn: 86400
        });
        return token;
    }
    static create(req, res) {
        let u = new User_1.userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        //create a cookie and send it as response on the browser
        const token = userController.createToken(u._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
        u.save();
        return res.status(201).json(u);
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.userModel.find({});
            return res.send({ "users": users,
                "isAuth": true
            });
        });
    }
    //creating a function to delete the user
    static destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user_id = req.params.id;
            const user = yield User_1.userModel.findByIdAndDelete(user_id);
            return res.json(user);
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user_id = req.params.id;
            let user = yield User_1.userModel.findById(user_id);
            return res.json(user);
        });
    }
    static getAuthUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            const Token = authHeader.split(' ')[1];
            //   if( Token){
            //     Jwt.verify(Token,"secret" as string,(err:any,decodedToken:any)=>{
            //         if(err){
            //             res.send("erro in auth")
            //         }
            //         else{
            //             console.log(decodedToken);
            //             // const user = userModel.findById({decodedToken.})
            //           return  res.send(decodedToken);
            //         }
            //     })
            // }
            //    return  res.status(401).json({message:"Unauthorized"})
            return res.send("hello debuging");
        });
    }
    /*
    Description: updates a single service
    @return: json response of the entry
    */
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get the service id  from params
            let user_id = req.params.id;
            //get the service data to be updated
            const validated = {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password
            };
            //update the record in the database
            const user = yield User_1.userModel.findByIdAndUpdate(user_id, validated);
            return res.send(user);
        });
    }
}
exports.default = userController;
