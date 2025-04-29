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
const clientNumber = {
    n1: 1,
    n2: 2,
};
function AddProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqplib_1.default.connect(rabbitmq_url);
            const channel = yield connection.createChannel();
            const queue = "additionnalOperationQueue";
            yield channel.assertQueue(queue, { durable: true });
            setInterval(() => {
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(clientNumber)), {
                    persistent: true,
                });
                console.log(`Producer is running and sending number to the queue: ${JSON.stringify(clientNumber)}`);
            }, 5000);
        }
        catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
        }
    });
}
exports.default = AddProducer;
//# sourceMappingURL=AddProducter.js.map