const nodemailer = require('nodemailer');
const clientUrl = `${process.env.CLIENT_URL}`
const clientUrlUser = `${process.env.CLIENT_URL_USER}`


module.exports = {
    nodeMailer : function(email, type, data) {
        console.log('ini email kirim',email);
        console.log('ini email admin', process.env.NODE_MAILER_USER);
        console.log('ini pass admin', process.env.NODE_MAILER_PASS);
        
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: `${process.env.NODE_MAILER_USER}`, // generated ethereal user
            pass: `${process.env.NODE_MAILER_PASS}` // generated ethereal password
            }

        });
        let info = {}
        if(type === 'welcome'){
            info = {
                from: `"HOLYGRAIL" <${process.env.NODE_MAILER_USER}>`, // sender address
                to: `${email}`, // list of receivers
                subject: "ALERT", // Subject line
                html: `
                    <h1> WELCOME TO HOLYGRAIL </h1>
                    <h4> Your Premium curator of limited and top-of-the-class outfit</h4>
                    <a href="${clientUrl}"> Check HOLYGRAIL app. <a>                        
                ` 
            };
        }else if(type === 'alert'){
            info = {
                from: `"HOLYGRAIL" <${process.env.NODE_MAILER_USER}>`, // sender address
                to: `${email}`, // list of receivers
                subject: "ALERT", // Subject line
                html: `
                    <h1> Thankyou for shopping in HOLYGRAIL </h1>
                    <h4>your transaction id is ${data}</h4>
                    <h4> please click below link to LOGIN to HOLYGRAIL and confirm your package arrival</h4>
                    <a href="${clientUrl}"> Confirm your package arrival. <a>                        
                `
        }
        return new Promise(( res, rej )=>{
            transporter.sendMail(info)
            .then(data =>{
                res(data)
            })
            .catch(err =>{
                rej(err)
            })
        }) 
    }
    }
}