const express = require("express");
const authRoutes = require("./routes/authRoutes")
const dbConnect = require("./dbConnection/mongoConnect");
const empRoutes = require("./routes/empRoutes");

const app= express();

app.use(express.json());



app.use('/auth' , authRoutes);
app.use('/api', empRoutes);


app.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000')
    dbConnect()
})





