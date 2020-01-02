import express from "express";
import bodyParser from "body-parser";
import {createParcel, getAllParcels, getParcels, changeDestination, changeStatus, changeLocation, cancelParcel} from "../controllers/parcel-controller";
import {authorizeUser} from "../middlewares/middlewares"

const app = express()
app.use(bodyParser.json())


//Create a parcel delivery order
app.post("/parcels", authorizeUser, createParcel);

app.get("/parcels", authorizeUser, getParcels)

// Fetch all parcel delivery orders by a specific user 
app.get("/users/:userId/parcels", authorizeUser, getAllParcels);

//change destination of an order
app.patch("/parcels/destination", authorizeUser, changeDestination);

//change the status of an order 
app.patch("/parcels/status",authorizeUser, changeStatus);

//change the present location of an order
app.patch("/parcels/location", authorizeUser, changeLocation);

//cancel parcel 
app.patch("/parcels/cancel", authorizeUser, cancelParcel)


export default app;
