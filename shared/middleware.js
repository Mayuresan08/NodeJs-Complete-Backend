
//importing JWT module
const jwt=require("jsonwebtoken");


const middleware={

    authToken(req,res,next){
        //retreiving the token from header
        const token=req.headers["auth-token"]
        // console.log(token)
        //checking token-present
        if(!token)  return res.status(401).send("Please log in again")
        //validating token
        try{
        req.user=jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        // console.log(req.user)
        next()
        }
        catch(err)
        {
            res.status(401).send(err)
        }
        
    },

    logging(req,res,next){
        console.log(`${new Date()}--${req.user.userId}--${req.method}--${req.url}`)

        next()
    }
    

}
module.exports=middleware