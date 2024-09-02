const path = require('path')
const express = require('express')
const app = express();
const PORT = 4444;


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.send(index.html);
})

const requestHandler = require('./routes/todos')
app.use('/',requestHandler);


app.listen(PORT,()=>{
    console.log(`http://localhost:`+PORT);
});