import {MongoClient} from 'mongodb'
import 'dotenv/config.js'

const client = new MongoClient(process.env.MONGO_CONN)

const getTickets = async (user_email = "example@ec.com") => {
    try {
        await client.connect()
        const db = client.db('passify')
        const query = {}
        return await db.collection('tickets').find(query).toArray()
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}

const createTicket = async (data) => {
    await client.connect()
    console.log(data)
    const db = client.db('passify')
    const collecton = db.collection('tickets')
    const result = await collecton.insertOne(data)
    console.log(result, result.acknowledged)
}

export {getTickets, createTicket}