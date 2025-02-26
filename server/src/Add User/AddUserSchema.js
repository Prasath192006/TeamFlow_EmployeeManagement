const mongoose = require("mongoose")

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
        image:{
            data:Buffer,
            contentType:String
        }
    },{
        timestamps:true,
        collection: "UserData",
    }

)

module.exports = AddUserModel = mongoose.model("AddUserModel",addUserSchema)