import nodemailer from 'nodemailer'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port:  "465",
            secure: true,
            auth: {
                user: "dr_x_2014@bk.ru",
                pass: "uPT4skf8Jhy3KFDBsfp2",
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: `<div>
                    <h1>HELLO WORLD!!!</h1>
                    <a href="${link}">${link}</a>
                    </div>`
        })
    }

}

export default new MailService()