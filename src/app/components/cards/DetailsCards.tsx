"use client";
// components
import { Card, CardBody, CardHeader, Link } from "@trussworks/react-uswds";
// types
import { College, CollegeType } from "../../types";

export const DetailsCards = ({ college }: Props) => {
  return (
    <>
      <OutcomesCard college={college} />
      <AdmissionsCard college={college} />
      <StudentBodyCard college={college} />
      <AcademicsCard college={college} />
      <CostsCard college={college} />
    </>
  );
};

const OutcomesCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">Outcomes</h2>
      </CardHeader>
      <CardBody>
        <div>
          <p className="card_desc">
            <b>Graduation rate</b>
          </p>
          <p>
            The percent of students who finished their degree at this school
            within [4 or 8, conditionally] years. This is calculated for full
            and part time students.
          </p>
          <p>Graduation rate</p>
          <p>{college.completionRate}</p>
        </div>
        <div>
          <p className="card_desc">
            <b>Retention rate</b>
          </p>
          <p>
            Retention is the percent of first-time students who return to the
            same school the following year. This is calculated for full-time
            students only.
          </p>
          <p>Retention rate</p>
          <p>{college.retentionRate}</p>
        </div>
        <div>
          <p className="card_desc">
            <b>Earning potential</b>
          </p>
          <div>
            <p>Average yearly earnings</p>
            <p>{college?.earnings?.meanGraduateEarnings10Years}</p>
            <p>Median yearly earnings</p>
            <p>{college?.earnings?.medianGraduateEarnings10Years}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const AdmissionsCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">Admissions</h2>
      </CardHeader>
      <CardBody>
        <div>
          <p className="card_desc">
            <b>Admissions rate</b>
          </p>
          <p>The percentage of applicants who are accepted for admission.</p>
          <p>Admissions rate</p>
          <p>{college.admissionRate}</p>
        </div>
        <div>
          <p className="card_desc">
            <b>SAT scores</b>
          </p>
          <p>Average combined score</p>
          <p>{college?.satScores?.satAverageScore}</p>
        </div>
      </CardBody>
    </Card>
  );
};

const StudentBodyCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">Student body</h2>
      </CardHeader>
      <CardBody>
        <div>
          <p className="card_desc">
            <b>Population</b>
          </p>
          <p>Enrolled students</p>
          <p>{college.population}</p>
        </div>
        <div>
          <div>
            <p className="card_desc">
              <b>Racial and ethnic diversity</b>
            </p>
            <p>American Indian/Alaska Native</p>
            <p>{college?.demographics?.percentAian}</p>
            <p>Asian</p>
            <p>{college?.demographics?.percentAsian}</p>
            <p>Black or African-American</p>
            <p>{college?.demographics?.percentBlack}</p>
          </div>
          <div>
            <p>Hispanic or Latino</p>
            <p>{college?.demographics?.percentHispanic}</p>
            <p>Multiracial</p>
            <p>{college?.demographics?.percentTwoOrMore}</p>
            <p>Native Hawaiian/Pacific Islander</p>
            <p>{college?.demographics?.percentNhpi}</p>
          </div>
          <div>
            <p>White</p>
            <p>{college?.demographics?.percentWhite}</p>
            <p>Undocumented</p>
            <p>{college?.demographics?.percentNonResidentAlien}</p>
            <p>Unknown</p>
            <p>{college?.demographics?.percentUnknownRace}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const parseSpecialties = (specialties: any) => {
  specialties;
  return <p>specialties here</p>;
};

const AcademicsCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">Academics</h2>
      </CardHeader>
      <CardBody>
        <div>
          <p className="card_desc">
            <b>Degrees</b>
          </p>
          <div>
            <p>Highest degree offered</p>
            <p>{college.highestDegreeAwarded}</p>
          </div>
          <div>
            <p>Main degree awarded</p>
            <p>{college.predominantUndergradDegree}</p>
          </div>
        </div>
        <div>
          <p className="card_desc">
            <b>Student/Faculty ratio</b>
          </p>
          <p>Ratio</p>
          <p>{college?.studentFacultyRatio}</p>
        </div>
        <div>
          <p className="card_desc">
            <b>Majors</b>
          </p>
          {parseSpecialties(college?.specialties)}
        </div>
      </CardBody>
    </Card>
  );
};

const getNetPrice = (college: College) => {
  if (college.type === CollegeType.PUBLIC) {
    return college?.netPricePublic;
  } else {
    return college?.netPricePrivate;
  }
};

const CostsCard = ({ college }: Props) => {
  const netPriceForType = getNetPrice(college);
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">Costs</h2>
      </CardHeader>
      <CardBody>
        <div>
          <p className="card_desc">
            <b>Net price</b>
          </p>
          <p>
            The net price is a school’s tuition and fees minus grants and
            scholarships. The net price you pay for a particular college is
            specific to you because it’s based on your personal circumstances
            and the college’s financial aid policies. Most people use savings
            and/or federal and parent loans to cover these costs. Use the
            college’s Net Price Calculator for the most accurate estimate for
            you (linked below)
          </p>
          <p>Average net price</p>
          <p>{netPriceForType?.averagePrice}</p>
        </div>
        <div>
          <p className="card_desc">
            <b>Average net price by household income</b>
          </p>
          <p>
            Families are eligible for different amounts of financial aid from
            federal and state governments based on their income levels. After
            this optional financial aid is applied, college might cost
            significantly less. Remember you have to apply for financial aid to
            get it.
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <b>Household income</b>
                </th>
                <th>
                  <b>Average net price</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"<$30,000"}</td>
                <td>{netPriceForType?.averagePriceUnder30k}</td>
              </tr>
              <tr>
                <td>{"$30,000–48,000"}</td>
                <td>{netPriceForType?.averagePriceUnder30To48k}</td>
              </tr>
              <tr>
                <td>{"$48,000–75,000"}</td>
                <td>{netPriceForType?.averagePriceUnder48To75k}</td>
              </tr>
              <tr>
                <td>{"$75,000–110,000"}</td>
                <td>{netPriceForType?.averagePriceUnder75To110k}</td>
              </tr>
              <tr>
                <td>{"$110,000+"}</td>
                <td>{netPriceForType?.averagePriceUnder110kPlus}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="card_desc">
            <b>Tuition and fees</b>
          </p>
          <p>
            Tuition is the price you pay for classes, and is listed here for
            full-time students. You would likely need to pay some fees to attend
            classes as well. Tuition and fees vary from college to college, and
            don’t include discounts from need-based grants or scholarships.
          </p>
          <div>
            <p>In-state</p>
            <p>{college.tuitionInState}</p>
          </div>
          <div>
            <p>Out-of-state</p>
            <p>{college.tuitionOutOfState}</p>
          </div>
        </div>
        <div>
          <p className="card_desc">
            <b>Loans</b>
          </p>
          <p>
            A federal loan is a type of financial aid provided by the government
            to help students and their families pay for higher education
            expenses, such as tuition, books, and living costs. Unlike grants or
            scholarships, which do not need to be repaid, loans require
            borrowers to repay the amount borrowed with interest.
          </p>
          <p>Students with a federal loan</p>
          <p>{college.undergradWithFedLoan}</p>
        </div>
        <div>
          <p className="card_desc">
            <b>Net price calculator</b>
          </p>
          <p>
            Every college has a different formula for financial aid. Net price
            calculators are free to use, and can help you get a sense of what
            this college might cost for your specific circumstances.
          </p>
          <Link href={college.npcUrl || "https://usa.gov"}>
            Calculate a customized price for you with the financial aid applied
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

type Props = {
  college: College;
};
