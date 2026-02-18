#!/usr/bin/env node

import { Command } from 'commander';
import { makeConfigCommand } from './commands/config';
import { makeCollectionsCommand } from './commands/collections';
import { makeDocumentsCommand } from './commands/documents';
import { makePipelinesCommand } from './commands/pipelines';
import { makeEvalsCommand } from './commands/evals';
import { makeDataCommand } from './commands/data';
import { makeAnonymizerCommand } from './commands/anonymizer';
import { makeTracesCommand } from './commands/traces';
import { makeChatCommand } from './commands/chat';
import { makeServerCommand } from './commands/server';
import { makeHelpLlmCommand } from './commands/help_llm';

const program = new Command();

program
  .name('hplace')
  .description('The official command-line interface for the HuggingPlace Platform.')
  .version('0.0.1');

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
