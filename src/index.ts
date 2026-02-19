#!/usr/bin/env node

import { Command } from "commander";
import { makeConfigCommand } from "./commands/config";
import { makeCollectionsCommand } from "./commands/collections";
import { makeDocumentsCommand } from "./commands/documents";
import { makePipelinesCommand } from "./commands/pipelines";
import { makeEvalsCommand } from "./commands/evals";
import { makeDataCommand } from "./commands/data";
import { makeAnonymizerCommand } from "./commands/anonymizer";
import { makeTracesCommand } from "./commands/traces";
import { makeChatCommand } from "./commands/chat";
import { makeServerCommand } from "./commands/server";
import { makeHelpLlmCommand } from "./commands/help_llm";

const program = new Command();

program
  .name("huggingplace")
  .description(
    "The official command-line interface for the HuggingPlace Platform.",
  )
  .version("0.0.1")
  .addHelpText(
    "after",
    `
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
`,
  );

// Add commands
program.addCommand(makeConfigCommand());
program.addCommand(makeCollectionsCommand());
program.addCommand(makeDocumentsCommand());
program.addCommand(makePipelinesCommand());
program.addCommand(makeEvalsCommand());
program.addCommand(makeDataCommand());
program.addCommand(makeAnonymizerCommand());
program.addCommand(makeTracesCommand());
program.addCommand(makeChatCommand());
program.addCommand(makeServerCommand());
program.addCommand(makeHelpLlmCommand());

program.parse(process.argv);
