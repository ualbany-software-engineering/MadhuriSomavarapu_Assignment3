const User = require("../user")
const bcrypt = require("bcryptjs")
const jsonwt = require("jsonwebtoken")

const register = (req,res,next) =>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error : err
            })
        }
        let user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPass
        })
        
        User.findOne({$or: [{email:user.email}]})
        .then( person => {
          if(person){
            res.json({
                message: "User already exists! Please login"
            })
          }
          else{
            user.save()
            .then(user => {
               res.json({message : "User added succesfully"}) 
            })
            .catch(error => {
                res.json({
                    message : "An error occured!"
                })
            }) 
          }
        })
        
    })
} 

const login = (req, res, next) =>{
    var username = req.body.username
     var password = req.body.password
    
     User.findOne({$or: [{email:username}]})
     .then(user => {
        console.log(user);
        if(user){
             bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){ 
                    let token = jsonwt.sign({name: user.name}, "verySecretValue", {expiresIn: "1h"})
                    res.json({
                        message: "Login succesful!",
                        token: token
                    })
                }else{
                    res.json({
                        message : "Password didn't match"
                    })
                }
             })
        }else{
            res.json({
                message : "No user found! Please Signup"
            })
        }
     })
}

module.exports = {
    register, login
}