import express from "express";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes (API endpoints)
app.use("/api/photos", router)

app.get('/', (req, res) => {
    res.send('Home Page!');
});

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