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



const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "b435b741c58ba5f0fbd1ce0553d08489-us17",
  server: "us17",
});

//sub info

const subscriberEmail =req.body.email

const subscribingUser = {
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: subscriberEmail
};

async function run() {

  const list ="c4fb834966"

  const response = await mailchimp.lists.addListMember(list,{
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });
}

run();


const responseData ={
  "message":"Successfully subscribed to our newsletter",
  "status":200
}

return res.send(responseData)

})




/*
*Handle running the server using  port 3000 or Heroku assigned port
*/

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))