import nodemailer from 'nodemailer'
import ApiError from "../exceptions/api.error.js";

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
    try {
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
    } catch (e) {
      throw new ApiError(500, 'Server error')
    }

  }
}

export default new MailService()