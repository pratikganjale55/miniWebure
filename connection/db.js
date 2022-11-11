const mongoose = require("mongoose") ;
const db = process.env.DATABASE ;

const connection = mongoose.connect(db)
.then(() => {
    console.log("db connection successful")
})
.catch((e) => console.log("db connect error"))

module.exports = connection ;


