
/*
Description: this is where all the crude operation of the testimonial operation are performed


*/

import { TestimonialModel } from "../model/Testimonial";


export class TestimonialController {



      /*
    addTestimonial() : stores a single testimonial message information
    @return : void
 
 */

    public static async addTestimonial(req: any, res: any) {

        //get the request data
        const testimonial = new TestimonialModel(
            {
                "message":req.body.message,
                "Name": req.body.Name
            }
        )
        testimonial.save();
        //return the response as json

        return res.send(testimonial);

    }

        /*
    viewTestimonies() : get all the testimonials from the database
    @return : void
 */

    public static async viewTestimonies(req:any ,res:any)
    {
        //using the model find method to get all the data from the database
        let testitmonials = await  TestimonialModel.find({});
        return  res.send(testitmonials);
    }




}