import { Command } from "commander";

export const makeHelpLlmCommand = (): Command => {
  const helpLlm = new Command("help-llm")
    .description("Display the official command-line interface help.")
    .action(function (this: Command) {
      // Trigger the help output of the parent program
      this.parent?.outputHelp();
    });

  return helpLlm;
};
