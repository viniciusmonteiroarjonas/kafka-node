import express from 'express';
import { Kafka, logLevel } from 'kafkajs';

import routes from './routes';

const app = express();

/**
 * Faz conexão com o Kafka
 */
const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'certificate-group-receiver' });

/**
 * Middleware que disponibiliza o producer para todas rotas
 */
app.use((req, res, next) => {
  req.producer = producer;
  return next();
});

/**
 * Cadastra as rotas da aplicação
 */
app.use(express.json());

/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);

async function run() {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({
    topic: 'certification-response',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // console.log(`Nome do topico: ${topic}`);
      // console.log(`Partição: ${partition}`);
      // console.log(`Offset: ${JSON.stringify(message.offset)}`);
      console.log({
        value: message.value.toString(),
      });
    },
  });

  app.listen(3333);
}

run().catch(console.error);
