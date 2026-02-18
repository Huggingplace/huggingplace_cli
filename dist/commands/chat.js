"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeChatCommand = void 0;
const commander_1 = require("commander");
const makeChatCommand = () => {
    const chat = new commander_1.Command('chat')
        .description('Interact with a chat endpoint.');
    chat
        .command('start')
        .description('Start a conversation and get the context payload.')
        .argument('<chat_id>', 'ID of the chat')
        .option('-p, --prompt <prompt>', 'The user prompt')
        .action((chat_id, options) => console.log(`Starting chat ${chat_id} with prompt: "${options.prompt}"`));
    chat
        .command('save')
        .description('Save the final results of a conversation from a JSON file.')
        .argument('<chat_id>', 'ID of the chat')
        .option('-f, --file <file_path>', 'Path to the JSON results file')
        .action((chat_id, options) => console.log(`Saving results for chat ${chat_id} from file: ${options.file}`));
    return chat;
};
exports.makeChatCommand = makeChatCommand;
