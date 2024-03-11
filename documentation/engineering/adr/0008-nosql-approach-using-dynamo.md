# 8. NoSql Approach using Dynamo

Date: 2024-03-11

## Status

Accepted

## Context

There are multiple ways to store data for the application. You could us a relational approach to better support OLAP queries or a NoSQL approach to better support OLTP operations.

## Decision

### Storage

For storing data about institutions we settled on a NoSQL approach. This came down to three overarching factors that weighed in.

1. The data is not likely to change very often, thus the need to update data about institutions will happen at a much lower frequency when compared with the need to browse institutions.
2. We are going to attempt to load all of the data about institutions into the browser to see if we can get lightning fast filtering
3. We can get the information about institutions into a single table design that will have institution information and questions so we can do fast lookup of an institution and its application through use of the partition key on the table.

You can view the table [here](../diagrams/institutions-single-table-design.png)

### Ingestion

First pass on ingestion is to put the institutions file into an S3 bucket to be processed by a Lambda trigger. The lambda will watch for new files being created and then processes the CSV and write it into dynamo.

You can view the ETL flow [here](../diagrams/etl-flow-data-ingestion.png
)
_This will likely need refactored due to the number of records and the missing data needed to complete the prototype_

## Consequences

1. Advanced queries will be slow, possibly requiring a refactoring of the data should a use case arrive where we need them
2. We're assuming we can load all of that data from Dynamo into the front end and do a lot of quick filtering. We might have to refactor the data into a smaller payload or introduce DAX cache mechanisms to get the performance that we're after 
