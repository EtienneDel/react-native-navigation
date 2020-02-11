"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Navigation_1 = require("./Navigation");
const navigationSingleton = new Navigation_1.NavigationRoot();
exports.Navigation = navigationSingleton;
__export(require("./adapters/Constants"));
__export(require("./interfaces/Options"));
