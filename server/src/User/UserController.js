    const AddUserModel = require("./AddUserSchema.js")
    const bcrypt = require("bcrypt");

    const salt = 10;
    const addUser = async(req,res)=>{
        console.log("inside api call");
        const {name,email,password,userID,role,address,salary} = req.body;
        const imageFile = req.file;
        const isuserIDexist = await AddUserModel.findOne({userID});
        console.log("is user id exist in add user api",isuserIDexist);
       // const isemailexist = await AddUserModel.findOne({email});
        try{
          
            
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
        const userID = userid
        console.log(userID)

        try{
          const isuseridexist = await AddUserModel.findOne({userID});
          if(isuseridexist){
              return res.json({message:"User ID already exist",isuseridexist:true});
          }
          return res.json({message:"Verified✅",isuseridexist:false});
        }catch(err){
          res.status(500).json({message:"Error in accessing DB"})
        }
    }

    const validateLogIn = async(req,res)=>{
          const {userid,password} = req.query
          const userID = userid
          try{ 
            console.log("first line of try",userid)
              const isuserexist = await AddUserModel.findOne({userID});
              console.log("before if ",isuserexist)
              if(isuserexist === null){
                return res.status(500).json({message:"UserID doesn't Exist" , errfrom:"userid"})
              }
              const passatdb = isuserexist.password;
              bcrypt.compare(password,passatdb,(err,ismatch)=>{
                if(err){
                  return res.status(500).json({message:"Error in Comparing Password" ,errfrom:"BACKEND"});
                }
                if(ismatch){
                  return res.status(202).json({message:"Passkey Matched"})
                }else{
                  return res.status(500).json({message:"Incorrect Password" , errfrom:"password"})
                } 
              })
              console.log(userid,passatdb);
          }catch(err){
            return res.status(500).json({message:err})
          }
          
    } 

    module.exports = {
        addUser, 
       isemailexist,
        isuseridexist,
        validateLogIn
    }