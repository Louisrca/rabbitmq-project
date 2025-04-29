import AddProducer from "./producer/AddProducter";
import { argv } from "process";

const args = argv.slice(2)

console.log("args:",args)

AddProducer();
