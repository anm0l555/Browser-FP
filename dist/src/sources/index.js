"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sources = void 0;
// import { IFingerprint } from '../types'
const audio_1 = __importDefault(require("./audio"));
const canvas_1 = __importDefault(require("./canvas"));
const entropy_source_1 = require("../utils/entropy_source");
const platform_1 = __importDefault(require("./platform"));
exports.sources = {
    canvas: canvas_1.default,
    audio: audio_1.default,
    platform: platform_1.default
};
/**
 * Loads the built-in entropy sources.
 * Returns a function that collects the entropy components to make the visitor identifier.
 */
function loadBuiltinSources(options) {
    return (0, entropy_source_1.loadSources)(exports.sources, options, []);
}
exports.default = loadBuiltinSources;
