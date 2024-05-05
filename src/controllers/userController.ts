/*
Description: this controller contains all the crude functionality of the user

*/

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
}

export default userController;
