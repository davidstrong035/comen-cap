var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'mail.comen-cap.com',
  secureConnection: true,
  port: 587,
  tls: {
    rejectUnauthorized:false
  },
  auth: {
    user: 'noreply@comen-cap.com',	// Generated eheereal User
    pass: 'U(zm3Vm*E5Yz66'	// Generated etheral pass
  }
});

function sendEmailNotification(mailOptions){
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
        console.log(error);
        reject(error)
      }
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      console.log("(Confirmation) Message Sent: %s", info.messageId);
      resolve(info.messageId);
    });
  })
}

module.exports = sendEmailNotification;
