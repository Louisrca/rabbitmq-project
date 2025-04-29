import amqtplib from "amqplib";

const rabbitmq_url = "amqp://user:password@localhost:5672";

const clientNumber = {
  n1: 1,
  n2: 2,
};

async function AddProducer() {
  try {
    const connection = await amqtplib.connect(rabbitmq_url);
    const channel = await connection.createChannel();
    const queue = "additionnalOperationQueue";

    await channel.assertQueue(queue, { durable: true });

    setInterval(() => {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(clientNumber)), {
        persistent: true,
      });
      console.log(
        `Producer is running and sending number to the queue: ${JSON.stringify(
          clientNumber
        )}`
      );
    }, 5000);
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

export default AddProducer;
