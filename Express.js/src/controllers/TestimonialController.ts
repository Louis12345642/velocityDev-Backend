
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
                "message": req.body.message,
                "Name": req.body.Name
            }
        )
        testimonial.save();
        //return the response as json

        return res.send(testimonial);

    }

    /*
viewTestimonies() : get all the testimonials from the database
@return : json
*/

    public static async viewTestimonies(req: any, res: any) {
        //using the model find method to get all the data from the database
        let testitmonials = await TestimonialModel.find({});
        return res.send(testitmonials);
    }

    /*
deleteTestimonies() :delete a single testimonial
@return : json
*/

    public static async deleteTestimonies(req: any, res: any) {

        //using the model to delete a testimonial

        let testimial_id = req.params.id;
        let testimonial = await TestimonialModel.deleteOne({ _id: testimial_id });
        //return the response as json
        return res.send(testimonial);

    }

    /*
updateTestimonies() :updates a single testimonial
@return : json
*/

public static async updateTestimonies(req:any,res:any){

    //get the id of the testimonial

    let testimonial_id = req.params.id;
    let validated = {
        message : req.body.message,
        Name : req.body.Name
    }

    //call the model update method to update the testimonial
    let testimonial = await  TestimonialModel.findByIdAndUpdate(testimonial_id,validated)
   return  res.send(testimonial);
}
}
