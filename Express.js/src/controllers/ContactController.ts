import { ContactModel } from "../model/ContactMessages";
import nodemailer from "nodemailer"; 

/*
  this class is where all the crude operation related to contact are set

*/

export class ContactController {
  /*
    store() : stores contact information
    @return : void
    @params : message:object
 
 */

  public static async store(req: any, res: any): Promise<String> {

    const contactMsg = await new ContactModel({
      "title": req.body.title,
      "message": req.body.message,
      "email": req.body.email,
      "name": req.body.name
    });

    console.log(req.body)
    contactMsg.save();



    const output =`
    <h1>New email from ${req.body.name}</h1>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    </ul>
    <p>${req.body.message}</p>`
        //nodemailer code 
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "luismubarak@gmail.com",
        pass: "zclj zyzl jiyd nuuq",
      },
    });
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `Mubarak Louis 👻 <luismubarak@gmail.com>`, // sender address
        to: req.body.email, // list of receivers
        subject: `Hello ${req.body.name}: Your message has been received`, // Subject line
        text: req.body.message, // plain text body
        html: `<b>Thank you ${req.body.name} for contacting velocityDev we are so thrilled to work with you</b>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
    
    


    return res.json(contactMsg);
  }
  /*
index() : gets all the contact messages saved in the database
@return : json
@params : null
 
*/
  public static async index(req: any, res: any) {
    const contacts = await ContactModel.find({});
    return res.json(contacts);

  }


  /*
  update() : update a single contact messages saved in the database
  @return : json
  @params : contact_id
   */

  public static async update(req: any, res: any) {

    const validated = { "title": req.body.title, "body": req.body.message, "email": req.body.email, "name": req.body.name }
    //find the contact using the id
    let contact_id: number = req.params.id;
    //get the data to be saved
    let contacts = await ContactModel.findByIdAndUpdate(contact_id,validated);

    //update the contact with the data given
    return res.send(contacts);
  }

  
  /*
  delete() : deletes a contact from the database
  @return : json
  @params : request and response
   */

  public static async delete(req:any,res:any){
    //get the contact id
    let contact_id = req.params.id;

    let contact = await ContactModel.deleteOne({ _id: contact_id });
    return res.send(contact);
  }

}

