import { Body, Controller, Get, Post } from '@nestjs/common';
import Email from 'emails';
import { Public } from 'src/Custom Decorators/public.decorator';
import { MailService } from 'src/uses-case/email/mail.service';

@Controller('p0?: { url: string; }p0: { url: string; }email')
export class MailController {
  constructor(

    private readonly mailService: MailService,
  ) { }


  @Public()
  @Post('send')
  async sendMail(
    @Body() sendMailDto: { email: string; subject: string },
  ): Promise<string> {
    await this.mailService.sendMail({
      ...sendMailDto,
      template: Email({ url: 'http://example.com' }),
    });

    return 'Email sent successfully';
  }
}