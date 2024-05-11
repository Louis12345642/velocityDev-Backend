/*
Description: this controller contains all the crude functionality of the user

*/

import { promises } from "dns";
import { userModel } from "../model/User";
import cookParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { Login } from "../service/login";

class userController {
  //create(): this function creates a new user in the database
  //@return json


  //creating a token before the user is being saved in the database
  public static createToken(id:any){
    const token = jwt.sign({id},"secret",{
      expiresIn: 86400
    })

    return token

  }

  public static create(req: any, res: any) {
    let u = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    //create a cookie and send it as response on the browser

    const token = userController.createToken(u._id)
  
    res.cookie('jwt',token,{httpOnly:true ,maxAge:86400000})

    u.save();
   return res.status(201).json(u);
  }



  public static async index(req: any, res: any) {
   const users =  await  userModel.find({})
    return res.send(users);
  }

  //creating a function to delete the user
  public static async destroy(req:any,res:any):Promise<void>{
    let user_id = req.params.id;
    const user = await userModel.findByIdAndDelete(user_id)
    return res.send(user)
  }



  public static async getUserById(req:any,res:any){
    let user_id = req.params.id;
    let user = await userModel.findById(user_id);
    return res.send(user);
}



    /*
    Description: updates a single service
    @return: json response of the entry
    */

    public static async updateUser(req:any,res:any) {
      //Get the service id  from params

      let user_id = req.params.id;
      //get the service data to be updated
      const validated ={
          "name":req.body.name,
          "email":req.body.email,
          "password":req.body.password
      }

      //update the record in the database
      const user = await userModel.findByIdAndUpdate(user_id,validated);

      return res.send(user);
  }

}

export default userController;
