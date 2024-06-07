"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Description : This is the that handles the all the routes for the testimonial messages
*/
const express_1 = __importDefault(require("express"));
const TestimonialController_1 = require("../controllers/TestimonialController");
const testimonialRouter = express_1.default.Router();
//creating all the crude routes here
testimonialRouter.post('/', TestimonialController_1.TestimonialController.addTestimonial);
testimonialRouter.get('/', TestimonialController_1.TestimonialController.viewTestimonies);
testimonialRouter.delete('/:id', TestimonialController_1.TestimonialController.deleteTestimonies);
testimonialRouter.put('/:id', TestimonialController_1.TestimonialController.updateTestimonies);
exports.default = testimonialRouter;
