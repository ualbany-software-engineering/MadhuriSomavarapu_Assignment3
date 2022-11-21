const express = require("express")
const Profile = require("./profileSchema")
const asyncHandler = require("express-async-handler")
const connectDB = require("./Database")
const multer = require('multer')
const AuthController = require("./controllers/AuthController")
const authenticate = require("./authentication")



const PORT = 5000

connectDB()

const Storage = multer.diskStorage({
    destination: "uploads",
    filename : (req,file,callback)=>{
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('image')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

const cors = require('cors')

app.use(cors())

app.get("/profiles",asyncHandler(async(req, res)=>{
    const profilesList = await Profile.find()
    res.status(200).json(profilesList)
}))

app.post("/post",( async (req,res)=>{
    
    const profile = await Profile.create({
        name : req.body.name,
        bio : req.body.bio,
        image: {
            // data: req.file.filename,
            contentType: "image/png"
        }
    })
    res.status(200).json({output:profile,message:"Profile created"})
    
    
}))



app.post("/register", AuthController.register)
app.post("/login",AuthController.login)

app.listen(PORT, ()=> console.log(`Server started on PORT ${PORT}`))


