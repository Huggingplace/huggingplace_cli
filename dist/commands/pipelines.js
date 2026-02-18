"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePipelinesCommand = void 0;
const commander_1 = require("commander");
const makePipelinesCommand = () => {
    const pipelines = new commander_1.Command('pipelines')
        .description('Manage prompt pipelines (sequences).');
    pipelines
        .command('list')
        .description('List all prompt pipelines.')
        .action(() => console.log('Listing all pipelines...'));
    pipelines
        .command('create')
        .description('Create a new pipeline from a JSON file.')
        .option('-f, --file <file_path>', 'Path to the JSON definition file')
        .action((options) => console.log(`Creating pipeline from file: ${options.file}`));
    pipelines
        .command('get')
        .description('Get details for a specific pipeline.')
        .argument('<pipeline_id>', 'ID of the pipeline')
        .action((pipeline_id) => console.log(`Getting details for pipeline: ${pipeline_id}`));
    pipelines
        .command('add-test-case')
        .description('Add a test case to a pipeline.')
        .argument('<pipeline_id>', 'ID of the pipeline')
        .option('--input-data <json>', 'Input data as a JSON string')
        .option('--expected-output <text>', 'Expected output text')
        .action((pipeline_id, options) => console.log(`Adding test case to pipeline: ${pipeline_id}`));
    pipelines
        .command('run')
        .description('Execute a pipeline with a test case.')
        .argument('<pipeline_id>', 'ID of the pipeline')
        .option('--test-case-id <id>', 'ID of the test case')
        .option('-m, --model <model>', 'The model to use for execution')
        .action((pipeline_id, options) => console.log(`Running pipeline ${pipeline_id} with test case ${options.testCaseId}`));
    return pipelines;
};
exports.makePipelinesCommand = makePipelinesCommand;
