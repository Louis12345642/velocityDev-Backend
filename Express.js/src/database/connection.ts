import mongoose from "mongoose"


/*method: 

[]connect()=> this method is used to connect to database
[] 
*/

class Database {
    //creating a connection constructor
    private dbUrl: string;

    constructor(dbUrl: string) {
        this.dbUrl = dbUrl;

    }

    //creating the connect method

    public Connect() {


        try {
            mongoose.connect(this.dbUrl)
            console.log("connected successfully");
        }
        catch (error:any) {
            console.log(error.message);

        }
    }

}

export default Database;
