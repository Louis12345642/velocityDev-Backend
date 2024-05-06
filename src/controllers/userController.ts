/*
Description: this controller contains all the crude functionality of the user

*/

import { promises } from "dns";
import { userModel } from "../model/User";

class userController {
  //create(): this function creates a new user in the database
  //@return json

  public static create(req: any, res: any) {
    let u = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    u.save();

    res.send(u);
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

}

export default userController;
