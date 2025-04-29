import amqtplib from "amqplib";
import dotenv from "dotenv";
dotenv.config();

async function connection_rabbitmq() {
  const rabbitmq_url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@infoexpertise.hopto.org:5680`;
  const connection = await amqtplib.connect(rabbitmq_url);
  const channel = await connection.createChannel();

  return channel;
}

export default connection_rabbitmq;
