const mongoose = require("mongoose")

const profileSchema = mongoose.Schema({
    name: String,
    bio: String,
    image: {
        //data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("Profile", profileSchema)