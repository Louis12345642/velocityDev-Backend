"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*method:

[]connect()=> this method is used to connect to database
[]
*/
class Database {
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
    }
    //creating the connect method
    Connect() {
        try {
            mongoose_1.default.connect(this.dbUrl);
            console.log("connected successfully");
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
exports.default = Database;
