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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./database/connection"));
const ContactRoute_1 = __importDefault(require("./routes/ContactRoute"));
require("dotenv").config();
const TestimonialRoute_1 = __importDefault(require("./routes/TestimonialRoute"));
const serviceRoute_1 = __importDefault(require("./routes/serviceRoute"));
const serviceProvidersRoute_1 = __importDefault(require("./routes/serviceProvidersRoute"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const login_1 = require("./service/login");
const userController_1 = __importDefault(require("./controllers/userController"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const User_1 = require("./model/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*
*initialing the main app
*/
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({}));
//Database connections
const DB_url = process.env.DB_URL;
const conn = new connection_1.default(DB_url);
conn.Connect();
/*
*Handle body parse express middleware
*/
app.use(express_1.default.json());
/*
*Handle all the contact routes
*/
app.use('/contact', ContactRoute_1.default);
app.use('/contacts', ContactRoute_1.default);
app.use('/contacts/:id', authMiddleware_1.authMiddleware, ContactRoute_1.default);
app.use('/contacts/:id', authMiddleware_1.authMiddleware, ContactRoute_1.default);
/*
*Handle all the testimonial routes
*/
app.use('/testimonial', TestimonialRoute_1.default);
app.use('/testimonial/index', TestimonialRoute_1.default);
app.use('/testimonial/:id', TestimonialRoute_1.default);
app.use('/testimonial/:id', TestimonialRoute_1.default);
/*
*Handle all the service routes
*/
app.use('/service', authMiddleware_1.authMiddleware, serviceRoute_1.default);
app.use('/services/index', serviceRoute_1.default);
app.use('/service/:id', authMiddleware_1.authMiddleware, serviceRoute_1.default);
app.use('/service/:id', authMiddleware_1.authMiddleware, serviceRoute_1.default);
app.use('/service/:id', authMiddleware_1.authMiddleware, serviceRoute_1.default);
/*
*Handle all users routes
*/
app.use('/user/register', usersRoutes_1.default);
app.use('/users', usersRoutes_1.default);
app.use('/users/:id', authMiddleware_1.authMiddleware, usersRoutes_1.default);
app.use('/users/:id', authMiddleware_1.authMiddleware, usersRoutes_1.default);
app.use('/users/:id', authMiddleware_1.authMiddleware, usersRoutes_1.default);
/*
*Handle all the that get the authenicated user
*/
app.get('/authUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const Token = authHeader.split(' ')[1];
        if (Token) {
            jsonwebtoken_1.default.verify(Token, "secret", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.send("erro in auth");
                }
                else {
                    console.log(decodedToken);
                    const user_id = decodedToken.id;
                    const user = yield User_1.userModel.findById(user_id);
                    return res.send(user);
                }
            }));
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (_a) {
        return res.send("unauthorised");
    }
}));
/*
*Handle all the logout routes
*/
app.post('/userss/logins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let password = req.body.password;
    let email = req.body.email;
    //authenicate the user
    const authUser = yield login_1.Login.login(password, email);
    if (authUser) {
        //get the access token
        const token = userController_1.default.createToken(authUser._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: 86400000, sign: true });
        return res.status(200).send({
            status: 200,
            isAuth: true
        });
    }
}));
/*
*Handle all the logout routes
*/
app.get('/userss/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt', "", { httpOnly: false, maxAge: 1, sign: true });
    return res.send("logout");
}));
/*
*Handle all the external apis services routes
*/
app.use('/subscribe', serviceProvidersRoute_1.default);
/*
*Handle running the server using  port 3000 or Heroku assigned port
*/
const PORT = process.env.PORT || 3000;
console.log("new dot env file");
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
