const jwt = require("jsonwebtoken");
exports.jwtValidator = (req,res,next)=>{
        if(!req.headers.authorization){
            return res.status(401).json({
               success : false,
               message : "Authorization key is missing",
            })
        }
       
        let bearerString = req.headers.authorization.slice(0,6);
        let tokenString = req.headers.authorization.slice(7);
        if(bearerString !== "Bearer"){
            return res.status(401).json({
                success : false,
                message : "Invalid key",
             })
        }
        
        try{
            let jwtDecoded=jwt.verify(tokenString,  process.env.SECRET_KEY); 
            console.log(jwtDecoded)
        } catch(err){
            return res.status(401).json({
                success : false,
                message : err,
             })
        }
        next()
    }
