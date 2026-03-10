# Exercise 6: Complete Implementation

## Overview
This exercise contains the complete implementation of all features from exercises 1-5:
- Multiple activities with error simulation
- Signal handling for approval
- Query handlers for status tracking
- Search attributes for workflow filtering
- Activity summaries for observability

## Running the Exercise

1. Start the Temporal server:
```bash
temporal server start-dev --search-attribute AccountId=Keyword
```

2. Run the worker:
```bash
npx ts-node exercise6/src/worker/index.ts
```

3. Execute the workflow:
```bash
npx ts-node exercise6/src/starter/index.ts
```

4. View workflow in Temporal UI: http://localhost:8233/namespaces/default/workflows

## Features Demonstrated
- Complete money transfer workflow
- Signal-based approval mechanism
- Query-based status monitoring
- Search attributes for filtering
- Activity summaries for observability
