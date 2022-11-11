const express = require("express"); 



const router = express.Router() ;

const User = require("../models/useSchema") ;


router.get("/", (req, res) => {
    
   return res.send("Welcome to Home page")
    
})

//  Register  //

router.post("/register", async(req, res) => {

    const {name, email,phone, work, password, cpassword } = req.body ;

    if(!name|| !email || !phone || !work || !password || !cpassword){
        return res.status(422).send({massage : "please filled fiels property"})
    }

    await User.findOne({email : email})
    .then((isUser) => {
            if(isUser) {
              return  res.status(422).json({email : "email already exists"})
            }else if(password !== cpassword) {
               return res.status(422).json({password : "password not same"})
            }
            else {
                  const newUser = new User({name , email, phone, work, password, cpassword})
                 
                  newUser.save().then(() => {
                     return res.status(201).send({massage : "Resister successful"})
                  }).catch((e) => {
                     return res.status(500).send({massage : "Failed to resister"}) ;
                  })
                  
            }
    }).catch((e) => {
        console.log(e)
    })


    
})

    // login  //


    router.post("/login", async(req, res) => {
             
        try{
            const {email, password} = req.body ;
            
           if(!email || !password) {
              return res.status(422).json({massage : "wrong credientals"})
           } 

           const userDetails = await User.findOne({email : email}) ;
          

           if(userDetails) {
                  if(password == userDetails.password){
                      
                    const token = await userDetails.generateToken() ;
                   
                    const _id = userDetails._id
                     // set cookies 
                   
                    res.cookie('cokkieName',token, { maxAge: 900000, httpOnly: true })
                    res.status(201) ;
                  return  res.send({massage : "Login Succesful and cookie set successfully", token, id: _id })
                  

                  }
                  else {
                     return res.status(422).json({massage : "wrong credentials "})
                  }
           }else {
               return res.status(422).json({massage : "wrong credentials "})
           }
        }
        catch(e){
                   console.log(e)
        }
    })

    // about // 

    router.get("/about/:userId", async(req, res) => {
            
        const userId = req.params.userId ;

        const data = await User.findOne({_id : userId}) ;

       return res.send(data) ;
    })

module.exports = router ;