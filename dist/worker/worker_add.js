"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const rabbitmq_url = "amqp://user:password@localhost:5672";
function receive() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqplib_1.default.connect(rabbitmq_url);
        const channel = yield connection.createChannel();
        const queue_requete = "additionnalOperationQueue";
        const queue_resultat = "ResultatQueueAddition";
        const exchange = "operations";
        yield channel.assertExchange(exchange, 'topic', { durable: true });
        yield channel.assertQueue(queue_requete, { durable: true });
        yield channel.bindQueue(queue_requete, exchange, 'add');
        yield channel.assertQueue(queue_resultat, { durable: true });
        channel.consume(queue_requete, (message) => __awaiter(this, void 0, void 0, function* () {
            if (message != null) {
                const content = JSON.parse(message.content.toString());
                const { n1, n2 } = content;
                console.log(`Calcul de ${n1} + ${n2}`);
                const randomDelay = Math.floor(Math.random() * 10000) + 5000;
                yield new Promise(resolve => setTimeout(resolve, randomDelay));
                const result = n1 + n2;
                const resultMessage = {
                    n1,
                    n2,
                    op: "add",
                    result
                };
                channel.sendToQueue(queue_resultat, Buffer.from(JSON.stringify(resultMessage)));
                channel.ack(message);
            }
            console.log("Le Worker à fait son taff");
        }));
    });
}
exports.default = receive;
//# sourceMappingURL=worker_add.js.map