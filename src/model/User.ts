
import mongoose from  'mongoose';
import bcrypt from "bcrypt";

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
        }).pre('save', async function(next:any){

            //create a salt for the password
            const salt = await bcrypt.genSalt(10);

            let unhashedPassword:any = this.password;
            //hash the password
            const hashedPassword:string = await bcrypt.hash(unhashedPassword,salt);
            //replace the password with the hashed password
            this.password = hashedPassword;

            next()

        })
    }
}




export const userModel = mongoose.model("userSchema",userSchema.userSchema());



