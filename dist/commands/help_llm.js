"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHelpLlmCommand = void 0;
const commander_1 = require("commander");
const config_1 = require("./config");
const DEFAULT_API_URL = 'http://localhost:8000/api';
const makeHelpLlmCommand = () => {
    const helpLlm = new commander_1.Command('help-llm')
        .description('Ask an LLM for help with the CLI or development tasks.')
        .argument('<query>', 'The question or task you need help with')
        .action(async (query) => {
        const config = (0, config_1.readConfig)();
        const apiUrl = config.apiUrl || DEFAULT_API_URL;
        const apiKey = config.apiKey;
        console.log(`Asking Gemini about: "${query}"...`);
        // In a real implementation, this would call an LLM endpoint.
        // For now, we'll simulate a response or use a placeholder.
        /*
        try {
          const response = await axios.post(`${apiUrl}/chat/ask`, {
            prompt: query,
            model: 'gemini-pro'
          }, {
             headers: apiKey ? { 'x-api-key': apiKey } : {},
          });
          console.log('\nResponse:\n', response.data.answer);
        } catch (e) { ... }
        */
        // Placeholder response
        setTimeout(() => {
            console.log('\n(Gemini): Here is how I can help with that...');
            console.log(`> You asked about "${query}".`);
            console.log('> I would recommend checking the "docs" folder or running "hplace help" to see available commands.');
            console.log('> (This is a placeholder response until the backend LLM endpoint is connected.)');
        }, 1000);
    });
    return helpLlm;
};
exports.makeHelpLlmCommand = makeHelpLlmCommand;
