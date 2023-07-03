import { Injectable, OnModuleInit } from '@nestjs/common'
import { KafkaService } from './kafka.consumer'
import { randomUUID } from 'crypto'
import { logger } from '@esign-services/logger'

@Injectable()
export class DocumentConsumer implements OnModuleInit {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    this.DocumentCreate()
    // this.DocumentSign()
  }

  private DocumentCreate = async () => {
    const consumer = await this.kafkaService.createConsumer({ groupId: 'document.v1.status.create' })
    await consumer.subscribe({ topic: 'document.v1.status.create', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // if ([0, 1, 2, 3, 4].includes(partition)) {
          logger.info({
          partition,
          offset: message.offset,
          value: message.value.toString()
        })
        await consumer.commitOffsets([
          {
            topic: 'document.v1.status.create',
            partition,
            offset: (Number(message.offset) + 1).toString()
          }
        ])
        logger.info('Commit', {
          topic: 'document.v1.status.create',
          partition,
          offset: (Number(message.offset) + 1).toString()
        })
      },
      // }
      autoCommit: false
    })
  }

  private DocumentSign = async () => {
    this.kafkaService.consume(
      'document.v1.status.create',
      { topic: 'document.v1.status.sign', fromBeginning: true },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value.toString()
          })
        },
        autoCommit: false
      }
    )
  }
}
