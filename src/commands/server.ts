import { Command } from 'commander';
import { startServer } from '../server';

export const makeServerCommand = () => {
  const server = new Command('server')
    .description('Manage the HuggingPlace CLI server.');

  server
    .command('start')
    .description('Start the WebSocket server.')
    .option('-p, --port <port>', 'Port to listen on', '8080')
    .action((options) => {
      const port = parseInt(options.port, 10);
      startServer(port);
    });

  return server;
};
