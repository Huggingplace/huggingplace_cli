"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = void 0;
const js_sdk_1 = require("js-sdk"); // Assuming the main export is named HuggingPlace
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(process.env.HOME || '', '.huggingplace', 'config.json');
const readApiKey = () => {
    if (!fs_1.default.existsSync(configPath)) {
        return undefined;
    }
    const raw = fs_1.default.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw);
    return config.apiKey;
};
const apiKey = readApiKey();
if (!apiKey) {
    console.error('API key not found. Please run "hplace config set --api-key <key>"');
    // In a real app, you might exit here, but for scaffolding we'll allow it.
}
// Assuming the SDK constructor takes the API key and a base URL
exports.apiClient = new js_sdk_1.HuggingPlace({
    apiKey: apiKey || '',
    baseUrl: process.env.HUGGINGPLACE_API_URL || 'http://localhost:3000/api',
});
