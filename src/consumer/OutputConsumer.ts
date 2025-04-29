import amqtlib from "amqplib";

async function OutputConsumer() {
  const rabbitmq_url = "amqp://user:password@localhost:5672";
  const connection = await amqtlib.connect(rabbitmq_url);
  const channel = await connection.createChannel();
  const queue_resultat = "ResultatQueue";
  await channel.assertQueue(queue_resultat, { durable: true });
  channel.consume(queue_resultat, (message) => {
    if (message != null) {
      const content = JSON.parse(message.content.toString());
      const { n1, n2, op, result } = content;
      console.log(`Le résultat de ${n1} ${op} ${n2} est ${result}`);
    }
  });
  console.log("Le Consumer est en attente de messages...");
}
export default OutputConsumer;
