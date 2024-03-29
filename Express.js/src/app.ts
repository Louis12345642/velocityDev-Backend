import express from "express";
import Database from "./database/connection";
import { contactMessage } from "./model/ContactMessages";



//Database connections
const DB_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/school';
const conn = new Database(DB_url);
conn.Connect();


const message = contactMessage.Contact();


const t = new message({
    "title":"admin test",
    "message":"hello we are testing our backend service",
    "email":"mubaraklouis@gmail.com",
    "name": "mubarak kual louis"
})
t.save();






///create the database schema

///create the database schema

// const { Schema } = mongoose;
// const userSchame = new Schema({
//     "name": String,
//     "department": String,
//     "age": Number
// })
// //model the database 

// const userModel = mongoose.model("User", userSchame);


// //inserting data to the database 

// // userModel.insertMany([{"name":"ali","department":"IT","age":25},{"name":"Ahmad","department":"CS","age":34}]);
// const user = new userModel({ "name": "dev from the server", "department": "computer science", "age": 12 });
// //save t database
// user.save();
 




const app = express()
const PORT = process.env.PORT || 5000



/*
*Handle body parse express middleware
*/

// app.use(express.json);
// app.use(express.urlencoded({extended:true}));

//testing the first end point of express

app.get('/', (req, res) => {
    res.send("hello from express dev dev dev ");
})


app.listen(PORT, () => console.log(`App listening at port ${PORT}`))