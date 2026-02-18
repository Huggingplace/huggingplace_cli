"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTracesCommand = void 0;
const commander_1 = require("commander");
const makeTracesCommand = () => {
    const traces = new commander_1.Command('traces')
        .description('Debug with operation traces.');
    traces
        .command('get')
        .description('Retrieve a specific trace by its ID.')
        .argument('<trace_id>', 'ID of the trace')
        .action((trace_id) => console.log(`Getting trace: ${trace_id}`));
    traces
        .command('search')
        .description('Search for traces with filters.')
        .option('--status <status>', 'Filter by status (ERROR or OK)')
        .option('--operation <op_name>', 'Filter by operation name')
        .action((options) => console.log('Searching for traces...'));
    return traces;
};
exports.makeTracesCommand = makeTracesCommand;
