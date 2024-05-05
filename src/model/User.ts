
import mongoose from  'mongoose';

/*
method: 
  [] userSchema() : this method is responsible for creating the database schema for a user

*/

class userSchema
{
    public static  userSchema():any{
       return new  mongoose.Schema({
            "name":String,
            "email":String,
            "password":String
        })
    }

}

    //creating the model
export const userModel = mongoose.model("userSchema",userSchema.userSchema());


