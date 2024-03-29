import express from "express";
import Database from "./database/connection";
import contactRouter from "./routes/ContactRoute";



//Database connections
const DB_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/school';
const conn = new Database(DB_url);
conn.Connect();




const app = express()
const PORT = process.env.PORT || 5000



/*
*Handle body parse express middleware
*/

app.use(express.json());


app.use('/contact',contactRouter)
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))