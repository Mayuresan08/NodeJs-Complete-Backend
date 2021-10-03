//importing dotenv
require("dotenv").config();
//importing cors
const cors=require("cors")
//importing express module
const express= require("express");
//creating server
const app=express();
//calling the router for posts and users
const postRoutes=require("./routes/posts.routes");
const userRoutes=require("./routes/users.routes")

//calling the mongodbclient from mongo.js
const mongo=require("./shared/mongo");



//importing all the necessary middleware
const middleware=require("./shared/middleware")



app.use(cors());
//db should be connected before server is started, cannot directly connect
// mongo.connect()
//in-order to connect to db and then start the server, wrapping all other middleware in IIFE and using promises (Async and await)
(async ()=>{
    try{
        await mongo.connect();

        //common-middleware for every request
//using a express.json() to convert req.body from raw to json 
app.use(express.json())
//calling middleware on mountpath :/users
app.use("/users",userRoutes)

//validating the token for every request using jwt.verify()
app.use(middleware.authToken)

//Logging middleware
app.use(middleware.logging)

//calling middleware on mountpath :/posts 
app.use("/posts", postRoutes)


//starting the server
app.listen(process.env.PORT,()=>{console.log("server running on port ",process.env.PORT)})
       

}
    catch(err)
    {
        console.log("Error",err)
    }

})();
