import connection_rabbitmq from "../utils/connection_rabbitmq";

async function SubWorker() {
  const channel = await connection_rabbitmq();
  const queue_requete = "operationQueueSub";
  const queue_resultat = "ResultQueue";
  const exchange = "operationExchange";

  await channel.assertExchange(exchange, "topic", { durable: true });
  await channel.assertQueue(queue_requete, { durable: true });
  await channel.bindQueue(queue_requete, exchange, "operation.sub");

  await channel.assertQueue(queue_resultat, { durable: true });

  channel.consume(queue_requete, async (message) => {
    if (message != null) {
      const content = JSON.parse(message.content.toString());
      const { n1, n2 } = content;
      console.log(`Calcul de ${n1} - ${n2}`);

      const randomDelay = Math.floor(Math.random() * 10000) + 5000;
      console.log(
        `Délai avant de renvoyer le résultat: ${randomDelay / 1000} secondes`
      );

      await new Promise((resolve) => setTimeout(resolve, randomDelay));

      const result = n1 - n2;
      const resultMessage = {
        n1,
        n2,
        op: "sub",
        result,
      };
      channel.sendToQueue(
        queue_resultat,
        Buffer.from(JSON.stringify(resultMessage))
      );
      channel.ack(message);
    }
    console.log("Le Worker à fait son taff");
  });
}
export default SubWorker;
