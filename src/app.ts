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


/*
*initialing the main app
*/
const app = express()
app.use(cookieParser())

app.use(cors());


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

app.use('/contact',authMiddleware, contactRouter)
app.use('/contacts', authMiddleware,contactRouter)
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

app.use('/user/register',authMiddleware, userRouter);
app.use('/users',authMiddleware,userRouter)
app.use('/users/:id',authMiddleware,userRouter)
app.use('/users/:id',authMiddleware,userRouter)
app.use('/users/:id',authMiddleware,userRouter)




app.post('/userss/logins',async (req:any,res:any)=>{

    let password = req.body.password;
    let email = req.body.email;


   const authUser = await Login.login(password,email);
   if(authUser){
        //get the access token
   const token = userController.createToken(authUser._id)

     //  res.send(authUser);
     res.cookie('jwt',token,{httpOnly:false ,maxAge:86400000,sign:true})
     return res.status(200).send("login successful");
   }
   else{
    return res.status(401).send("invalid authenication");
   }

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