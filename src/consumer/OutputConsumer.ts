import connection_rabbitmq from "../utils/connection_rabbitmq";

async function OutputConsumer() {
  const channel = await connection_rabbitmq();
  const queue_resultat = "ResultatQueueAddition";

  try {
    await channel.assertQueue(queue_resultat, { durable: true });

    channel.consume(queue_resultat, (message) => {
      if (message != null) {
        const content = JSON.parse(message.content.toString());
        const { n1, n2, op, result } = content;
        console.log(`Le résultat de ${n1} ${op} ${n2} est ${result}`);

        channel.ack(message);
      }
    });

    console.log("Le Consumer est en attente de messages...");
  } catch (error) {
    console.error("Erreur lors de la consommation des résultats:", error);
  }
}

export default OutputConsumer;
