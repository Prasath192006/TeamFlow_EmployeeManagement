    const AddUserModel = require("./AddUserSchema.js")
    const bcrypt = require("bcrypt");

    const salt = 10;
    const addUser = async(req,res)=>{
        console.log("inside api call");
        const {name,email,password,userID,role,address,salary} = req.body;
        const imageFile = req.file;
        const isuserIDexist = await AddUserModel.findOne({userID});
        try{
            console.log("inside try block");
            if(isuserIDexist){
                return res.status(200).json({message:"UserID already exist",isuserexist:true,isstored:false})
            }
            else{
                const hash = await bcrypt.hash(password.toString(),salt);
                const storedData = await AddUserModel.create({
                    name,
                    email,
                    password:hash,
                    userID,
                    role,
                    address,
                    salary,
                    image:{
                        data:imageFile.buffer,
                        contentType:imageFile.mimetype
                    }
        
                })
                res.status(200).json({message:"Stored Successfully",isstored:true})
            }
        }catch(err){
            res.status(500).json({message:"Error in storing DATA",isstored:false})
        }
    
    }

    module.exports = {
        addUser
    }