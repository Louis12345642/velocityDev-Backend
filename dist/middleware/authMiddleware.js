"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    //compare the token from the one you have
    // const token = req.cookies.jwt;
    const authHeader = req.headers.authorization;
    const Token = authHeader.split(' ')[1];
    if (Token) {
        jsonwebtoken_1.default.verify(Token, "secret", (err, decodedToken) => {
            if (err) {
                res.send("erro in auth");
            }
            else {
                console.log(decodedToken);
                // const user = userModel.findById({decodedToken})
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
exports.authMiddleware = authMiddleware;
