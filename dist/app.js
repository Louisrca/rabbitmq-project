"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddProducter_1 = __importDefault(require("./producer/AddProducter"));
const worker_add_1 = __importDefault(require("./worker/worker_add"));
const worker_sub_1 = __importDefault(require("./worker/worker_sub"));
const worker_mul_1 = __importDefault(require("./worker/worker_mul"));
const worker_div_1 = __importDefault(require("./worker/worker_div"));
const OutputConsumer_1 = __importDefault(require("./consumer/OutputConsumer"));
const process_1 = require("process");
const args = process_1.argv.slice(2);
console.log("args:", args);
switch (args[0]) {
    case "producer":
        console.log("Starting producer");
        (0, AddProducter_1.default)();
        break;
    case "consumers":
        console.log("Starting consumers");
        (0, worker_add_1.default)();
        (0, worker_sub_1.default)();
        (0, worker_mul_1.default)();
        (0, worker_div_1.default)();
        break;
    case "outputConsumer":
        console.log("Starting output consumer");
        (0, OutputConsumer_1.default)();
    default:
        console.log("Please provide a valid argument: producer or consumer");
        break;
}
//# sourceMappingURL=app.js.map