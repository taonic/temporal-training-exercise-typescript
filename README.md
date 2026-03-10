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
