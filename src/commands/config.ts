import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.env.HOME || '', '.huggingplace', 'config.json');

// Ensure the config directory exists
const ensureConfigDir = () => {
  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read the config file
export const readConfig = () => {
  let config: any = {};
  if (fs.existsSync(configPath)) {
    try {
      const raw = fs.readFileSync(configPath, 'utf-8');
      config = JSON.parse(raw);
    } catch (e) {
      config = {};
    }
  }

  // Environment variables override config file for the API Key
  if (process.env.BUTTRBASE_API_KEY) {
    config.apiKey = process.env.BUTTRBASE_API_KEY;
  } else if (process.env.HUGGINGPLACE_API_KEY) {
    config.apiKey = process.env.HUGGINGPLACE_API_KEY;
  }

  return config;
};

// Write to the config file
export const writeConfig = (config: any) => {
  ensureConfigDir();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

export const makeConfigCommand = () => {
  const config = new Command('config')
    .description('Manage CLI configuration (API Key, User Info).');

  config
    .command('set')
    .description('Save a configuration key-value pair.')
    .option('--api-key <key>', 'Set the API key.')
    .action((options) => {
      const currentConfig = readConfig();
      if (options.apiKey) {
        currentConfig.apiKey = options.apiKey;
        writeConfig(currentConfig);
        console.log('API key saved successfully.');
      } else {
        console.error('No configuration option provided. Use --api-key.');
      }
    });

  config
    .command('show')
    .description('Display the current configuration.')
    .action(() => {
      const currentConfig = readConfig();
      // Mask the API key if it exists
      const displayConfig = { ...currentConfig };
      if (displayConfig.apiKey) {
        displayConfig.apiKey = displayConfig.apiKey.substring(0, 4) + '...';
      }
      console.log(JSON.stringify(displayConfig, null, 2));
    });

  return config;
};
