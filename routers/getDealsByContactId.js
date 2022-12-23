import { Client } from "@hubspot/api-client";
import * as dotenv from "dotenv"
import { Router } from "express";

const router = Router();
dotenv.config();
const hubspotClient = new Client({ "accessToken": process.env.ACCESS_TOKEN });

router.get("/deals/:contactId", async (req, res) => {
    const BatchInputPublicObjectId = { inputs: [{"id":`${req.params.contactId}`}] };
    const fromObjectType = "contacts";
    const toObjectType = "deal";

    try {
        const apiResponse = await hubspotClient.crm.associations.batchApi.read(fromObjectType, toObjectType, BatchInputPublicObjectId);
        res.send((JSON.parse(JSON.stringify(apiResponse, null, 2))));
    } catch (e) {
        e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
})

export default router;