import express from 'express';
import {createUser, getUser} from "../services/UserService.js";
import 'dotenv/config';


const user_router = express.Router();

user_router.get('/login', async (req, res) => {
    await getUser(req.query.email, req.query.password)
})

user_router.post('/signup', async (req, res) => {
    if (await createUser(req.body)){
        res.status(200)
    }
    else {
        res.status(400)
    }

})


export default user_router;