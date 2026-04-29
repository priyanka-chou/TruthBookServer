const jwt = require("jsonwebtoken");
const User = require("../models/User");

const  requireAuth = (req,res,next)=>{

     try{
        const token =req.headers.authorization.split(" ")[1];
     

     if(!token){
        return res.status(400).json({
            message :"Unauthorized"
        })
     }

     const decoded = jwt.verify(token,process.env.JWT_SECRET);

     User.req ={id:decoded.id}
     next();
     }

     catch(error){
        res.status(500).json({
            message :"Invalid token"
        })
     }
}

module.exports={requireAuth};