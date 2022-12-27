import { Client } from "@hubspot/api-client";
import * as dotenv from "dotenv"
import { Router } from "express";

const router = Router();
dotenv.config();
const hubspotClient = new Client({ "accessToken": process.env.ACCESS_TOKEN });

async function createTicket(name, desc, serial){
    const SimplePublicObjectInput = {
        properties : {
            "hs_pipeline": "0",
            "hs_pipeline_stage": "1",
            "hs_ticket_priority": "MEDIUM",
            "subject": `${name}`,
            "content": `${desc}`,
            "serial_number": `${serial}`
        }
    }
    const createTicketResponse = await hubspotClient.crm.tickets.basicApi.create(SimplePublicObjectInput);
    //console.log("Ticket created with id:",createTicketResponse.id);
    return createTicketResponse;
}

async function associateWithDeal(ticketId, dealId){
    const AssociationSpec = [
        {
          "associationCategory": "HUBSPOT_DEFINED",
          "associationTypeId": 28
        }
    ];

    try {
        const apiResponse = await hubspotClient.crm.tickets.associationsApi.create(ticketId, "deal", dealId, AssociationSpec);
        //console.log(JSON.stringify(apiResponse, null, 2));
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
}

router.post('/ticket', async(req,res) => {
    console.log("Incoming ticketRequest:",req.body);
    const ticketResponse = await createTicket(req.body.name,req.body.description,req.body.serialNumber);
    await associateWithDeal(ticketResponse.id, req.body.dealId)
    res.send(true)
})

export default router;