/*
* [] Description: This class is a service that allows the use of mailchimp news letter subscription 
* [] Method: subscribe()
* [] @params : $email
* [] @return : void
* [] Date: 14/0/2024
*
* [] Author(s): mubarak kual louis
*
*
*/
const mailchimp = require("@mailchimp/mailchimp_marketing");

export class Newsletter{

    public static  subscribe(email:string,res:any){

      

        let errors:any = [];
      
        //initialize mailchimp
      
      
        mailchimp.setConfig({
          apiKey:process.env.MAIL_CHIMP_API_KEY,
          server: "us17",
        });
      
      
        //sub info
      
        const subscriberEmail = email
      
      
        //validate the request
      
        if (!subscriberEmail) {
          errors.push({
            message: "Email is required"
          });
        }
      
        const subscribingUser = {
          email: subscriberEmail
        };
      
      
        async function run() {
          const list_id = process.env.MAIL_CHIMP_API_LIST_ID;
            const response = await mailchimp.lists.addListMember(list_id, {
              email_address: subscribingUser.email,
              status: "subscribed",
              merge_fields: {
                FNAME: email,
                LNAME: email
      
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
          return res.send(errors);
        }
    }
}