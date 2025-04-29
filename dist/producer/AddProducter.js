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
const connection_rabbitmq_1 = __importDefault(require("../utils/connection_rabbitmq"));
const process_1 = require("process");
function AddProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process_1.argv.slice(3);
        try {
            const channel = yield (0, connection_rabbitmq_1.default)();
            const exchange = "operationExchange";
            yield channel.assertExchange(exchange, "topic", { durable: true });
            setInterval(() => {
                const clientNumber = {
                    n1: Math.floor(Math.random() * 100),
                    n2: Math.floor(Math.random() * 100),
                };
                channel.publish(exchange, args[0], Buffer.from(JSON.stringify(clientNumber)), {
                    persistent: true,
                });
                console.log(`Producer is running and sending numbers to the queue: ${JSON.stringify(clientNumber)}`);
            }, 5000);
        }
        catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
        }
    });
}
exports.default = AddProducer;
//# sourceMappingURL=AddProducter.js.map