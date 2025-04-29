import connection_rabbitmq from "../utils/connection_rabbitmq";
import { argv } from "process";

async function AddProducer() {
  const args = argv.slice(3);

  try {
    const channel = await connection_rabbitmq();
    const exchange = "operationExchange";

    await channel.assertExchange(exchange, "topic", { durable: true });

    setInterval(() => {
      const clientNumber = {
        n1: Math.floor(Math.random() * 100),
        n2: Math.floor(Math.random() * 100),
      };
      channel.publish(
        exchange,
        args[0],
        Buffer.from(JSON.stringify(clientNumber)),
        {
          persistent: true,
        }
      );
      console.log(
        `Producer is running and sending numbers to the queue: ${JSON.stringify(
          clientNumber
        )}`
      );
    }, 5000);
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

export default AddProducer;
