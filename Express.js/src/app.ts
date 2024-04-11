import express from "express";
import Database from "./database/connection";
import contactRouter from "./routes/ContactRoute";
import nodemailer from "nodemailer";

import cors from "cors"
import testimonialRouter from "./routes/TestimonialRoute";
import serviceRouter from "./routes/serviceRoute";
const corsOptions = {
  origin: "http://127.0.0.1:5173",
};



/*
*initialing the main app
*/
const app = express()
app.use(cors(corsOptions));


//Database connections
const DB_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/velocityAdminDB';
const conn = new Database(DB_url);
conn.Connect();


/*
*Handle body parse express middleware
*/
app.use(express.json());


/*
*Handle all the contact routes
*/
app.use('/contact',contactRouter)
app.use('/contacts',contactRouter)
app.use('/contacts/:id',contactRouter)
app.use('/contacts/:id',contactRouter)


/*
*Handle all the testimonial routes
*/

app.use('/testimonial',testimonialRouter);
app.use('/testimonial/index',testimonialRouter);
app.use('/testimonial/:id',testimonialRouter);
app.use('/testimonial/:id',testimonialRouter);



/*
*Handle all the service routes
*/

app.use('/service',serviceRouter);
app.use('/services/index',serviceRouter);
app.use('/service/:id',serviceRouter);
app.use('/service/:id',serviceRouter);
app.use('/service/:id',serviceRouter)




//temp code working on the subcription functionality

app.post('/subscribe',(req:any,res:any)=>{

  res.send("a new subscriber");

})




/*
*Handle running the server using  port 3000 or Heroku assigned port
*/

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))