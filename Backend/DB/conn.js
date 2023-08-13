const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Shivsaran:Shiva@cluster0.yqoiifk.mongodb.net/?retryWrites=true&w=majority/DocSafer').then(()=>{
    console.log('connected to db');
}).catch((e)=>{
    console.log('error occured', e)
})