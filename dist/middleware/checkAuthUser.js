"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../model/User");
function checkAuthUser(req, res, next) {
    //compare the token from the one you have
    // const token = req.cookies.jwt;
    const authHeader = req.headers.authorization;
    try {
        const Token = authHeader.split(' ')[1];
        if (Token) {
            jsonwebtoken_1.default.verify(Token, "secret", (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    // res.send("erro in auth")
                }
                else {
                    console.log(decodedToken);
                    const user = User_1.userModel.findOne({ decodedToken });
                    res.send(user);
                    console.log("kual");
                    next();
                }
            });
        }
        else {
            // res.status(401).json({message:"Unauthorized"})
            res.locals.user = null;
        }
    }
    catch (_a) {
        res.locals.user = null;
        next();
    }
}
exports.checkAuthUser = checkAuthUser;
