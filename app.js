import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
//Routers
import getContacts from "./routers/getContactsByQuery.js";
import getDeals from "./routers/getDealsByContactId.js";
import createTicket from "./routers/createTicket.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080 || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(getContacts, getDeals, createTicket);


app.listen(PORT, () => {
    console.log("Server is running on PORT:",PORT);
});