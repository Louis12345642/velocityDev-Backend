import  Jwt  from "jsonwebtoken";

export function authMiddleware(req:any,res:any,next:any){
    //compare the token from the one you have

    const token = req.cookies.jwt;

    if(token){
        Jwt.verify(token,"secret" as string,(err:any,decodedToken:any)=>{
            if(err){
                res.send("erro in auth")
            }
            else{
                console.log(decodedToken)
                next()
            }

        })
    }
    else{
        res.status(401).json({message:"Unauthorized"})
    }
   


}