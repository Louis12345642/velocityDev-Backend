import express from "express";
import Database from "./database/connection";
import contactRouter from "./routes/ContactRoute";



/*
*initialing the main app
*/
const app = express()


//Database connections
const DB_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/school';
const conn = new Database(DB_url);
conn.Connect();


/*
*Handle body parse express middleware
*/
app.use(express.json());


/*
*Handle all the contact routes
*/
app.use('/contact',contactRouter)
app.use('/contacts',contactRouter)

/*

*Handle running the server using  port 3000 or Heroku assigned port
*/
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App listening at port ${PORT}`))