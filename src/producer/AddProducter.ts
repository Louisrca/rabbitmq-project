import amqtplib from "amqplib";

async function AddProducer() {
  try {
    const connection = await amqtplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "additionnalOperationQueue";

    await channel.assertQueue(queue, { durable: true });

    const product = {
      id: 1,
      name: "Product 1",
      price: 100,
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(product)), {
      persistent: true,
    });
    console.log("Product added to queue:", product);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

export default AddProducer;
