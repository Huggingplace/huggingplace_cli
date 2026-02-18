import { Command } from 'commander';

export const makeTracesCommand = () => {
  const traces = new Command('traces')
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