const express = require("express");
const authRoutes = require("./routes/authRoutes");
const dbConnect = require("./dbConnection/mongoConnect");
const empRoutes = require("./routes/empRoutes");
const ceoRoutes = require("./routes/ceoRoutes");
const spRoutes = require("./routes/spRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const empTaskRoutes= require("./routes/empTaskRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const swaggerjsondocs = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const dotenv = require("dotenv");
const app= express();
const cors= require("cors");


app.use(cors());
app.use(express.json());

dotenv.config();


app.use('/auth' , authRoutes);
app.use('/api', empRoutes);
app.use('/api', spRoutes);
app.use('/api', ceoRoutes);
app.use('/api',departmentRoutes);
app.use('/api',empTaskRoutes);
app.use('/api', uploadRoutes);

const options = {
    definition : {
        openapi : "3.0.0",
        info : {
            title : "Employee Management system API",
            version : "0.1.0",
        },
        servers : [{
            url : "http://localhost:3000"
        },],
    },

    apis : ["./routes/*.js"],
        
}

const specs = swaggerjsondocs(options);
app.use( "/api-docs", swaggerui.serve, swaggerui.setup(specs));

app.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000')
    dbConnect()
})





