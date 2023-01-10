
const bcrypt = require('bcrypt');
const User= require('../models/users');
const jwt=require('jsonwebtoken')

function isStringinvalid(string){
    if(string ==undefined || string.length== 0){
       return true;
    }
    else{
        return false;
    }

}

exports.signup = async(req,res)=>{
    try{
        const {name,email,phonenumber,password}=req.body
    if(isStringinvalid(name)||isStringinvalid(email)||isStringinvalid(password)){
        return res.status(400).json({err:'invalid input:Something is missing'})
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash)=>{
        console.log(err);
        await User.create({name,email,phonenumber,password:hash})
        res.status(200).json({message:'Successfully created your  account'})
    })

     }catch(err){
        res.status(500).json({error:err});
    }
}

exports.generateAccessToken = (id,name,isPremium)=>{
    return jwt.sign({userId:id,name:name,isPremium:isPremium},'secretkey')//the code inside quotes can be given anything of choice
}
function generateAccessToken(id,name,isPremium){
    return jwt.sign({userId:id,name:name,isPremium:isPremium},'secretkey')

}

 exports.login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email)
        console.log(password)

        if(isStringinvalid(email)||isStringinvalid(password)){
            return res.status(400).json({message:'invalid input:Something is missing',success:false})
        }
      const user=await User.findAll({where:{email}})
      if(user.length>0){
        bcrypt.compare(password, user[0].password, function(err, response){
            if (err){
                console.log(err)
              throw new Error('something went wrong');
                }
                if(response==true){
                    return res.status(200).json({success:true,message:'user login successful',token:generateAccessToken(user[0].id,user[0].name,user[0].isPremium)})    
                }
                else{
                    return res.status(401).json({success:false,message:'password incorect:User not authorised'})
                }

        })

       }else{
        return res.status(404).json({sucess:false,message:'User not found'})
      }

    }catch(err){
        res.status(500).json({success:false,message:err}); 
    }

 }
