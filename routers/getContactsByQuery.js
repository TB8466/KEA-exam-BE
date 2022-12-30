import { Client } from "@hubspot/api-client";
import * as dotenv from "dotenv"
import { Router } from "express";

const router = Router();
dotenv.config();
const hubspotClient = new Client({ "accessToken": process.env.ACCESS_TOKEN });

router.get("/contacts/:number", async (req, res) => {
  const PublicObjectSearchRequest = {
    "filterGroups":[{"filters":[{"value":`*${req.params.number}`,"propertyName":"phone","operator":"CONTAINS_TOKEN"}]}], 
    "sorts" : [
      {
        "propertyName" : "createdate",
        "direction" : "DESCENDING"
      }
    ], 
    "properties": ["firstname","lastname"],
    "limit": 10,
  };
  try {
    const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
    res.send(JSON.parse(JSON.stringify(apiResponse.results, null, 2)));
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
})





export default router;