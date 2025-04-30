import InputProducer from "./producer/InputProducer";
import AddWorker from "./worker/worker_add";
import SubWorker from "./worker/worker_sub";
import MulWorker from "./worker/worker_mul";
import DivWorker from "./worker/worker_div";
import OutputConsumer from "./consumer/OutputConsumer";
import { argv } from "process";

const args = argv.slice(2);

console.log("args:", args);

switch (args[0]) {
  case "producer":
    console.log("Starting producer");
    InputProducer();
    break;
  case "consumers":
    console.log("Starting consumers");
    AddWorker();
    SubWorker();
    MulWorker();
    DivWorker();
    break;
  case "outputConsumer":
    console.log("Starting output consumer");
    OutputConsumer();
  default:
    console.log(
      "Please provide a valid argument: producer, consumer or outputConsumer"
    );
    break;
}
