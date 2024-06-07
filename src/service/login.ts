
import bcypt from "bcrypt"
import { userModel } from "../model/User"
import {errors} from "../database/errors";
/*
description : this class handles the login LoginController
 methods: Login handle the login logic

 */



export class Login{

    public static async login(password:any,email:any){


      try{
        //find the user in the database
        let user:any= await userModel.findOne({email});
        //if the user exists login compare the password
        const auth = await bcypt.compare(password,user.password);
        
          //login the user here
     

          if(auth){
            return user;
          }
          else{

            //password is incorrect
           return errors.push({message:"invalid password"})

          }

      }
     catch{
      //user not found
      errors.push({message:"user not found"})
     }

    }

}