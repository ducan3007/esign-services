import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, Kafka, KafkaConfig } from 'kafkajs'

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafkaClient: Kafka = null
  private kafkaAdmin = null
  private consumers: Consumer[] = []

  onModuleInit() {
    this.kafkaClient = new Kafka({
      clientId: 'esign-services',
      brokers: ['localhost:9093']
    })
    this.kafkaAdmin = this.kafkaClient.admin()
  }

  onModuleDestroy() {
    this.consumers.forEach((consumer) => consumer.disconnect())
  }

  async createConsumer({ groupId }) {
    if (this.kafkaClient) {
      const cosumer: Consumer = this.kafkaClient.consumer({ groupId: groupId})
      await cosumer.connect().catch((e) => console.error(e))
      this.consumers.push(cosumer)
      return cosumer
    }
  }

  async consume(groupId: string, topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    if (this.kafkaClient) {
      const cosumer: Consumer = this.kafkaClient.consumer({ groupId: groupId })
      await cosumer.connect().catch((e) => console.error(e))
      await cosumer.subscribe(topic)
      await cosumer.run(config)
      this.consumers.push(cosumer)
    }
  }

}
