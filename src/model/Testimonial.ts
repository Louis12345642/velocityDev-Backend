/*
Description: this class is where a schema and the model for the testimonial messages are build
Testimonial(): this is the schema method of the testimonial

*/

import mongoose, { Schema } from "mongoose";

class Testimonial{

    public static Testimonial()
    {
        //creating the schema for the testimonial 
      return  new Schema({
          "message":String,
            "Name":String,

        });
    }

}
//exporting the model for the testimonial

 export const TestimonialModel = mongoose.model("TestimonialModel",Testimonial.Testimonial())
