const nodemailer = require('nodemailer')

const sendEmail = async(data)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user:process.env.EMAIL_ID,
          pass:process.env.PW
        }
      });
      
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: ' "hey 👻 " <ecommerceShop1900gmail.com>', 
          to:data.to ,
          subject:data.subject ,
          text: data.text ,
          html: data.htm
        });
        console.log("Message sent: %s", info.messageId);
    }
    main(); 
}


module.exports = sendEmail