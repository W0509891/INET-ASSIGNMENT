import express from 'express';
import {createUser, getUser} from "../services/UserService.js";
import 'dotenv/config';
import jwt from 'jsonwebtoken';


const user_router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_very_secret_jwt_key_123!';

user_router.get('/login', async (req, res) => {
    console.log(req.query)
    const user = await getUser(req.query.email, req.query.password);
    if (user) {
        const token = jwt.sign(
            {email: user.email, first_name: user.first_name, last_name: user.last_name},
            JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({token, user});
    } else {
        res.status(401).json({message: "Invalid credentials"});
    }
})

user_router.post('/signup', async (req, res) => {
    if (await createUser(req.body)){
        const user = await getUser(req.body.email, req.body.password);
        if (user) {
            const token = jwt.sign(
                {email: user.email, first_name: user.first_name, last_name: user.last_name},
                JWT_SECRET,
                {expiresIn: '1h'}
            );
            res.status(200).json({token, user});
        } else {
            res.status(200).json({message: "Account created"});
        }
    }
    else {
        res.status(400).json({message: "Signup failed"});
    }
})


export default user_router;