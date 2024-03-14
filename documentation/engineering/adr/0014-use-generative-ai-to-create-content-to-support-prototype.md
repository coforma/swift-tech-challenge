# 14. Use Generative AI to create content to support prototype

Date: 2024-03-14

## Status

Accepted

## Context

The primary users of the site are between 15 - 24. To support this demographic we needed additional content to be generated, descriptions and images.

## Decision

Adjust the data ingestion flows to incorporate Amazon Bedrock, LLM models, to generate descriptions and images for the ingested schools.

### Description Generation
Using the Jurassic Mid Model offered by AWS we are able to create descriptions for the institutions.

### Description Generation
Using the Titan Image generation model offered by AWS we are able to create descriptions for the institutions.

### Updated ingestion flow
We have updated the data ingestion flow to include a more streamlined approach that has additional Lambda functions, each with a single responsibility.

**ingest-applications:** Ingests the application questions into Dynamo
**ingest-institutions:** Ingests the institutions into Dynamo and drops a message into two separate queues, one for generating descriptions and one for generating images.
**get-institution-description-from-bedrock:** generates descriptions about the institution from from the Jurassic Mid LLM and then updates the dynamo record that was created
**get-institution-image-from-bedrock:** generates descriptions about the institution from from the Titan Image and then updates the dynamo record that was created. Puts the image into S3 as a base64 encoded string

Diagram is [here](../diagrams/etl-ai-ingestion-flow.png)

*Note:* AI generation lambdas intentionally throttled to not exceed Bedrock call limits. Image generation is restricted to 60 calls in a minute. Text generation 1000 calls in a minute.

## Consequences

This is not a long term solution as AI generation has proved to be unpredictable in the past. This is a stop gap due to the duration of the challenge and the inability to gather descriptions and images to meet the demand of the prototype during the time constraints
