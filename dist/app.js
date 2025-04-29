"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddProducter_1 = __importDefault(require("./producer/AddProducter"));
const worker1_1 = __importDefault(require("./worker/worker1"));
const OutputConsumer_1 = __importDefault(require("./consumer/OutputConsumer"));
const process_1 = require("process");
const args = process_1.argv.slice(2);
console.log("args:", args);
switch (args[0]) {
    case "producer":
        console.log("Starting producer");
        (0, AddProducter_1.default)();
        break;
    case "consumer":
        console.log("Starting consumer");
        (0, worker1_1.default)();
        break;
    case "outputConsumer":
        console.log("Starting output consumer");
        (0, OutputConsumer_1.default)();
    default:
        console.log("Please provide a valid argument: producer or consumer");
        break;
}
//# sourceMappingURL=app.js.map