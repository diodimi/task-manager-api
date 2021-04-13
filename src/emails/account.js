const sgMail= require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'diodimi14@gmail.com',
        subject:'Thanks for joining in',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail =(email,name)=>{
    sgMail.send({
        to:email,
        from:'diodimi14@gmail.com',
        subject:'Cancelation',
        text:`Hello, ${name}. Can you tell us the reasons that you cancelled your account.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}
