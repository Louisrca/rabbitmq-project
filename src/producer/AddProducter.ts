import connection_rabbitmq from "../utils/connection_rabbitmq";
import { argv } from "process";

async function AddProducer() {
  // Récupère l'argument de la ligne de commande à partir de la 4e position
  const args = argv.slice(3);
  const operations = ["add", "sub", "mul", "div"];
  const exchange = "operationExchange";

  try {
    const channel = await connection_rabbitmq();

    // Déclare un échange de type 'topic'
    await channel.assertExchange(exchange, "topic", { durable: true });

    // Exécute une publication toutes les 2 secondes
    setInterval(() => {
      // Génère deux nombres aléatoires
      const clientNumber = {
        n1: Math.floor(Math.random() * 100),
        n2: Math.floor(Math.random() * 100),
      };

      // Détermine la clé de routage : argument CLI valide ou choisi aléatoirement
      const operation =
        args.length > 0 && operations.includes(args[0])
          ? args[0]
          : operations[Math.floor(Math.random() * operations.length)];

      const routingKey = `operation.${operation}`;

      // Publication du message
      channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(clientNumber)),
        { persistent: true }
      );

      // Log de debug
      console.log(`Sent to '${routingKey}':`, clientNumber);
    }, 2000);
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

export default AddProducer;
