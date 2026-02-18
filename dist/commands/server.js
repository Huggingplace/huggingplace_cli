"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeServerCommand = void 0;
const commander_1 = require("commander");
const server_1 = require("../server");
const makeServerCommand = () => {
    const server = new commander_1.Command('server')
        .description('Manage the HuggingPlace CLI server.');
    server
        .command('start')
        .description('Start the WebSocket server.')
        .option('-p, --port <port>', 'Port to listen on', '8080')
        .action((options) => {
        const port = parseInt(options.port, 10);
        (0, server_1.startServer)(port);
    });
    return server;
};
exports.makeServerCommand = makeServerCommand;
