"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddProducter_1 = __importDefault(require("./producer/AddProducter"));
const process_1 = require("process");
const args = process_1.argv.slice(2);
console.log("args:", args);
(0, AddProducter_1.default)();
//# sourceMappingURL=app.js.map