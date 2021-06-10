import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'certificate',
});

const consumer = kafka.consumer({ groupId: 'certificate-group' });
const producer = kafka.producer();

async function run() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({
    topic: 'issue-certificate',
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

      const payload = JSON.parse(message.value);

      await producer.send({
        topic: 'certification-response',
        messages: [
          {
            value: `Certificado do aluno ${payload.user.name}, gerado com sucesso do curso ${payload.course}`,
          },
        ],
      });
    },
  });
}

run().catch(console.error);
