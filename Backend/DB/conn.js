const mongoose = require('mongoose')
const pass = "Shiva"
mongoose.connect(`mongodb+srv://Shivsaran:${pass}@cluster0.yqoiifk.mongodb.net/DocSafer`).then(()=>{
    console.log('DB connection succesfull');
}).catch((err)=>{
    console.log("error occuerred in DB connection ", err);
})