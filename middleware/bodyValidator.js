exports.bodyValidator = (requiredFields)=>{
    let errFields=[];
    return (req, res, next) => {
        if (!req.body) {return res.status(400).json({
            success : false,
            message : "Request body empty"
        });}
        requiredFields.forEach((item) => {
            if (!req.body[item]) {
                errFields.push(item);
            }
        })

        if (errFields.length > 0) {
            return res.status(400).json({
                success : false,
                message: `${errFields.length > 1 ? errFields.join(" ") + " are" : errFields[0] + " is"} required`,});
        }

        if (req.body.email) {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!req.body.email.match(validRegex)) {
                return res.status(400).json({
                    success : false,
                    message : "Invalid Email"
                });
            }
        }
       
        if (req.body.dob) {
            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            if (!req.body.dob.match(dateformat)) {
                return res.status(400).json({
                    success : false,
                    message : "Invalid DOB"
                });
            }
        }

        if (req.body.gender) {
            if (req.body.gender !== 'M' && req.body.gender !== 'F' && req.body.gender !== 'O') {
                return res.status(400).json({
                    success : false,
                    message : "Invalid gender format"
                });
            }
        }

        next()
    }
}


// exports.bodyValidator = (body, requiredFields)=>{
//     let errFields=[];
    
//     return new Promise((resolve, reject)=>{
//         if(!body) return reject("Request body is empty");
//         requiredFields.forEach((item)=>{
//             if(!body[item]){
//                 errFields.push(item);
//             }
//         })
//         if(errFields.length >0){
//             return reject(`${errFields.length>1? errFields.join(" ")+" are": errFields[0]+" is"} required`);
//         }
//         if(body.email){
//             var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//             if (!body.email.match(validRegex)) {
//                 return reject("Invalid email");
//             } 
//         }

//         if(body.dob){
//             var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
//             if (!body.dob.match(dateformat)) {
//                 return reject("Invalid dob format");
//             }  
//         }
        
//         if(body.gender){
//             if(body.gender !== 'M'&& body.gender !== 'F' && body.gender !=='O'){
//                 return reject("Invalid gender format");
//             }
//         }

        

//         resolve()
//     })

// };
