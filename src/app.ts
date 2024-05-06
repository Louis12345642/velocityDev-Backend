import express from "express";
import Database from "./database/connection";
import contactRouter from "./routes/ContactRoute";
require("dotenv").config();

import testimonialRouter from "./routes/TestimonialRoute";
import serviceRouter from "./routes/serviceRoute";
import serviceProviderRouter from "./routes/serviceProvidersRoute";
import cors from 'cors'; 
import userRouter from "./routes/usersRoutes";



/*
*initialing the main app
*/
const app = express()


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

app.use('/contact', contactRouter)
app.use('/contacts', contactRouter)
app.use('/contacts/:id', contactRouter)
app.use('/contacts/:id', contactRouter)


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

app.use('/service', serviceRouter);
app.use('/services/index', serviceRouter);
app.use('/service/:id', serviceRouter);
app.use('/service/:id', serviceRouter);
app.use('/service/:id', serviceRouter)


/*
*Handle all users routes
*/
app.use('/user/register', userRouter);
app.use('/users',userRouter)
app.use('/users/:id',userRouter)
app.use('/users/:id',userRouter)


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