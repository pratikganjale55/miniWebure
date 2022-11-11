const mongoose = require("mongoose") ;
const jwt = require("jsonwebtoken") ;
const secretToken = process.env.SECRET_TOKEN ;

const UserSchema = mongoose.Schema({
    name : {
        type : String ,
        require : true 
    },
    email : {
        type : String ,
        require : true 
    },
    phone : {
        type : Number ,
        require : true 
    },
    work : {
        type : String ,
        require : true 
    },
    password : {
        type : String ,
        require : true 
    }, 
    cpassword : {
        type : String ,
        require : true 
    },
    tokens : [
        {
            token : {
                type : String ,
                require : true 
            }
        }
    ]
})

// token //

UserSchema.methods.generateToken = async function() {
     try {
        let createToken = jwt.sign({_id : this._id}, secretToken) 
        this.tokens = this.tokens.concat({token : createToken}) ;
        await this.save() ;
        return createToken;
        
     } catch (e) {
        console.log(e)
        
     }
}

const user = mongoose.model("webureregister", UserSchema)

module.exports = user ;