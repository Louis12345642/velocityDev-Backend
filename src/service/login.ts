
import bcypt from "bcrypt"
import { userModel } from "../model/User"
/*
description : this class handles the login LoginController
 methods: Login handle the login logic

 */



export class Login{

    public static async login(password:any,email:any){
     

        let user:any= await userModel.findOne({email});



          //login the user here
          const auth = await bcypt.compare(password,user.password);

          if(auth){
            return user;
          }
          else{

            //password is incorrect
           return "incorrect password"

          }


    }

}