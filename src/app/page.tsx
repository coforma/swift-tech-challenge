import { GridContainer } from "@trussworks/react-uswds";
import { College, CollegeType } from "./types";
import { CollegeCard } from "./components/cards/CollegeCard";
import dynamoClient from "./utils/dynamodb-lib";

export default async function Home() {
  const params1 = {
    TableName: "institutions",
    Key: { institutionId: 110608, recordType: "data" },
  };
  const params2 = {
    TableName: "institutions",
    Key: { institutionId: 134130, recordType: "data" },
  };
  const college1 = await dynamoClient.get(params1);
  const college2 = await dynamoClient.get(params2);
  const cards: College[] = [
    {
      id: college1?.Item?.institutionId,
      img: "",
      name: college1?.Item?.institutionName,
      city: college1?.Item?.city,
      state: college1?.Item?.state,
      description: college1?.Item?.description,
      type: CollegeType.PUBLIC,
      populationAmount: 0,
      gradRate: college1?.Item?.completionRates.fourYearInstitution,
      avgCost: college1?.Item?.publicNetPrice.averagePrice,
    },
    {
      id: college2?.Item?.institutionId,
      img: "",
      name: college2?.Item?.institutionName,
      city: college2?.Item?.city,
      state: college2?.Item?.state,
      description: college2?.Item?.description,
      type: CollegeType.PUBLIC,
      populationAmount: 0,
      gradRate: college2?.Item?.completionRates.fourYearInstitution,
      avgCost: college2?.Item?.publicNetPrice.averagePrice,
    },
  ];

  return (
    <main>
      <GridContainer>
        <h1> Browse Schools </h1>
        <ul className="usa-card-group">
          {cards.map((card) => (
            <CollegeCard key={card.id} card={card} />
          ))}
        </ul>
      </GridContainer>
    </main>
  );
}
