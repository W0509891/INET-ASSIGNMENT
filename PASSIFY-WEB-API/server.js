import express from "express";
import router from "./routes.js";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes (API endpoints)
app.use("/api/activities", router)


//Routes (HTML endpoints)

//Home Page
app.get('/', (req, res) => {
    res.send('Home Page!');
});

//--------------------Test Routes----------------------------------//

app.get('/hello', (req, res) => {
    res.send('Hello Express!');
});

app.get('/goodbye', (req, res) => {
    res.send('Hastalavista Baby!');
});


// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});