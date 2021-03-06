"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const isObject_1 = __importDefault(require("lodash/isObject"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const isString_1 = __importDefault(require("lodash/isString"));
const endsWith_1 = __importDefault(require("lodash/endsWith"));
const forEach_1 = __importDefault(require("lodash/forEach"));
class OptionsProcessor {
    constructor(store, uniqueIdProvider, colorService, assetService) {
        this.store = store;
        this.uniqueIdProvider = uniqueIdProvider;
        this.colorService = colorService;
        this.assetService = assetService;
    }
    processOptions(options) {
        this.processObject(options);
    }
    processObject(objectToProcess) {
        forEach_1.default(objectToProcess, (value, key) => {
            this.processColor(key, value, objectToProcess);
            if (!value) {
                return;
            }
            this.processComponent(key, value, objectToProcess);
            this.processImage(key, value, objectToProcess);
            this.processButtonsPassProps(key, value);
            if (!isEqual_1.default(key, 'passProps') && (isObject_1.default(value) || isArray_1.default(value))) {
                this.processObject(value);
            }
        });
    }
    processColor(key, value, options) {
        if (isEqual_1.default(key, 'color') || endsWith_1.default(key, 'Color')) {
            options[key] = value === null ? 'NoColor' : this.colorService.toNativeColor(value);
        }
    }
    processImage(key, value, options) {
        if (isEqual_1.default(key, 'icon') ||
            isEqual_1.default(key, 'image') ||
            endsWith_1.default(key, 'Icon') ||
            endsWith_1.default(key, 'Image')) {
            options[key] = isString_1.default(value) ? value : this.assetService.resolveFromRequire(value);
        }
    }
    processButtonsPassProps(key, value) {
        if (endsWith_1.default(key, 'Buttons')) {
            forEach_1.default(value, (button) => {
                if (button.passProps && button.id) {
                    this.store.updateProps(button.id, button.passProps);
                    button.passProps = undefined;
                }
            });
        }
    }
    processComponent(key, value, options) {
        if (isEqual_1.default(key, 'component')) {
            value.componentId = value.id ? value.id : this.uniqueIdProvider.generate('CustomComponent');
            if (value.passProps) {
                this.store.updateProps(value.componentId, value.passProps);
            }
            options[key].passProps = undefined;
        }
    }
}
exports.OptionsProcessor = OptionsProcessor;
