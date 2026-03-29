import {MongoClient} from 'mongodb'
import {pullTickets} from "./UserService.js";
import 'dotenv/config.js'

const client = new MongoClient(process.env.MONGO_CONN)

const getTickets = async (user_email) => {
    try {
        let document = await pullTickets(user_email)

        await client.connect()
        const db = client.db('passify')
        const collection = db.collection('tickets')

        const query = {_id: {$in: document.tickets}}
        const userTickets = await collection.find(query).toArray()
        return userTickets
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