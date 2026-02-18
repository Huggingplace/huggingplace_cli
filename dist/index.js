#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const config_1 = require("./commands/config");
const collections_1 = require("./commands/collections");
const documents_1 = require("./commands/documents");
const pipelines_1 = require("./commands/pipelines");
const evals_1 = require("./commands/evals");
const data_1 = require("./commands/data");
const anonymizer_1 = require("./commands/anonymizer");
const traces_1 = require("./commands/traces");
const chat_1 = require("./commands/chat");
const server_1 = require("./commands/server");
const program = new commander_1.Command();
program
    .name('hplace')
    .description('The official command-line interface for the HuggingPlace Platform.')
    .version('0.0.1');
// Add commands
program.addCommand((0, config_1.makeConfigCommand)());
program.addCommand((0, collections_1.makeCollectionsCommand)());
program.addCommand((0, documents_1.makeDocumentsCommand)());
program.addCommand((0, pipelines_1.makePipelinesCommand)());
program.addCommand((0, evals_1.makeEvalsCommand)());
program.addCommand((0, data_1.makeDataCommand)());
program.addCommand((0, anonymizer_1.makeAnonymizerCommand)());
program.addCommand((0, traces_1.makeTracesCommand)());
program.addCommand((0, chat_1.makeChatCommand)());
program.addCommand((0, server_1.makeServerCommand)());
program.parse(process.argv);
