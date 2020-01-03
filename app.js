import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Client } from "pg";
import routes from "./routes";
const app = express();

var cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 3000;

dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/frontend"))

const client = new Client({
   connectionString: process.env.DATABASE_URL
 });
 
 global.client = client;
 
 client.connect()
 .then(() => {
 console.log("database connected!");
 
 //==============USERS TABLE=========================
     client.query(
       `CREATE TABLE IF NOT EXISTS users(
     id serial PRIMARY KEY,
     first_name VARCHAR NOT NULL,                  
     last_name VARCHAR NOT NULL,
     email VARCHAR UNIQUE NOT NULL,
     phone_no VARCHAR NOT NULL,
     password VARCHAR NOT NULL,
     role VARCHAR DEFAULT 'member'
    )`, 
       (err, res) => {
         if (err) {
           console.log(err);
         } else {
           console.log("users table created");

//============PARCELS TABLE===========================
           client.query(
             `CREATE TABLE IF NOT EXISTS parcels(
         id serial PRIMARY KEY,
         user_id INTEGER REFERENCES users(id),
         pickup_location VARCHAR NOT NULL,
         destination VARCHAR NOT NULL, 
         recipient_name VARCHAR NOT NULL,
         recipient_phone_no VARCHAR NOT NULL,
         status VARCHAR DEFAULT 'pending'
        )`,
             (err, res) => {
               if (err) {
                 console.log(err);
               } else {
                 console.log("parcels table created successfully");
               }
             }
           );
         }
       }
     );
   })
   .catch(err => {
     console.log("error connecting to Database", err);
   });

   app.use("/api/v1", routes);

app.listen(PORT, function(){
   console.log('server is running on port 3000!!!')
});

export default app;
