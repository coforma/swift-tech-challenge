import { CollegeCard, DetailsCards } from "@/src/app/components";
import { College, CollegeType } from "../types";

const testCollege: College = {
  id: 123456,
  name: "Test College",
  city: "Edtown",
  state: "AZ",
  description: "Description of college",
  type: CollegeType.PUBLIC,
  population: 15000,
  completionRate: 0.4784,
  avgCost: 5687.0,
  img: "",
  zip: "16801",
  url: "web",
  predominantUndergradDegree: "Associate's",
  highestDegreeAwarded: "Bachelor's",
  earnings: {
    meanGraduateEarnings10Years: 123,
    medianGraduateEarnings10Years: 124,
  },
  retentionRate: 90,
  admissionRate: 55,
  satScores: {
    satAverageScore: 1200,
    satMathPercentile25: 400,
    satMathPercentile50: 600,
    satMathPercentile75: 700,
    satReadingPercentile25: 350,
    satReadingPercentile50: 650,
    satReadingPercentile75: 720,
    satWritingPercentile25: 410,
    satWritingPercentile50: 590,
    satWritingPercentile75: 730,
  },
  demographics: {
    percentAian: 1,
    percentAsian: 15,
    percentBlack: 15,
    percentHispanic: 5,
    percentNhpi: 0,
    percentNonResidentAlien: 4,
    percentTwoOrMore: 1,
    percentUnknownRace: 2,
    percentWhite: 55,
  },
  studentFacultyRatio: 10,
  specialties: {
    humanities: false,
    interdisciplinary: false,
    occupational: true,
    socialScience: true,
    stem: true,
  },
  netPricePublic: {
    averagePrice: 58000,
    averagePriceUnder30k: 27000,
    averagePriceUnder30To48k: 37000,
    averagePriceUnder48To75k: 67000,
    averagePriceUnder75To110k: 97000,
    averagePriceUnder110kPlus: 117000,
  },
  tuitionInState: 20000,
  tuitionOutOfState: 48000,
  undergradWithFedLoan: 78,
  npcUrl: "https://www.sdmesa.edu/",
};

export default function InstitutionDetails({
  params,
}: {
  params: { slug: number };
}) {
  return (
    <main>
      <ul className="usa-card-group">
        <CollegeCard key={params.slug} college={testCollege} />
        <DetailsCards key={params.slug} college={testCollege} />
      </ul>
    </main>
  );
}
