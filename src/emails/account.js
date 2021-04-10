const sgMail= require('@sendgrid/mail')

const sendgridAPIkey= 'SG.I2vCjzeNSnGU-e8kdChGSA.eUBzZZX1PPPZBzFtzZc7wrsBb041FhN10zFSHaV20Ac'

sgMail.setApiKey(sendgridAPIkey)

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