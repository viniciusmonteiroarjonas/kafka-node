import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
  console.log(req.body);
  const message = {
    user: { id: 1, name: 'Vinicius Monteiro Arjonas' },
    course: 'Kafka com Node.js',
    grade: 10,
  };

  // Chamar micro serviço
  await req.producer.send({
    topic: 'gera-certificado',
    messages: [{ value: JSON.stringify(message) }],
  });

  return res.json({ message });
});

export default routes;
