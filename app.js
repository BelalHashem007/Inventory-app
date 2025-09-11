const express = require('express');
const app = express();

const PORT =3000;

app.get('/',(req,res)=>{
    res.send("hi");
})



app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log("Server is listening on PORT: ",PORT);
})