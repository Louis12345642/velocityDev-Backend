import express from "express";
import Database from "./database/connection";
import contactRouter from "./routes/ContactRoute";
require("dotenv").config();

import testimonialRouter from "./routes/TestimonialRoute";
import serviceRouter from "./routes/serviceRoute";



/*
*initialing the main app
*/
const app = express()

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




//temp code working on the subcription functionality

app.post('/subscribe', (req: any, res: any) => {



  const mailchimp = require("@mailchimp/mailchimp_marketing");

  let errors:any = [];

  //initialize mailchimp


  mailchimp.setConfig({
    apiKey:process.env.MAIL_CHIMP_API_KEY,
    server: "us17",
  });


  //sub info

  const subscriberEmail = req.body.email


  //validate the request

  if (!subscriberEmail) {
    errors.push({
      message: "Email is required"
    });
  }

  const subscribingUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: subscriberEmail
  };


  async function run() {




    const list_id = process.env.MAIL_CHIMP_API_LIST_ID;



      const response = await mailchimp.lists.addListMember(list_id, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName

        }
      });
  }


  try{

    
    const responseData = {
      "message": "Successfully subscribed to our newsletter",
      "status": 200
    }


    run();
    return res.send(responseData);
  }
  catch(err){

    errors.push(
      {
        "message": " server Error subscribing to newsletter"
      }
    )

    if(errors.length > 0)
    return res.send(errors)
  }


})



/*
*Handle running the server using  port 3000 or Heroku assigned port
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))