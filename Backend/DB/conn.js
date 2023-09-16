const mongoose = require('mongoose')
const pass = "Ashwin17"
mongoose.connect(`mongodb+srv://ashwinkaranthamalai:${pass}@cluster0.qm1hj66.mongodb.net/DocSafer`).then(()=>{
    console.log('DB connection succesfull');
}).catch((err)=>{
    console.log("error occuerred in DB connection ", err);
})