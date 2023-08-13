const express =require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin:"*",
}))

const port = process.env.port||8000;
require("./DB/conn");

app.listen(port,()=>{
    console.log("Connected Successfu to the port",port);
})