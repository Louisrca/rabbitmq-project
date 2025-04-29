import amqtplib from "amqplib";
import dotenv from "dotenv";
dotenv.config();

async function connection_rabbitmq() {
  const rabbitmq_url = process.env.RABBITMQ_URL_DEV;
  const connection = await amqtplib.connect(rabbitmq_url);
  const channel = await connection.createChannel();

  return channel;
}

export default connection_rabbitmq;
