"use strict";
/*
Description: this is where all the crude operation of the testimonial operation are performed

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialController = void 0;
const Testimonial_1 = require("../model/Testimonial");
class TestimonialController {
    /*
  addTestimonial() : stores a single testimonial message information
  @return : void
 
*/
    static addTestimonial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //get the request data
            const testimonial = new Testimonial_1.TestimonialModel({
                "message": req.body.message,
                "Name": req.body.Name
            });
            testimonial.save();
            //return the response as json
            return res.send(testimonial);
        });
    }
    /*
viewTestimonies() : get all the testimonials from the database
@return : json
*/
    static viewTestimonies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //using the model find method to get all the data from the database
            let testitmonials = yield Testimonial_1.TestimonialModel.find({});
            return res.send(testitmonials);
        });
    }
    /*
deleteTestimonies() :delete a single testimonial
@return : json
*/
    static deleteTestimonies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //using the model to delete a testimonial
            let testimial_id = req.params.id;
            let testimonial = yield Testimonial_1.TestimonialModel.deleteOne({ _id: testimial_id });
            //return the response as json
            return res.send(testimonial);
        });
    }
    /*
updateTestimonies() :updates a single testimonial
@return : json
*/
    static updateTestimonies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //get the id of the testimonial
            let testimonial_id = req.params.id;
            let validated = {
                message: req.body.message,
                Name: req.body.Name
            };
            //call the model update method to update the testimonial
            let testimonial = yield Testimonial_1.TestimonialModel.findByIdAndUpdate(testimonial_id, validated);
            return res.send(testimonial);
        });
    }
}
exports.TestimonialController = TestimonialController;
