# HuggingPlace CLI

The official command-line interface for the HuggingPlace Platform.

## Overview

The HuggingPlace CLI is a powerful tool designed to help developers interact with the HuggingPlace platform directly from their terminal. It facilitates tasks such as managing data collections, running evaluation pipelines, debugging chat logs, and anonymizing sensitive data.

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>

# 2. Install and build
npm install
npm run build
npm link
```

---

## 🚀 Quick Start

### 1. Setup API Key

You must set your API key as an environment variable before running commands.

**Windows (PowerShell):**

```powershell
$env:HUGGINGPLACE_API_KEY = "your_api_key_here"
```

**Linux / macOS:**

```bash
export HUGGINGPLACE_API_KEY="your_api_key_here"
```

### 2. Common Commands

#### Pull Logs for an Organization

```bash
huggingplace chat logs --org your_organization_name
```

#### Filter by Date Range (format: YYYY-MM-DD)

```bash
huggingplace chat logs --org your_organization_name --start-date 2024-02-01 --end-date 2024-02-18
```

#### Search Logs

```bash
huggingplace chat logs --org your_organization_name --search "error" --limit 50
```

---

## Key Features

### 🔍 Chat Logs & Debugging

Retrieve and analyze chat logs directly from the platform. Supports advanced filtering to find exactly what you need.

**Command:** `huggingplace chat logs`

**Options:**

- `--org <name>`: **(Required)** Filter by Organization name (e.g., `acme`).
- `--search <text>`: Search for specific text within conversations.
- `--start-date <YYYY-MM-DD>`: Filter logs from this date.
- `--end-date <YYYY-MM-DD>`: Filter logs up to this date.
- `--limit <number>`: Limit results (default: 10).
- `--page <number>`: Page number for pagination.
- `--order-by <field>`: Sort field (default: `created`).
- `--order-direction <asc|desc>`: Sort direction (default: `desc`).
- `--pipeline-id <id>`: Filter by specific Notebook/Pipeline ID.
- `--filter <key=value>`: Apply dynamic filters (e.g., `user_id=123`).

### 🤖 AI Assistance

Stuck? Get help directly from the CLI.

**Command:** `huggingplace help-llm`

---

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
- `pipelines get <id>`: Get pipeline details.

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
