"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfigCommand = exports.writeConfig = exports.readConfig = void 0;
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(process.env.HOME || '', '.huggingplace', 'config.json');
// Ensure the config directory exists
const ensureConfigDir = () => {
    const dir = path_1.default.dirname(configPath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
// Read the config file
const readConfig = () => {
    let config = {};
    if (fs_1.default.existsSync(configPath)) {
        try {
            const raw = fs_1.default.readFileSync(configPath, 'utf-8');
            config = JSON.parse(raw);
        }
        catch (e) {
            config = {};
        }
    }
    // Environment variables override config file for the API Key
    if (process.env.BUTTRBASE_API_KEY) {
        config.apiKey = process.env.BUTTRBASE_API_KEY;
    }
    else if (process.env.HUGGINGPLACE_API_KEY) {
        config.apiKey = process.env.HUGGINGPLACE_API_KEY;
    }
    return config;
};
exports.readConfig = readConfig;
// Write to the config file
const writeConfig = (config) => {
    ensureConfigDir();
    fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
};
exports.writeConfig = writeConfig;
const makeConfigCommand = () => {
    const config = new commander_1.Command('config')
        .description('Manage CLI configuration (API Key, User Info).');
    config
        .command('set')
        .description('Save a configuration key-value pair.')
        .option('--api-key <key>', 'Set the API key.')
        .action((options) => {
        const currentConfig = (0, exports.readConfig)();
        if (options.apiKey) {
            currentConfig.apiKey = options.apiKey;
            (0, exports.writeConfig)(currentConfig);
            console.log('API key saved successfully.');
        }
        else {
            console.error('No configuration option provided. Use --api-key.');
        }
    });
    config
        .command('show')
        .description('Display the current configuration.')
        .action(() => {
        const currentConfig = (0, exports.readConfig)();
        // Mask the API key if it exists
        const displayConfig = { ...currentConfig };
        if (displayConfig.apiKey) {
            displayConfig.apiKey = displayConfig.apiKey.substring(0, 4) + '...';
        }
        console.log(JSON.stringify(displayConfig, null, 2));
    });
    return config;
};
exports.makeConfigCommand = makeConfigCommand;
