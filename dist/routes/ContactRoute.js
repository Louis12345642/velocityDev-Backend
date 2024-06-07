"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactRouter = express_1.default.Router();
const ContactController_1 = require("../controllers/ContactController");
contactRouter.post('/', ContactController_1.ContactController.store);
contactRouter.get('/', ContactController_1.ContactController.index);
contactRouter.put('/:id', ContactController_1.ContactController.update);
contactRouter.delete('/:id', ContactController_1.ContactController.delete);
exports.default = contactRouter;
