import express from 'express';
import sql from "mssql";
import 'dotenv/config';


const router = express.Router();

const dbconnstr = process.env.CONNECTION_STRING;


// GET all /api/activities
router.get('/', async (req, res) => {

    await sql.connect(dbconnstr)

    const result = await sql.query(

        `SELECT TOP 10 Act.[ActivityId], Act.[Title] AS "Activity Name", Act.[Description], Act.[ImageName],Act.[EventStart],Act.[EventEnd],
                Cat.[CategoryId], Cat.[Title] As "Category",
                Org.[OrganizerId], Org.[Name] As "Organizer"
         from [dbo].[Activity] Act
             INNER JOIN [dbo].[Category] Cat ON Act.[CategoryId] = Cat.[CategoryId]
             INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
         ORDER BY Act.[Created] DESC`
    )

    res.json(result.recordsets[0])
   // console.dir(result.recordsets)

})

//GET /api/activities/1
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    await sql.connect(dbconnstr)

    const result = await sql.query(

        `SELECT TOp 1 Act.[ActivityId], Act.[Title] AS "Activity Name", Act.[Description], Act.[ImageName],Act.[EventStart],Act.[EventEnd],
                Cat.[CategoryId], Cat.[Title] As "Category",
                Org.[OrganizerId], Org.[Name] As "Organizer"
         from [dbo].[Activity] Act
             INNER JOIN [dbo].[Category] Cat ON Act.[CategoryId] = Cat.[CategoryId]
             INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
        WHERE Act.[ActivityId] = ${id}`
    )


    if (result.recordsets[0].length === 0) {
        res.status(404).send("Activity not found")
    }
    else {
        res.json(result.recordsets[0])
    }

})

// GET all /api/activities/1/purchases
router.get('/:id/purchases', async (req, res) => {
    const id = req.params.id;
    
    await sql.connect(dbconnstr)
    
    const result = await sql.query(`SELECT * FROM [dbo].[Purchase] WHERE ActivityId = ${id}`)
    
    if (result.recordsets[0].length === 0){
        res.status(404).send("Activity not found")
    }
    else {
        res.send(result.recordsets[0])
    }
})


router.post('/', async (req, res) => {
    const event_id = req.body.eid.toString()
    const no_of_tickets = req.body.ntickets.toString()
    const email = req.body.email.toString()
    const ccx = req.body.ccexp.toString()
    const ccv = req.body.cccvv.toString()

    await sql.connect(dbconnstr)

    const result = await sql.query(
        `insert into dbo.[Purchase]  (NoOfTickets, CustomerEmail, CreditCardExp, CreditCardCvv, ActivityId)
        values (${no_of_tickets}, '${email}', '${ccx}', ${ccv}, ${event_id})`
    )

    console.log(result)
    // res.send("Success")
})

router.post('/purchase', async (req, res) => {
    const event_id = req.body.eid.toString()
    const no_of_tickets = req.body.ntickets.toString()
    const email = req.body.email.toString()
    const ccx = req.body.ccexp.toString()
    const ccv = req.body.cccvv.toString()

    await sql.connect(dbconnstr)

    const result = await sql.query(
        `insert into dbo.[Purchase]  (NoOfTickets, CustomerEmail, CreditCardExp, CreditCardCvv, ActivityId)
        values (${no_of_tickets}, '${email}', '${ccx}', ${ccv}, ${event_id})`
    )

    res.send({message: "Success", status: 200})
    console.log(result)
})


export default router;