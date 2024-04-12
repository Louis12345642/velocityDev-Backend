
import mongoose from  'mongoose';

/*
method: 
  [] contactMessageSchema() : this method is responsible for creating the database schema

*/

class contactMessage
{
    public static  contactMessageSchema():any{
       return new  mongoose.Schema({
            "title":String,
            "message":String,
            "email":String,
            "name": String
        })
    }

    //creating the model function


}

    //creating the model
export const ContactModel = mongoose.model("Contact",contactMessage.contactMessageSchema());


