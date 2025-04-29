import amqtplib from "amqplib";

const rabbitmq_url = "amqp://user:password@localhost:5672";

async function receive() {
  const connection = await amqtplib.connect(rabbitmq_url);
  const channel = await connection.createChannel();
  const queue_requete = "additionnalOperationQueue";
  const queue_resultat = "ResultatQueue";

  await channel.assertQueue(queue_requete, { durable: true });
  await channel.assertQueue(queue_resultat, { durable: true });
  channel.consume(queue_requete, async (message) => {
    if (message != null) {
      const content = JSON.parse(message.content.toString());
      const { n1, n2 } = content;
      console.log(`Calcul de ${n1} + ${n2}`);

      const result = n1 + n2;
      const resultMessage = {
        n1,
        n2,
        op: "add",
        result,
      };
      channel.sendToQueue(
        queue_resultat,
        Buffer.from(JSON.stringify(resultMessage))
      );
    }
    console.log("Le Worker à fait son taff");
  });
}
export default receive;

/*
function consume(message){
    if(message !=null) {
        const content = JSON.parse(message.content.toString());
        const { n1, n2 } = content; 
        console.log(`Calcul de ${n1} + ${n2}`);       

        const result = n1 + n2;
        const resultMessage = {
            n1,
            n2,
            op: "add",
            result
        };

        channel.sendToQueue(queue_resultat, Buffer.from(JSON.stringify(resultMessage)));

    }
}*/
