# HuggingPlace CLI

The official command-line interface for the HuggingPlace Platform.

## Overview

The HuggingPlace CLI is a powerful tool designed to help developers interact with the HuggingPlace platform directly from their terminal. It facilitates tasks such as managing data collections, running evaluation pipelines, debugging chat logs, and anonymizing sensitive data.

## Installation

### From Source (Development)

1.  Navigate to the CLI directory:
    ```bash
    cd huggingplace-cli
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run commands using `npm start`:
    ```bash
    npm start -- <command> [options]
    ```

### Global Link (Optional)

To use the `hplace` command globally on your system:

```bash
npm run build
npm link
hplace --help
```

## Authentication

To interact with the platform, you need to authenticate using your API Key. You can set this up in two ways:

### 1. Environment Variables (Recommended)

Set the `BUTTRBASE_API_KEY` environment variable. This is ideal for CI/CD pipelines and avoiding manual configuration.

**Windows (PowerShell):**

```powershell
$env:BUTTRBASE_API_KEY = "your-api-key"
```

**Mac/Linux:**

```bash
export BUTTRBASE_API_KEY="your-api-key"
```

### 2. Config Command

Manually save your API key to the local configuration file:

```bash
npm start -- config set --api-key "your-api-key"
```

Verify your configuration:

```bash
npm start -- config show
```

## Key Features

### 🔍 Chat Logs & Debugging

Retrieve and analyze chat logs directly from the platform. Supports advanced filtering to find exactly what you need.

**Command:** `chat logs`

**Options:**

- `--org <name>`: **(Required)** Filter by Organization name.
- `--search <text>`: Search for specific text within conversations.
- `--start-date <YYYY-MM-DD>`: Filter logs from this date.
- `--end-date <YYYY-MM-DD>`: Filter logs up to this date.
- `--pipeline-id <id>`: Filter by specific Notebook/Pipeline ID.
- `--filter <key=value>`: Apply dynamic filters (e.g., `user_id=123`, `email=bob@example.com`).
- `--limit <number>`: Limit results (default: 10).
- `--order-by <field>`: Sort field (default: `created`).

**Example:**

```bash
npm start -- chat logs --org "AcmeCorp" --filter user_id=42 --limit 5
```

### 🤖 AI Assistance

Stuck? Ask the built-in AI assistant for help with CLI commands or development tasks.

**Command:** `help-llm`

**Example:**

```bash
npm start -- help-llm "How do I create a new collection?"
```

## Command Reference

### Configuration

- `config set`: Save configuration (API Key).
- `config show`: Display current configuration.

### Chat

- `chat start <chat_id>`: Start a conversation.
- `chat save <chat_id>`: Save conversation results to a file.
- `chat logs`: Pull down chat logs with filters (see above).

### Collections & Documents

- `collections list`: List all data collections.
- `collections create`: Create a new collection.
- `collections delete <id>`: Delete a collection.
- `collections add-item <id>`: Add an item to a collection.
- `collections query <id>`: Ask a question to a collection (RAG).
- `documents list`: List uploaded documents.
- `documents upload <file>`: Upload a document.

### Pipelines

- `pipelines list`: List prompt pipelines.
- `pipelines create`: Create a pipeline from JSON.
- `pipelines get <id>`: Get pipeline details.
- `pipelines add-test-case <id>`: Add a test case.
- `pipelines run <id>`: Execute a pipeline.

### Evaluations

- `evals list`: List evaluation runs.
- `evals get-results <test_id>`: Get detailed results.
- `evals run-comparison`: Run a RAG comparison test.

### Data Management

- `data list-labels`: List custom labels.
- `data create-label`: Create a new label.
- `data label-chat <id>`: Apply a label to a chat.
- `data get-labeled-chats`: Export labeled data.

### Anonymizer

- `anonymizer submit-collection-job`: Start batch anonymization.
- `anonymizer check-job-status`: Check job status.
- `anonymizer anonymize-text`: Anonymize a single text block.

### Server

- `server start`: Start the CLI as a local WebSocket server (default port: 8080).

## Contributing

1.  Clone the repository.
2.  Run `npm install`.
3.  Make changes in `src/`.
4.  Test with `npm start -- <command>`.
