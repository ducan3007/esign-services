import { Injectable, OnModuleInit } from '@nestjs/common'
import Sib from 'sib-api-v3-typescript'

@Injectable()
export class EmailService implements OnModuleInit {
  private readonly apiInstance = new Sib.TransactionalEmailsApi()
  async onModuleInit() {
    this.apiInstance.setApiKey(Sib.TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY)
  }
}
