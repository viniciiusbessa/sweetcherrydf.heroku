import nodemailer from 'nodemailer'

const sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'sweetcherryssc7@gmail.com',
        pass: 'sc277353',
    },
});

async function enviarEmail(para, assunto, mensagem) {
    const response = await sender.sendMail({
        from: '"Sweet Cherry" <sweetcherryssc7@gmail.com>',
        to: para,
        subject: assunto,
        html: mensagem
    })
    return response;
}

export default enviarEmail;