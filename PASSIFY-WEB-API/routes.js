import express from 'express';
import sql from "mssql";
import 'dotenv/config';


const router = express.Router();

const dbconnstr = process.env.CONNECTION_STRING;


// GET all /api/activities
router.get('/', async (req, res) => {

    await sql.connect(dbconnstr)

    const result = await sql.query(
        `
            SELECT Act.[ActivityId], Act.[Title] AS "ActivityName", Act.[Description], Act.[ImageName], 
                FORMAT(Act.[EventStart], 'dd, MMMM yyy - HH:mm') as 'EventStart',
                FORMAT(Act.[EventEnd], 'dd, MMMM yyy - HH:mm') as EventEnd,   
                Cat.[CategoryId], Cat.[Title] As "Category",
                Org.[OrganizerId], Org.[Name]  As "Organizer"
            from [dbo].[Activity] Act
                INNER JOIN [dbo].[Category] Cat
            ON Act.[CategoryId] = Cat.[CategoryId]
                INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
            WHERE ACT.[ImageName] != ' '
            ORDER BY Act.[EventStart] Asc`
    )

    res.json(result.recordsets[0])
    // console.dir(result.recordsets)

})


//GET n Amouunt of activities
router.get('/next', async (req, res) => {
    const n = parseInt(req.query.n, 10);

    await sql.connect(dbconnstr)

    const result = await sql.query(
        `SELECT TOP            ${n} Act.[ActivityId], Act.[Title] AS "ActivityName",
                Act.[Description],
                Act.[ImageName],
                Act.[EventStart],
                Act.[EventEnd],
                Cat.[CategoryId],
                Cat.[Title] As "Category",
                Org.[OrganizerId],
                Org.[Name]  As "Organizer"
         from [dbo].[Activity] Act
             INNER JOIN [dbo].[Category] Cat
         ON Act.[CategoryId] = Cat.[CategoryId]
             INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
         ORDER BY Act.[Created] DESC`
    )

    res.json(result.recordsets[0]);

})

//GET ACTIVITES WITHIN A SPECIFIC TIME FRAME
router.get('/time', async (req, res) => {
    const paramsLength = Object.keys(req.query).length;
    const fromDate2 = new Date().toLocaleDateString();


    // Return 400 Bad Request if no parameters supplied
    if (paramsLength === 0) {
        res.status(400).send("No parameters supplied")
        return;
    }

    // Logic if one parameter supplied
    if (paramsLength === 1) {
        await sql.connect(dbconnstr)

        let result;

        //If parameter is "from" return all activities after supplied date
        if (req.query.from) {
            const fromDate = req.query.from;


            result = await sql.query(
                `SELECT Act.[ActivityId],
                        Act.[Title] AS "ActivityName",
                        Act.[Description],
                        Act.[ImageName],
                        Act.[EventStart],
                        Act.[EventEnd],
                        Cat.[CategoryId],
                        Cat.[Title] As "Category",
                        Org.[OrganizerId],
                        Org.[Name]  As "Organizer"
                 from [dbo].[Activity] Act
                     INNER JOIN [dbo].[Category] Cat
                 ON Act.[CategoryId] = Cat.[CategoryId]
                     INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
                 WHERE Act.[EventStart] > '${fromDate2}'`
            )
        }

        //If parameter is "before" return all activities before supplied date
        if (req.query.before) {
            result = await sql.query(
                `SELECT Act.[ActivityId],
                        Act.[Title] AS "ActivityName",
                        Act.[Description],
                        Act.[ImageName],
                        Act.[EventStart],
                        Act.[EventEnd],
                        Cat.[CategoryId],
                        Cat.[Title] As "Category",
                        Org.[OrganizerId],
                        Org.[Name]  As "Organizer"
                 from [dbo].[Activity] Act
                     INNER JOIN [dbo].[Category] Cat
                 ON Act.[CategoryId] = Cat.[CategoryId]
                     INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
                 WHERE Act.[EventStart] < '2025-11-01'`
            )
        }

        //If parameter is "before" return all activities before supplied date
        if (req.query.on) {
            result = await sql.query(
                `SELECT Act.[ActivityId],
                        Act.[Title] AS "ActivityName",
                        Act.[Description],
                        Act.[ImageName],
                        Act.[EventStart],
                        Act.[EventEnd],
                        Cat.[CategoryId],
                        Cat.[Title] As "Category",
                        Org.[OrganizerId],
                        Org.[Name]  As "Organizer"
                 from [dbo].[Activity] Act
                     INNER JOIN [dbo].[Category] Cat
                 ON Act.[CategoryId] = Cat.[CategoryId]
                     INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
                 WHERE Act.[EventStart] = '2025-11-01'`
            )
        }

        if (result.recordsets[0].length === 0) {
            res.status(404).send("No activities found")
            return;
        }

        res.json(result.recordsets[0]);
    }

    if (paramsLength > 1) {

    }
    // await sql.connect(dbconnstr)
    //
    // const result = await sql.query(
    //     ``
    // )
    //
    // res.json(result.recordsets[0]);
    // if(req.query){}
    // res.redirect("/")

})


//GET ACTIVITIES BY SEARCHPARAM (FUZZY SEARCH)
router.get('/search', async (req, res) => {

    const searchParam = req.query.event_name;

    if (searchParam.length < 3) {
        res.status(400)
            .send({ message: "Search parameter must be at least 3 characters long"})
    }
    else {
        await sql.connect(dbconnstr)

        const result = await sql.query(
            `
                SELECT Act.[ActivityId], Act.[Title] AS "ActivityName", Act.[Description], Act.[ImageName]
                from [dbo].[Activity] as Act
                WHERE ACT.[Title] LIKE '%${searchParam}%'
                ORDER BY Act.[EventStart] Asc`
        )

        if (result.recordsets[0].length < 1) {
            res.status(404)
                .send({message: "No activities found"})
        }
        else {
            res.json(result.recordsets[0])
        }

        console.dir(result.recordsets[0])
    }
    // console.log(req.query.search)

})

//GET ACTIVITIES For ticket data ()
router.get('/createticket', async (req, res) => {

    const searchParam = req.query.event_id;
    await sql.connect(dbconnstr)

    const result = await sql.query(
        `
            SELECT Act.[ActivityId],
                    Act.[Title] AS "ActivityName",
                   Act.[Description],
                   Act.[ImageName],
                   FORMAT(Act.[EventStart], 'MMM dd yyy - HH:mm') as EventStart,
                FORMAT(Act.[EventEnd], 'MMM dd yyy - HH:mm') as EventEnd
            from [dbo].[Activity] as Act
            WHERE ACT.[ActivityId] = '${searchParam}'
            ORDER BY Act.[EventStart] Asc`
    )

    if (result.recordsets[0].length < 1) {
        res.status(404)
            .send({message: "No activities found"})
    }
    else {
        res.send({message: "Success", status: 200, result: result.recordsets[0][0]})
        // res.json(result.recordsets[0][0])
        console.log(result.recordsets[0][0])
    }

    // console.log(req.query.event_id)

})
//GET /api/activities/1
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    await sql.connect(dbconnstr)

    const result = await sql.query(
        `SELECT TOp 1 Act.[ActivityId], Act.[Title] AS "ActivityName", Act.[Description], Act.[ImageName], FORMAT(Act.[EventStart], 'dd, MMMM yyy - HH:mm') as 'EventStart',
        FORMAT(Act.[EventEnd], 'dd, MMMM yyy - HH:mm')as EventEnd,
                Cat.[CategoryId], Cat.[Title] As "Category",
                Org.[OrganizerId], Org.[Name]  As "Organizer"
        from [dbo].[Activity] Act
             INNER JOIN [dbo].[Category] Cat ON Act.[CategoryId] = Cat.[CategoryId]
             INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
         WHERE Act.[ActivityId] = ${id}`
    )


    if (result.recordsets[0].length === 0) {
        res.status(404)
            .send("Activity not found")
    } else {
        res.json(result.recordsets[0][0])
    }

})

// GET all /api/activities/1/purchases
router.get('/:id/purchases', async (req, res) => {
    const id = req.params.id;

    await sql.connect(dbconnstr)

    const result = await sql.query(`SELECT *
                                    FROM [dbo].[Purchase]
                                    WHERE ActivityId = ${id}`)

    if (result.recordsets[0].length === 0) {
        res.status(404)
            .send("Activity not found")
    } else {
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
        `insert into dbo.[Purchase] (NoOfTickets, CustomerEmail, CreditCardExp, CreditCardCvv, ActivityId)
         values (${no_of_tickets}, '${email}', '${ccx}', ${ccv}, ${event_id})`
    )

    res.send("Success")
    console.log(result)
})

router.post('/purchase', async (req, res) => {

    const event_id = req.body.event_id.toString()
    const no_of_tickets = req.body.tickets.toString()
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