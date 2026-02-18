"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEvalsCommand = void 0;
const commander_1 = require("commander");
const makeEvalsCommand = () => {
    const evals = new commander_1.Command('evals')
        .description('Run and review RAG evaluations.');
    evals
        .command('list')
        .description('List all past evaluation test runs.')
        .action(() => console.log('Listing all eval runs...'));
    evals
        .command('get-results')
        .description('Get the detailed results for a specific test.')
        .argument('<test_id>', 'ID of the test')
        .action((test_id) => console.log(`Getting results for test: ${test_id}`));
    evals
        .command('run-comparison')
        .description('Run a new RAG comparison test.')
        .option('-q, --query <query>', 'The query to test')
        .option('-c, --collection-ids <ids>', 'Comma-separated list of collection IDs')
        .option('-m, --model <model>', 'The model to use')
        .action((options) => console.log(`Running comparison for query: "${options.query}"`));
    return evals;
};
exports.makeEvalsCommand = makeEvalsCommand;
