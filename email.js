const nodemailer = require('nodemailer');
const pool = require('./database');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    
    auth: { 
      user: 'datasciencefeeds07@gmail.com',
      pass: 'params1507@'
    }
  });
  const sendemails = async(title,src,descrip,link) =>{
    const newemail = await pool.query("SELECT * FROM email");
    v = newemail.rows.map(data=>{
       
      
      
    
            var mailOptions = {
                from: 'datasciencefeeds07@gmail.com',
                to: data["email_id"],
                subject: '',
                html:`<h3>${title}</h3> <img src=${src}> <p>${descrip}</p><br>
                <p> <a href=${link}> click here</a> to visit a page</p>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent'+info.response);
                }
                return data["email_id"];

  });}).join(',');
}    

module.exports = sendemails;



