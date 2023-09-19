const mongoose = require('mongoose')
const pdf = new mongoose.Schema({
    title:{
        type:String
    },
    file: {
        type:Buffer,
        required:true
    }
})

const pdfschema = mongoose.model('samplepdfs', pdf);
module.exports=pdfschema;