import { Schema } from 'inspector';
import mongoose from  'mongoose';

/*
method: 
  [] contactMessageSchema() : this method is responsible for creating the database schema

*/

export class contactMessage
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


    public static Contact():any
    {
        //creating the model
        return mongoose.model("Contact",this.contactMessageSchema());

    }

}

