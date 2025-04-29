import AddProducer from "./producer/AddProducter";
import receive from "./worker/worker1";
import OutputConsumer from "./consumer/OutputConsumer";
import { argv } from "process";

const args = argv.slice(2);

console.log("args:", args);

switch (args[0]) {
  case "producer":
    console.log("Starting producer");
    AddProducer();
    break;
  case "consumer":
    console.log("Starting consumer");
    receive();
    break;
  case "outputConsumer":
    console.log("Starting output consumer");
    OutputConsumer();
  default:
    console.log("Please provide a valid argument: producer or consumer");
    break;
}
