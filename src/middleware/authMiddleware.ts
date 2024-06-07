import  Jwt  from "jsonwebtoken";
import { userModel } from "../model/User";

export function authMiddleware(req:any,res:any,next:any){
    //compare the token from the one you have

    // const token = req.cookies.jwt;

    const authHeader = req.headers.authorization;


    const Token = authHeader.split(' ')[1];

    if( Token){
        Jwt.verify(Token,"secret" as string,(err:any,decodedToken:any)=>{
            if(err){
                res.send("erro in auth")
            }
            else{
                console.log(decodedToken);
                // const user = userModel.findById({decodedToken})

                next()
            }
        })
    }
    else{
        res.status(401).json({message:"Unauthorized"})
    }
   
}