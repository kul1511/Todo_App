const express = require('express')
const PORT = 8888
const app = express();

//Sending response back to sender
app.get("/",(req, res)=>{
    res.send("<h2>Response Recieved</h2>")
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error ${err}`)
    }
    console.log(`Server started at ${PORT}`)
})