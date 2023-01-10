

const Expense=require('../models/expenses')
const User=require('../models/users')
const sequelize=require('../utill/database')


exports.getUserLeaderboard= async (req,res)=>{
    try{
        const leaderboardOfUsers= await User.findAll({
          attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.Expenseamount')),'total_expenses']],
          include:[{
            model:Expense,
            attributes:[]

          }//sql join table user and expense
           
          ],
          group:['user.id'],//grouping user as user.id to compare there expenses
          order:[[sequelize.col('total_expenses'),'DESC']]  //sorting 


          
        })
        res.status(200).json(leaderboardOfUsers)
       
       
        }catch(err){
      console.log(err)
    }

}