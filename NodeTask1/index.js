const express=require('express');
const app=express();
const fs=require("fs");
const path=require("path");
const port=3000;

const folderPath=path.join(__dirname,"public");

if(!fs.existsSync(folderPath)){
    console.log("Creating a new file");
    fs.mkdirSync(folderPath);
}

app.post("/create",(req,res)=>{
    const timestamp=new Date();
    const fileName=`${timestamp.toISOString().replace(/:/g,"-")}.txt`;
    const filePath=path.join(folderPath,fileName);

    fs.writeFile(filePath,timestamp.toString(),(err)=>{
        if(err){
            console.log("Error in creating file");
            return res.status(500).json({message:`Error-${err}`});
        }
        res.json({message:"File Created Successfully",fileName});
    });
});

app.get("/read",(req,res)=>{
    fs.readdir(folderPath,(err,files)=>{
        if(err){
            console.log("Error Reading files");
            return res.status(500).json({message:`Error-${err}`});
        }
        res.json({message:"Files retrieved successfully",files})
    });
});

app.listen(port,()=>{
    console.log(`App listening @ http://localhost:${port}`);
});

