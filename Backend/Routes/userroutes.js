const express = require('express')
const router = express.Router()
const user = require('../Schema/userSchema')
const bcrypt  = require('bcrypt')
const Post = require('../Schema/pdf')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './PDF files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix=Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix+".pdf");
    }
  });


  const upload = multer({ storage: storage })   

router.post('/insert', async(req, res)=>{
    console.log('request form the Mobile', req.body);
    const{name, email, password}=req.body
    console.log(name, email, password)
    try{
        const exist = await user.findOne({email:email})
        if(!exist){
            const encryptedpassword = await bcrypt.hash(password, 10);
            const data = await new user({
                name:name,
                email:email,
                password:encryptedpassword
            });
            const result = data.save()
            if (result){
                res.json({
                    message:"success"
                })
            }
            else{
                res.json({
                    message: "failed to save",
                })
            }
            
        }
        else{
            res.json({
                message:"already a user"
            })
        }
    }
    catch(err){
        res.json({
            message:'failure'
        })
    }
})


router.post('/login', async(req, res)=>{
    console.log("from the login api", req.body);
    try{
        const{email, password}=req.body;
        const existingUser = await user.findOne({email});
        if(!existingUser){
            res.json({
                status:409,
                message:"not Registered"
            })
        } 
        else{
            console.log('registered user');
            if(await bcrypt.compare(password, existingUser.password)){
                res.json({
                    status:500,
                    message:"true"
                })
            }
            else{
                res.json({
                    status:409,
                    message:"wrong password"
                })
            }
           
        }
    }
    catch(err){
        res.json({
            statusL:400,
            message:"failure"
        })
    }
})

router.post('/newpost',upload.single('file'),async(req,res)=>{
    const file=req.file;
    console.log(req.body);
    console.log('test for large file', req.file.size)
    const post=new Post({
        title:req.body.title,
        email:req.body.author_email,
        date:req.body.data,
        fileName:file.filename
    })
    console.log(post);
    post.save();
    res.json({
        "message":"success"
    })
})
module.exports = router