    const AddUserModel = require("./AddUserSchema.js")
    const bcrypt = require("bcrypt");

    const salt = 10;
    const addUser = async(req,res)=>{
        console.log("inside api call");
        const {name,email,password,userID,role,address,salary} = req.body;
        const imageFile = req.file;
        const isuserIDexist = await AddUserModel.findOne({userID});
        const isemailexist = await AddUserModel.findOne({email});
        try{
            console.log("inside try block");
            if(isuserIDexist){
                return res.status(200).json({message:"UserID already exist",isuserexist:true,isstored:false,errortype:"userid"})
            }
            if(isemailexist){
                return res.status(200).json({message:"Email already exist",isemailexist:true,isstored:false,errortype:"email"})
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
    
    
    const isemailexist = async(req,res)=>{
        const {email} = req.query;
          console.log("is email is called")
          console.log(email)
          try{
            const isemailexist = await AddUserModel.findOne({email});
            console.log("res:",isemailexist)
            if(isemailexist){
                return res.json({message:"Email ID already exist",isemailexist:true});
            }
            return res.json({message:"Verified✅",isemailexist:false});
          }catch(err){
            res.status(500).json({message:"Error in accessing DB"})
          }
          
    } 
    const isuseridexist = async(req,res) =>{
        const {userid} = req.query;
        console.log("is userid is called")
        console.log(userid)
        try{
          const isuseridexist = await AddUserModel.findOne({userid});
          console.log("res:",isemailexist)
          if(isuseridexist){
              return res.json({message:"User ID already exist",isuseridexist:true});
          }
          return res.json({message:"Verified✅",isuseridexist:false});
        }catch(err){
          res.status(500).json({message:"Error in accessing DB"})
        }
    }

    module.exports = {
        addUser,
        isemailexist,
        isuseridexist
    }