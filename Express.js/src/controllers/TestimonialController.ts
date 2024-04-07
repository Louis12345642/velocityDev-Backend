
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

        return res.json(testimonial);

    }

}