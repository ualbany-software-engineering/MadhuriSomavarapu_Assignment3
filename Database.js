const mongoose = require("mongoose")
const Mongo_URI = "mongodb+srv://1vineeth1:9989911008@vineethcloud.cdnpkmp.mongodb.net/mern_firstapp?retryWrites=true&w=majority"
const connectDB = async () =>{

try {
   await mongoose.connect(Mongo_URI)
} catch (error) {
    process.exit(1)
}

}

module.exports = connectDB