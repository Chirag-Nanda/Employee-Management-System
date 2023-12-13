const express = require("express");
const authRoutes = require("./routes/authRoutes");
const dbConnect = require("./dbConnection/mongoConnect");
const empRoutes = require("./routes/empRoutes");
const ceoRoutes = require("./routes/ceoRoutes");
const spRoutes = require("./routes/spRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const empTaskRoutes= require("./routes/empTaskRoutes");
const dotenv = require("dotenv");
const app= express();

app.use(express.json());
dotenv.config();


app.use('/auth' , authRoutes);
app.use('/api', empRoutes);
app.use('/api', spRoutes);
app.use('/api', ceoRoutes);
app.use('/api',departmentRoutes);
app.use('/api',empTaskRoutes);
app.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000')
    dbConnect()
})





