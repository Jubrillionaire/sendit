import express from 'express';
import parcelRoute from './parcel-routes';
import userRoute from './user-routes';

const app = express();

app.use('/', parcelRoute);
app.use('/', userRoute)

export default app; 