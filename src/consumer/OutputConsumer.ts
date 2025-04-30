import connection_rabbitmq from "../utils/connection_rabbitmq";

async function OutputConsumer() {
  const channel = await connection_rabbitmq();
  const queue_resultat = "ResultQueue";

  try {
    await channel.assertQueue(queue_resultat, { durable: true });

    channel.consume(queue_resultat, (message) => {
      if (message != null) {
        try {
          const content = JSON.parse(message.content.toString());

          const { n1, n2, op, result } = content;

          if (
            n1 !== undefined &&
            n2 !== undefined &&
            op &&
            result !== undefined
          ) {
            console.log(`Le résultat de ${n1} ${op} ${n2} est ${result}`);
          } else {
            console.warn("Message incomplet ou mal formé:", content);
          }

          channel.ack(message);
        } catch (err) {
          console.error("❌ Erreur de parsing JSON:", err);
          channel.ack(message); // important : ack même si mal formé, sinon boucle infinie
        }
      }
    });

    console.log("Le Consumer est en attente de messages...");
  } catch (error) {
    console.error("Erreur lors de la consommation des résultats:", error);
  }
}

export default OutputConsumer;
