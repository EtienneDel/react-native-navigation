"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueId_1 = __importDefault(require("lodash/uniqueId"));
class UniqueIdProvider {
    generate(prefix) {
        return uniqueId_1.default(prefix);
    }
}
exports.UniqueIdProvider = UniqueIdProvider;
