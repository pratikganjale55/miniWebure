const dotenv = require("dotenv") ;

const express = require("express") ;
const cookies = require("cookie-parser") ;
const cors = require("cors") ;


dotenv.config({path : "./config.env"}) ;
const connection = require("./connection/db") ;
const authRoutes = require("./routes/auth") ;


const port = process.env.PORT || 5000

const app = express() ;
app.use(express.json()) ;


app.use(cookies()) ;
app.use(cors()) ;

 
app.use("/", authRoutes)


app.listen(port, () => {
       console.log("server run 5000")
})