import { Client } from "@hubspot/api-client";
import * as dotenv from "dotenv"
dotenv.config()
const hubspotClient = new Client({ "accessToken": process.env.ACCESS_TOKEN });


  const PublicObjectSearchRequest = {
    "filterGroups":[{"filters":[{"value":"*2222","propertyName":"phone","operator":"CONTAINS_TOKEN"}]}], 
    "sorts" : [
     {
       "propertyName" : "createdate",
       "direction" : "DESCENDING"
     }
   ], 
   "properties": ["firstname","lastname","phone", "email"],
   "limit": 10,
 };


 export default async function getContactsByQuery() {
  try {
    const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
      
      return JSON.parse(JSON.stringify(apiResponse.results, null, 2));
    
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}