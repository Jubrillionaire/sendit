import express from "express";
import bodyParser from "body-parser";
import {createParcel, getAllParcels,  changeDestination, changeStatus, changeLocation, cancelParcel} from "../controllers/parcel-controller";
const app = express();      
import {authorizeUser} from "../middlewares/middlewares"



//Create a parcel delivery order
app.post("/parcels", authorizeUser, createParcel);

// Fetch all parcel delivery orders by a specific user 
app.get("/users/:userId/parcels", authorizeUser, getAllParcels);

//change destination of an order
app.patch("/parcels/destination", authorizeUser, changeDestination);

//change the status of an order 
app.patch("/parcels/status", authorizeUser, changeStatus);

//change the present location of an order
app.patch("/parcels/presentLocation", authorizeUser, changeLocation);

//cancel parcel 
app.patch("/parcels/cancel", authorizeUser, cancelParcel)


export default app;
