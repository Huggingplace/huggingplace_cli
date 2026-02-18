"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHelpLlmCommand = void 0;
const commander_1 = require("commander");
const makeHelpLlmCommand = () => {
    const helpLlm = new commander_1.Command("help-llm")
        .description("Display the official command-line interface help.")
        .action(function () {
        // Trigger the help output of the parent program
        this.parent?.outputHelp();
    });
    return helpLlm;
};
exports.makeHelpLlmCommand = makeHelpLlmCommand;
