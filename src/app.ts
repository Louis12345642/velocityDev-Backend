import express from "express";
import Database from "./database/connection";
import contactRouter from "./routes/ContactRoute";
require("dotenv").config();

import testimonialRouter from "./routes/TestimonialRoute";
import serviceRouter from "./routes/serviceRoute";
import serviceProviderRouter from "./routes/serviceProvidersRoute";
import cors from 'cors'; 
import userRouter from "./routes/usersRoutes";
import cookieParser from "cookie-parser";
import { Login } from "./service/login";
import userController from "./controllers/userController";
import { authMiddleware } from "./middleware/authMiddleware";
import { sign } from "crypto";
import { checkAuthUser } from "./middleware/checkAuthUser";
import { userModel } from "./model/User";
import  Jwt  from "jsonwebtoken";


/*
*initialing the main app
*/
const app = express()
app.use(cookieParser())

app.use(cors(
  {
 
  }
));


//Database connections
const DB_url:any= process.env.DB_URL;
const conn = new Database(DB_url);
conn.Connect();


/*
*Handle body parse express middleware
*/
app.use(express.json());


/*
*Handle all the contact routes
*/

app.use('/contact', contactRouter)
app.use('/contacts',contactRouter)
app.use('/contacts/:id',authMiddleware, contactRouter)
app.use('/contacts/:id',authMiddleware, contactRouter)


/*
*Handle all the testimonial routes
*/

app.use('/testimonial', testimonialRouter);
app.use('/testimonial/index', testimonialRouter);
app.use('/testimonial/:id', testimonialRouter);
app.use('/testimonial/:id', testimonialRouter);



/*
*Handle all the service routes
*/

app.use('/service',authMiddleware,serviceRouter);
app.use('/services/index', serviceRouter);
app.use('/service/:id', authMiddleware,serviceRouter);
app.use('/service/:id',authMiddleware, serviceRouter);
app.use('/service/:id', authMiddleware,serviceRouter)


/*
*Handle all users routes
*/

app.use('/user/register',userRouter);
app.use('/users',userRouter)
app.use('/users/:id',authMiddleware,userRouter)
app.use('/users/:id',authMiddleware,userRouter)
app.use('/users/:id',authMiddleware,userRouter)





/*  
*Handle all the that get the authenicated user
*/
app.get('/authUser', async (req:any,res:any)=>{

  try
{
  const authHeader = req.headers.authorization;
  const Token = authHeader.split(' ')[1];


  if( Token){
    Jwt.verify(Token,"secret" as string,async (err:any,decodedToken:any)=>{
        if(err){
            res.send("erro in auth")
        }
        else{
            console.log(decodedToken);
            const user_id = decodedToken.id
            const user =  await userModel.findById(user_id);
        
            return  res.send(user);
          
        }
    })
}

else{
  return  res.status(401).json({message:"Unauthorized"})

}
}
catch{
  return res.send("unauthorised");
}

});


/*  
*Handle all the logout routes
*/
app.post('/userss/logins',async (req:any,res:any)=>{



    let password = req.body.password;
    let email = req.body.email;




  //authenicate the user
  const authUser = await Login.login(password,email);
  if(authUser){
       //get the access token
  const token = userController.createToken(authUser._id)

    res.cookie('jwt',token,{httpOnly:false ,maxAge:86400000,sign:true})
    return res.status(200).send({
     status:200,
     isAuth:true
    });
  }
})

/*  
*Handle all the logout routes
*/
app.get('/userss/logout',async (req:any,res:any)=>{
 res.cookie('jwt',"",{httpOnly:false ,maxAge:1,sign:true})
 return res.send("logout");
 

})

/*  
*Handle all the external apis services routes
*/

app.use('/subscribe',serviceProviderRouter)

/*
*Handle running the server using  port 3000 or Heroku assigned port
*/

const PORT = process.env.PORT || 3000;
console.log("new dot env file");
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))