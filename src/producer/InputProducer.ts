import connection_rabbitmq from "../utils/connection_rabbitmq";
import { argv } from "process";
import { Channel } from "amqplib";

type Operation = "add" | "sub" | "mul" | "div" | "all";

interface ClientNumber {
  n1: number;
  n2: number;
}

async function InputProducer(): Promise<void> {
  const args: string[] = argv.slice(3);
  const operations: Operation[] = ["add", "sub", "mul", "div"];
  const exchange = "operationExchange";

  try {
    const channel: Channel = await connection_rabbitmq();
    await channel.assertExchange(exchange, "topic", { durable: true });

    setInterval(() => {
      const clientNumber: ClientNumber = {
        n1: Math.floor(Math.random() * 100),
        n2: Math.floor(Math.random() * 100),
      };

      const chosenOp: Operation =
        args.length > 0 && ["add", "sub", "mul", "div", "all"].includes(args[0])
          ? (args[0] as Operation)
          : operations[Math.floor(Math.random() * operations.length)];

      if (chosenOp === "all") {
        operations.forEach((op: Operation) => {
          const routingKey = `operation.${op}`;
          channel.publish(
            exchange,
            routingKey,
            Buffer.from(JSON.stringify(clientNumber)),
            { persistent: true }
          );
          console.log(`Sent to '${routingKey}':`, clientNumber);
        });
      } else {
        const routingKey = `operation.${chosenOp}`;
        channel.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(clientNumber)),
          { persistent: true }
        );
        console.log(`Sent to '${routingKey}':`, clientNumber);
      }
    }, 2000);
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

export default InputProducer;
