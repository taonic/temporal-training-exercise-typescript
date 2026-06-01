# Temporal Training Exercise - TypeScript

Complete TypeScript implementation for progressive Temporal training exercises.

## Prerequisites
- Node.js 18+
- Temporal CLI

### Installing Temporal CLI

**macOS (Homebrew):**
```bash
brew install temporal
```

**Linux:**
```bash
curl -sSf https://temporal.download/cli.sh | sh
```

## Setup

1. Start Temporal dev server with AccountId and TransferStatus search attributes:
```bash
temporal server start-dev --search-attribute AccountId=Keyword --search-attribute TransferStatus=Keyword
```

2. Install dependencies:
```bash
npm install
```

## Exercise Progression

### [Exercise 1: Hello Temporal](exercise1/) (30 min)
- Basic Workflow and Activity setup
- Worker registration and execution

### [Exercise 2: Money Transfer Basics](exercise2/) (30 min)
- Multiple activities (withdraw, deposit, refund)
- Signal-based approval mechanism via `setHandler()`
- `condition()` for conditional waiting
- Basic error handling and compensation

### [Exercise 3: Query Handlers](exercise3/) (30 min)
- Query methods for workflow state inspection via `defineQuery()` + `setHandler()`
- Status tracking throughout execution
- External workflow monitoring

### [Exercise 4: Visibility & Monitoring](exercise4/) (30 min)
- Custom Search Attributes (AccountId)
- `upsertSearchAttributes()` from workflows
- Workflow filtering and discovery

### [Exercise 5: User Metadata & Activity Summaries](exercise5/) (30 min)
- Activity summaries via `proxyActivities` `summary` option
- Enhanced monitoring in Temporal Web UI

### [Exercise 6: Testing Strategy](exercise6/) (30 min)
- Unit tests with `@temporalio/testing`
- Time skipping for fast tests
- Activity mocking in tests

### [Exercise 7: Manual Activity Retry](exercise7/) (30 min)
- Manual retry pattern using signals
- Invalid data handling scenarios
- Disabling automatic retries
- Interactive retry commands

### [Exercise 8: Workflow Versioning](exercise8/) (30 min)
- Workflow versioning with `patched()` API
- Safe workflow evolution and backward compatibility
- Replay testing for version validation
- Handling multiple workflow versions in production

## Running Solutions

```bash
# Start worker (in one terminal)
npx ts-node solution1/src/worker/index.ts

# Run workflow (in another terminal)
npx ts-node solution1/src/starter/index.ts
```

Replace `solution1` with any exercise/solution number.

## Running Tests

```bash
npm test
```

## Vue Course Website

Start the Vue course app:

```bash
npm run course:serve
```

Open http://127.0.0.1:4173 to use the two-panel course view. The left panel shows editable source tabs for the selected exercise, and the right panel shows instructions, task tracking, run commands, and solution notes.

The course data is generated from `exercise*/README.md`, the in-browser walkthrough in `exercise*/ONLINE_GUIDE.md` (with `exercise*/OFFLINE_GUIDE.md` holding the equivalent local-terminal version), and each exercise's `src` files.

### Daytona Live Runner

In another terminal, start the Daytona-backed runner:

```bash
DAYTONA_KEY=your_daytona_key npm run course:sandbox
```

The Vue app proxies `/api` to the runner in development. When the runner is available, students can launch a Daytona sandbox, upload their edited TypeScript files, run the worker and starter, and open the signed Temporal UI preview URL.

Build the static Vue bundle:

```bash
npm run course:build
```
