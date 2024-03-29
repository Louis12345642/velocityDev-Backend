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

    public static store(req: any, res: any): String {
       
        const contactMsg = new ContactModel({
            "title": req.body.title,
            "message": req.body.message,
            "email": req.body.email,
            "name": req.body.name
        });
        
        console.log(req.body)
        contactMsg.save();
        return res.json(contactMsg);
    }
}