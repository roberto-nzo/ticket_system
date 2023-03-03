import nodemailer from "nodemailer"

async function sendMail(user: any) {
    // let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "robertonzohabonayo@gmail.com",
            pass: process.env.app_password
        }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Roberto Nzohabonayo 👻" <foo@example.com>',
        to: `${user.email}`,
        subject: "Hello ✔",
        text: `Hello ${user.firstname} ${user.lastname}, welcome to Ticket System the platform.`,
    })

    console.log("Message sent", info.messageId)
}

// sendMail().catch(console.error)

export default sendMail