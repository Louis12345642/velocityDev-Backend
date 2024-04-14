/*
* [] Description: This class is containers all the method for working with external services such as apis
* [] Method: subscribe()
* [] @return : void
* [] Date: 14/0/2024
*
* [] Author(s): mubarak kual louis
*
*
*/

import { Newsletter } from "../service/newsletter";

export class serviceProviderController{
 public static subscribe(req:any,res:any){
    Newsletter.subscribe(req.body.email,res)
 }
}