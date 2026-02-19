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
const help_llm_1 = require("./commands/help_llm");
const program = new commander_1.Command();
program
    .name("huggingplace")
    .description("The official command-line interface for the HuggingPlace Platform.")
    .version("0.0.1")
    .addHelpText("after", `
\nQUICK START:
  1. Setup API Key:
     $env:HUGGINGPLACE_API_KEY = "your_key"   (Windows PowerShell)
     export HUGGINGPLACE_API_KEY="your_key"   (Linux/macOS)

LOGS & FILTERING (huggingplace chat logs):
  Required:
    --org <name>          Organization name (e.g., --org acme)

  Filters:
    --search <query>      Search text within chats
    --start-date <date>   Start date (YYYY-MM-DD)
    --end-date <date>     End date (YYYY-MM-DD)
    --pipeline-id <id>    Filter by specific pipeline/notebook ID
    --limit <number>      Max results (default: 10)
    --page <number>       Page number (default: 1)
    --order-by <field>    Sort by field (default: created)
    --order-direction     Sort direction (asc/desc, default: desc)

  Examples:
    # Get last 50 error logs from Feb 2024
    huggingplace chat logs --org acme  --start-date 2024-02-01 --end-date 2024-02-29 --limit 50
`);
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
program.addCommand((0, help_llm_1.makeHelpLlmCommand)());
program.parse(process.argv);
