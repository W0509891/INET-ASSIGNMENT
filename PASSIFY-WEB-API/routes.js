import express from 'express';
import sql from "mssql";
import dotenv from 'dotenv';


const router = express.Router();
const dbconnstr = process.env.CONNECTION_STRING;


// GET /api/EVENTS
router.get('/', async (req, res) => {

    await sql.connect(dbconnstr)

    const result = await sql.query(

        `SELECT TOP 10 Act.[ActivityId], Act.[Title], Act.[Description], Act.[EventImageName],Act.[EventStart],Act.[EventEnd],
                Cat.[CategoryId], Cat.[Title],
                Org.[OrganizerId], Org.[Name]
         from [dbo].[Activity] Act
             INNER JOIN [dbo].[Category] Cat ON Act.[CategoryId] = Cat.[CategoryId]
             INNER JOIN [dbo].[Organizer] Org on Act.[OrganizerId] = Org.[OrganizerId]
         ORDER BY Act.[Created] DESC`
    )

    res.json(result.recordsets)
   // console.dir(result.recordsets)

})

// GET /api/EVENTS/1
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

})

export default router;