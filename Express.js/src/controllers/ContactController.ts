import { ContactModel } from "../model/ContactMessages";

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
        return res.json(contactMsg);
    }
    /*
  index() : gets all the contact messages saved in the database
  @return : json
  @params : null
 
*/
    public static async index(req: any, res: any) {
       const contacts =  await ContactModel.find({});
        return res.json(contacts); 

    }

}