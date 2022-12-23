import express from "express"
import cors from "cors"
import getContacts from "./routers/getContacts.js";
import * as dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080 || 3000

app.use(cors())

app.use(getContacts);

app.listen(PORT, () => {
    console.log("Server is running on PORT:",PORT);
});