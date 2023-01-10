const Sequelize=require('sequelize');
const sequelize=require('../utill/database');

const Expense = sequelize.define('expense',{
    id:{
       type:Sequelize.INTEGER,
       autoIncrement:true,
      
       primaryKey:true
    },
    Expenseamount:{
        type:Sequelize.INTEGER,
       
        
    },
    description:{
        type:Sequelize.STRING
       
      
    },
    catagory:{
        type:Sequelize.STRING,
        
       
    }
    
});
module.exports= Expense;