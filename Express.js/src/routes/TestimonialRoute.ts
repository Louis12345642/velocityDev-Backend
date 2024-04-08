
/*
Description : This is the that handles the all the routes for the testimonial messages
*/
import express from 'express'
import { TestimonialController } from '../controllers/TestimonialController';
const testimonialRouter  = express.Router();

//creating all the crude routes here
testimonialRouter.post('/', TestimonialController.addTestimonial);
testimonialRouter.get('/',TestimonialController.viewTestimonies);
testimonialRouter.delete('/:id',TestimonialController.deleteTestimonies);


export default testimonialRouter;



