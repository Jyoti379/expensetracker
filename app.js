const path = require('path');
//const fs= require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var cors= require('cors');
//const helmet=require('helmet');

//const morgan= require('morgan');
//const https= require('https');

const app = express();

const dotenv = require('dotenv');

dotenv.config();


const sequelize = require('./utill/database');
const User = require('./models/users');
const Expense=require('./models/expenses')
const Order= require('./models/orders');
const ForgetPassword=require('./models/forgetpassword');




app.use(cors());

//const privateKey=fs.readFileSync('server.key');
//const certificate=fs.readFileSync('server.cert')


const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const premiumPurchaseRoutes=require('./routes/premiumPurchase');
const resetpasswordRoutes=require('./routes/resetpassword');

//const accessLogStream= fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'}) //a:here is for appended,to stop overrriding instead adds to file
//app.use(helmet());
//app.use(morgan('combined',{stream:accessLogStream}))


app.use(bodyParser.json());



app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumPurchaseRoutes);
app.use('/password',resetpasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgetPassword);
ForgetPassword.belongsTo(User)



sequelize.sync()
.then(()=>{
//https
//.createServer({key:privateKey,cert:certificate},app)
//.listen(process.env.PORT||3000);
app.listen(3000)
})
.catch(err=>{
    console.log(err)
})

