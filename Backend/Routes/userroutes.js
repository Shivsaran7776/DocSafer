const express = require('express')
const router = express.Router()
const user = require('../Schema/userSchema')
const bcrypt  = require('bcrypt')
const pdfModel = require('../Schema/pdf');
const multer = require('multer')
const { Binary } = require('mongodb');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './PDF files');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix=Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, uniqueSuffix+".pdf");
//     }
//   });

const storage = multer.memoryStorage();
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
    const post=new pdf({
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


router.post('/uploadpdf1', upload.single('File'), async (req, res) => {
    console.log('upload called', req.file);
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const pdf = new pdfModel({
            email: req.body.email, // Use req.body.email to get the email
            date: req.body.date, // Use req.body.date to get the date
            fileName: req.body.fileName, // Use req.body.fileName to get the file name
            file: req.file.buffer,
        });

        await pdf.save();

        return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/uploadpdf', upload.single('File'), async (req, res) => {
    try {
      const { email, date, fileName } = req.body;
  
      // Check if the file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Create a new PDF document using the PDF schema
      const pdfDocument = new pdfModel({
        email,
        date,
        fileName,
        file: req.file.buffer,
      });
  
      // Save the PDF document to the MongoDB database
      await pdfDocument.save();
  
      res.status(200).json({ message: 'PDF uploaded successfully', fileId: pdfDocument._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading PDF' });
    }
  });
  
  // Define a new route to retrieve the base64 string of a PDF by its ID
  router.get('/getpdf/:id', async (req, res) => {
    try {
      const pdfDocument = await pdfModel.findById(req.params.id);
  
      if (!pdfDocument) {
        return res.status(404).json({ message: 'PDF not found' });
      }
  
      // Convert the PDF buffer to base64 and send it to the frontend
      const base64Data = pdfDocument.file.toString('base64');
      res.status(200).json({ base64Data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving PDF' });
    }
  });

  

router.get('/files/:email', async (req, res) => {
    try {
      const { email } = req.params;
      console.log('from the backend', req.params.email)
      // Find files associated with the provided email
      const files = await pdfModel.find({ email });

  
      if (files.length === 0) {
        return res.status(404).json({ message: 'No files found for this email.' });
      }
      console.log('files', files);
      return res.status(200).json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      return res.status(500).json({ error: 'An error occurred while fetching files.' });
    }
  });

// router.get('/getItem/:id', async (req, res)=>{
//     const id = req.params.id;
//     console.log(id)
//     const item = await pdfModel.findOne({_id:id})
//     console.log(item.file.buffer)
//     if(item){
//         res.json({
//             message:'success',
//             data:item
//         })
//     }else{
//         res.json({
//             message:'failure'
//         })
//     }
// })


router.get('/getItem/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const item = await pdfModel.findOne({ _id: id });
  
      if (item) {
        const base64String = item.file.buffer.toString('base64');

        console.log('check',base64String, 'check');
        res.json({
          message: 'success',
          data: base64String, 
        });
      } else {
        res.json({
          message: 'failure',
        });
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ message: 'error' });
    }
  });


module.exports = router