import { ContactModel } from "../model/ContactMessages";
import { sendContactEmail } from "../service/sendContactEmail";

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
    //sending an alert email to the user 
  sendContactEmail.sendEmail(req,res);
    contactMsg.save();
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

