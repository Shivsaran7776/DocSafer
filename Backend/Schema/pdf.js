const mongoose = require('mongoose')
const pdf = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    file:{
        type:Buffer,
        contentType:String
    },
})

const pdfschema = mongoose.model('pdfs', pdf);
module.exports=pdfschema;