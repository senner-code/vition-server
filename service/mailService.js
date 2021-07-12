import nodemailer from 'nodemailer'

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to, link,name) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта',
      text: '',
      html: `
        
      
      <div>
        Hello ${name}, Activate your account
        <a href="${link}">Link</a>
      </div>
      
      
      `
    })
  }
}

export default new MailService()