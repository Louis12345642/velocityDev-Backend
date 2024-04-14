/*
* [] Description: This class is contains all the methods for sending contact emails after the user fills the contact me form
* [] Method: sendEmail()
* [] @return : void
* [] Date: 14/0/2024
*
* [] Author(s): mubarak kual louis
*
*
*/
import nodemailer from "nodemailer";



export class sendContactEmail {
    public static sendEmail(req: any, res: any) {

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

        }
        //calling the main fucntion

        main().catch(console.error);

    }
}