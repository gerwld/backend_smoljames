const express = require("express");
const app = express();
const PORT = 8383;


// Middleware
app.use(express.json());


// Website endpoints

app.get("/", (req,res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send("123")
})

app.get("/dashboard", (req,res) => {
    res.send("dashboard route")
})

// API endpoints

app.get("/api/data", (req,res) => {
    res.status(201).json({message: "actual data"})
})

app.post('/api/data', (req,res) => {
    const {name} = req.body;
    if(!name?.length) return res.status(400).json({message: "All fields are required"});

    res.status(201).json({message: `Successfully added ${name}`})
})


app.listen(PORT, () => {
    console.log(`Server has started on ${8383}`);
});