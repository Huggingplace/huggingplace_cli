"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDataCommand = void 0;
const commander_1 = require("commander");
const makeDataCommand = () => {
    const data = new commander_1.Command('data')
        .description('Create datasets from chats and prompt logs.');
    data
        .command('list-labels')
        .description('List all custom labels for training data.')
        .action(() => console.log('Listing custom labels...'));
    data
        .command('create-label')
        .description('(Admin) Create a new custom label.')
        .option('-n, --name <name>', 'Name of the label')
        .action((options) => console.log(`Creating label: ${options.name}`));
    data
        .command('label-chat')
        .description('Apply a label to a chat.')
        .argument('<chat_id>', 'ID of the chat')
        .option('-l, --label <label>', 'The label to apply')
        .action((chat_id, options) => console.log(`Labeling chat ${chat_id} with: "${options.label}"`));
    data
        .command('get-labeled-chats')
        .description('Export labeled chat data.')
        .option('--label <label>', 'Filter by a specific label')
        .action((options) => console.log('Getting labeled chats...'));
    return data;
};
exports.makeDataCommand = makeDataCommand;
