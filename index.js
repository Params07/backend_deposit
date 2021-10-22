const express = require('express');
const cors = require('cors');
const pool = require('./database');
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || '5000';
app.listen(port,()=>{
    console.log("hello");
})
app.use(express.json({limit:'1mb'}));
 


app.post('/email_id',async(req,res)=>{
    try {
        const {title} = req.body;
        const check = await pool.query("SELECT * FROM email WHERE email_id = $1",[title])
       
      if(!check.rows.length){
        
        const newemail = await pool.query("INSERT INTO email (email_id) VALUES($1)",[title]);
        console.log("added succesfully"+title);
        res.json("not exist");
       
    }else{
        console.log("this email already logined");
        res.json("exist");
    }
  
    
         
           } catch (error) {
         console.log(error.message);
      }
});

    app.get('/feeds/:category',async(req,res)=>{
            try {
                 var category = req.params.category;
                    if(category=="data")
                    {
                        const newemail = await pool.query("SELECT * FROM feeds");
                        res.json(newemail.rows);
                 
                    }else {
                        const newemail = await pool.query("SELECT * FROM feeds  WHERE Category = $1",[category]);
                        res.json(newemail.rows);
                    }
                 
                   } catch (error) {
                 console.log(error.message);
              }
        });

        app.delete('/feeds/:id',async(req,res)=>{
            try {
                const {id} = req.params;
                
                const newemail = await pool.query("DELETE FROM feeds WHERE id = $1",[id]);
                res.json(newemail.rows);
                 
                   } catch (error) {
                 console.log(error.message);
              }
        });
 
setInterval(()=>{
    require('./sc');
},20000);




                                                  


    
    

        
