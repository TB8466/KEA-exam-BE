import { Client } from "@hubspot/api-client";
import * as dotenv from "dotenv"
import { Router } from "express";

const router = Router();
dotenv.config();
const hubspotClient = new Client({ "accessToken": process.env.ACCESS_TOKEN });




router.get('/ticket/:dealId', async(req, res) =>{

    const SimplePublicObjectInput = {
        properties : {
            "hs_pipeline": "0",
            "hs_pipeline_stage": "1",
            "hs_ticket_priority": "MEDIUM",
            "subject": "Test ticket"
        }
    }

    const createTicketResponse = await hubspotClient.crm.tickets.basicApi.create(SimplePublicObjectInput)

    //Associate
    const BatchInputPublicAssociation = { 
        "from":{"id":`${createTicketResponse.id}`},"to":{"id":`${req.params.dealId}`},"type":"ticket_to_deal"
    };
    console.log("BatchInput :",BatchInputPublicAssociation.from.id,BatchInputPublicAssociation.to.id);
    console.log("Ticket id :", createTicketResponse.id,"Deal id :",req.params.dealId);
    const fromObjectType = "tickets";
    const toObjectType = "deals";
    try {
        const apiResponse = await hubspotClient.crm.associations.batchApi.create(fromObjectType, toObjectType, BatchInputPublicAssociation);
        res.send(JSON.stringify(apiResponse, null, 2));
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
  })

export default router;