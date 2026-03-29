import {MongoClient} from 'mongodb'
import 'dotenv/config.js'

const client = new MongoClient(process.env.MONGO_CONN)

const getUser = async (user_email, password) => {
    try {
        await client.connect()
        const db = client.db('passify')
        const collecton = db.collection('users')
        const query = {email: user_email, password: password}
        const projection = {_id: 0, password: 0, tickets: 0 }
        const result =  await collecton.findOne(query, {projection: projection})
        return result
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}

const pullTickets = async (user_email) => {
    try {
        await client.connect()
        const db = client.db('passify')
        const collection = db.collection('users')
        const query = {email: user_email}
        const projection = {_id: 0, tickets: 1}
        return await collection.findOne(query, {projection: projection})
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}

export const pushTickets = async (user_email, ticket_id) => {
    console.log(user_email, ticket_id)
    try {
        await client.connect()
        const db = client.db('passify')
        const collection = db.collection('users')
        const filter = {email: user_email}
        const update = {$addToSet: {tickets: ticket_id}}
        return await collection.updateOne(filter, update)
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}
const createUser = async (data) => {
    await client.connect()
    console.log(data)
    const db = client.db('passify')
    const collection = db.collection('users')
    const result = await collection.insertOne(data)
    return result.acknowledged
}

const user = new Object({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
})

export {getUser, createUser, user, pullTickets}