const mongoose = require("mongoose")
const {UserDetails} = require("../mongodbConnection.js")
const addUserSchema = mongoose.Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        userID:{
            type:String
        }, 
        role:{
            type:String
        },
        address:{
            type:String
        },
        salary:{
            type:Number
        },
        image: {
            type: {
                data: Buffer,
                contentType: String
            },
            default: null 
        }

    },{
        timestamps:true, 
        collection: "UserData",
    }

)

module.exports = AddUserModel = UserDetails.model("AddUserModel",addUserSchema)