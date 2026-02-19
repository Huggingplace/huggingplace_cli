import { Command } from "commander";
import axios from "axios";
import { readConfig } from "./config";

const DEFAULT_BASE_URL = "https://api.huggingplace.com";

export const makeChatCommand = () => {
  const chat = new Command("chat").description(
    "Interact with a chat endpoint and view logs.",
  );

  chat
    .command("start")
    .description("Start a conversation and get the context payload.")
    .argument("<chat_id>", "ID of the chat")
    .option("-p, --prompt <prompt>", "The user prompt")
    .action((chat_id, options) =>
      console.log(`Starting chat ${chat_id} with prompt: "${options.prompt}"`),
    );

  chat
    .command("save")
    .description("Save the final results of a conversation from a JSON file.")
    .argument("<chat_id>", "ID of the chat")
    .option("-f, --file <file_path>", "Path to the JSON results file")
    .action((chat_id, options) =>
      console.log(
        `Saving results for chat ${chat_id} from file: ${options.file}`,
      ),
    );

  chat
    .command("logs")
    .description("Pull down chat logs with filter criteria.")
    .option("--org <org>", "Organization name (required for filtering)", "All")
    .option("--search <query>", "Search for content within chats")
    .option("--limit <number>", "Limit the number of results", "10")
    .option("--page <number>", "Page number", "1")
    .option(
      "--order-by <field>",
      "Field to order by (e.g., created)",
      "created",
    )
    .option(
      "--order-direction <direction>",
      "Order direction (asc or desc)",
      "desc",
    )
    .option("--start-date <date>", "Start date (YYYY-MM-DD)")
    .option("--end-date <date>", "End date (YYYY-MM-DD)")
    .option("--pipeline-id <id>", "Filter by Notebook/Pipeline ID")
    .option(
      "--filter <key=value>",
      "Dynamic filters (e.g. user_id=123). Can be used multiple times.",
      (val: string, memo: string[]) => {
        memo.push(val);
        return memo;
      },
      [],
    )
    .addHelpText(
      "after",
      `
\nEXAMPLES:
  # Basic: Pull logs for an organization
  $ huggingplace chat logs --org acme

  # Date Range: Logs from Feb 1st to Feb 18th, 2024
  $ huggingplace chat logs --org acme --start-date 2024-02-01 --end-date 2024-02-18

  # Search & Filter: Find logs containing "error" with limit
  $ huggingplace chat logs --org acme --search "error" --limit 50

  # Sort by specific field
  $ huggingplace chat logs --org acme --order-by response_time --order-direction desc

SETUP:
  Ensure your API key is set:
  $env:HUGGINGPLACE_API_KEY = "your_key" (Windows)
  export HUGGINGPLACE_API_KEY="your_key" (Linux/macOS)
`,
    )
    .action(async (options) => {
      const config = readConfig();
      let baseUrl = config.apiUrl || DEFAULT_BASE_URL;

      // Clean up base URL if user provided trailing slashes or /api suffix
      if (baseUrl.endsWith("/api")) baseUrl = baseUrl.slice(0, -4);
      if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);

      const apiKey = config.apiKey;

      const params: any = {
        org: options.org,
        limit: options.limit,
        page: options.page,
        order_by: options.orderBy,
        order_direction: options.orderDirection,
      };

      if (options.search) params.search = options.search;
      if (options.startDate) params.start_date = options.startDate;
      if (options.endDate) params.end_date = options.endDate;
      if (options.pipelineId) params.pipelineId = options.pipelineId;

      // Process dynamic filters
      if (options.filter && Array.isArray(options.filter)) {
        options.filter.forEach((f: string) => {
          const parts = f.split("=");
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join("=").trim();
            params[key] = value;
          }
        });
      }

      const endpoint = `${baseUrl}/notebook/filtered_chat`;
      console.log(`Fetching logs from: ${endpoint}`);
      console.log("Filter criteria:", params);

      try {
        const response = await axios.get(endpoint, {
          params,
          headers: apiKey ? { "x-api-key": apiKey } : {},
        });

        const data = response.data;
        if (data && Array.isArray(data.chats)) {
          console.log(
            `\nFound ${data.totalChats} logs (showing ${data.chats.length}):`,
          );
          if (data.chats.length > 0) {
            const tableData = data.chats.map((c: any) => ({
              ID: c.id,
              User: c.user_data?.user_name || "Unknown",
              Prompt: c.conversation
                ? c.conversation.length > 40
                  ? c.conversation.substring(0, 40) + "..."
                  : c.conversation
                : "",
              Response: c.prompt_response
                ? c.prompt_response.length > 40
                  ? c.prompt_response.substring(0, 40) + "..."
                  : c.prompt_response
                : "",
              Time: c.response_time || "N/A",
              Created: c.createdAt
                ? new Date(c.createdAt).toLocaleString()
                : "N/A",
            }));
            console.table(tableData);
          } else {
            console.log("No logs found matching criteria.");
          }
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error: any) {
        console.error("Error fetching logs:", error.message);
        if (error.response) {
          console.error("Status:", error.response.status);
          if (error.response.status === 401 || error.response.status === 403) {
            console.error("Authentication failed. Please check your API Key.");
          }
        }
      }
    });

  return chat;
};
