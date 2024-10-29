import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendEmail({
    subject,
    email,
    name,
    activationCode,
    template,
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activationCode,
      },
    });
  }
}
