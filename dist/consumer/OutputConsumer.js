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
function OutputConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const rabbitmq_url = "amqp://user:password@localhost:5672";
        const connection = yield amqplib_1.default.connect(rabbitmq_url);
        const channel = yield connection.createChannel();
        const queue_resultat = "ResultatQueue";
        yield channel.assertQueue(queue_resultat, { durable: true });
        channel.consume(queue_resultat, (message) => {
            if (message != null) {
                const content = JSON.parse(message.content.toString());
                const { n1, n2, op, result } = content;
                console.log(`Le résultat de ${n1} ${op} ${n2} est ${result}`);
            }
        });
        console.log("Le Consumer est en attente de messages...");
    });
}
exports.default = OutputConsumer;
//# sourceMappingURL=OutputConsumer.js.map