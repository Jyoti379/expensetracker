const Expense=require('../models/expenses');
const jwt = require('jsonwebtoken');
const AWS=require('aws-sdk');
const UserServices =require('../services/userservices');
const S3Services = require('../services/S3services');
//const Localstorage= require('node-localstorage')




exports.downloadexpense= async (req,res)=>{
  try {
	const expenses= await UserServices.getExpenses(req);
	  console.log(expenses)
	  const stringifiedExpenses = JSON.stringify(expenses)
	  console.log(stringifiedExpenses)
	  //it should depend on useId
	  const userId=req.user.id;
	  
	  const filename =`Expense${userId}/${new Date}.txt`;
	  const fileURL= await S3Services.uploadToS3(stringifiedExpenses,filename);
	 
	  res.status(200).json({fileURL,success:true})
} catch (error) {
  console.log(error)
  res.status(500).json({fileURL:'',success:false,error:error})
	
}
}

function isStringinvalid(string){
  if(string ==undefined || string.length== 0){
     return true;
  }
  else{
      return false;
  }

}
exports.addExpenses= async(req,res,next)=>{
    try{
      const {Expenseamount,description,catagory}=req.body
      
      if(isStringinvalid(Expenseamount)||isStringinvalid(description)){
        return res.status(400).json({err:'invalid input:Something is missing'})
    }

   //can be written: const data =await req.createExpense({Expenseamount:Expenseamount,description:description,catagory:catagory})

    const data= await Expense.create({Expenseamount:Expenseamount,description:description,catagory:catagory,userId:req.user.id});
      res.status(201).json({expenseDetails:data,success:true,message:'Expense added'});
    }catch(err){
      res.status(500).json({error:err})
    }
}

exports.getExpenses = async(req,res,next)=>{
    try{
   
      const page = +req.query.page||1
      let totalexpenses;
      let Items_Per_Page =10;
     

      Expense.count().then((total)=>{
        totalexpenses=total;
        return Expense.findAll({
          where:{userId:req.user.id},
         offset:(page-1)*Items_Per_Page,
          limit:Items_Per_Page
        })
      })
      .then(expenses=>{
        res.status(200).json({expenseDetails:expenses,
          currentPage:page,
          hasNextPage:Items_Per_Page*page<totalexpenses,
          nextPage:page+1,
          hasPreviousPage:page>1,
          previousPage:page-1,
          lastPage:Math.ceil(totalexpenses/Items_Per_Page),
        })
      })
      
    //const expenses = await Expense.findAll({where:{userId:req.user.id}});

   // console.log(expenses);
   
  }catch(err){
    console.log(err)
    res.status(500).json({error:err});
  }
  }

  exports.deleteExpense=async(req,res,next)=>{
    try{
    if(req.params.id=='undefined'){
        console.log('id is missing');
       return  res.status(400).json({error:'id is missing'});
  
    }
    const expenseId=req.params.id;
    await Expense.destroy({where:{id:expenseId, userId:req.user.id}}).then((numRows)=>{
      if(numRows==0){
        return res.status(404).json({success:false,message:'expense not belongs to User'})
      }
     return res.sendStatus(200).json({success:true,message:"deleted successfully"});
    }).catch(err=>{
      console.log(err)
    })
    
   }catch(err){
    console.log(err)
      res.status(500).json({error:err});
      
    }
  }
