"use client";
// components
import { Card, CardBody, Link } from "@trussworks/react-uswds";
// types
import { College, CollegeType, Specialties } from "../../types";
import {
  maskCurrency,
  maskPercentage,
  maskThousands,
} from "../../utils/masking";

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
    <Card layout="standardDefault" headerFirst={true} className="card_details">
      <h2 className="card_details_header-title">Outcomes</h2>
      <CardBody>
        <div>
          <h3 className="card_details_section-header">Graduation rate</h3>
          <p className="card_details_section-text">
            The percent of students who finished their degree at this school
            within 4 years (for 2 year schools) or 8 years (for 4 year schools).
            This is calculated for full and part time students.
          </p>
          <p className="card_details_section-data-title">Graduation rate</p>
          <p className="card_details_section-data-highlight">
            {maskPercentage(college.completionRate)}
          </p>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">Retention rate</h3>
          <p className="card_details_section-text">
            Retention is the percent of first-time students who return to the
            same school the following year. This is calculated for full-time
            students only.
          </p>
          <p className="card_details_section-data-title">Retention rate</p>
          <p className="card_details_section-data-highlight">
            {maskPercentage(college.retentionRate)}
          </p>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">Earning potential</h3>
          <div className="card_details_section-data">
            <div>
              <p className="card_details_section-data-title">
                Average yearly earnings
              </p>
              <p className="card_details_section-data-highlight">
                {maskCurrency(college?.earnings?.meanGraduateEarnings10Years)}
              </p>
            </div>
            <div>
              <p className="card_details_section-data-title">
                Median yearly earnings
              </p>
              <p className="card_details_section-data-highlight">
                {maskCurrency(college?.earnings?.medianGraduateEarnings10Years)}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const AdmissionsCard = ({ college }: Props) => {
  return (
    <Card layout="standardDefault" headerFirst={true} className="card_details">
      <h2 className="card_details_header-title">Admissions</h2>
      <CardBody>
        <div>
          <h3 className="card_details_section-header">Admissions rate</h3>
          <p className="card_details_section-text">
            The percentage of applicants who are accepted for admission.
          </p>
          <p className="card_details_section-data-title">Admissions rate</p>
          <p className="card_details_section-data-highlight">
            {maskPercentage(college.admissionRate)}
          </p>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">SAT scores</h3>
          <p className="card_details_section-data-title">
            Average combined score
          </p>
          <p className="card_details_section-data-highlight">
            {maskThousands(college?.satScores?.satAverageScore)}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

const StudentBodyCard = ({ college }: Props) => {
  return (
    <Card layout="standardDefault" headerFirst={true} className="card_details">
      <h2 className="card_details_header-title">Student body</h2>
      <CardBody>
        <div className="card_details_section">
          <h3 className="card_details_section-header">Population</h3>
          <p className="card_details_section-data-title">Enrolled students</p>
          <p className="card_details_section-data-highlight">
            {maskThousands(college.population)}
          </p>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">
            Racial and ethnic diversity
          </h3>
          <div className="card_details_section-data">
            <div>
              <p className="card_details_section-data-title">
                American Indian/Alaska Native
              </p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentAian)}
              </p>
            </div>
            <div>
              <p className="card_details_section-data-title">Asian</p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentAsian)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">
                Black or African-American
              </p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentBlack)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">
                Hispanic or Latino
              </p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentHispanic)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">Multiracial</p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentTwoOrMore)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">
                Native Hawaiian/Pacific Islander
              </p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentNhpi)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">White</p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentWhite)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">Undocumented</p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentNonResidentAlien)}
              </p>
            </div>

            <div>
              <p className="card_details_section-data-title">Unknown</p>
              <p className="card_details_section-data-highlight">
                {maskPercentage(college?.demographics?.percentUnknownRace)}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const specialty = (specialty: string) => {
  return (
    <div>
      <p className="card_details_section-data-title">Specializes in</p>
      <p className="card_details_section-data-highlight">{specialty}</p>
    </div>
  );
};

const parseSpecialties = (specialties: Specialties) => {
  return (
    <div className="card_details_section-data">
      {specialties?.humanities && specialty("Humanities")}
      {specialties?.interdisciplinary && specialty("Interdisciplinary")}
      {specialties?.occupational &&
        specialty("Occupational and technical studies")}
      {specialties?.stem &&
        specialty("Science, technology, engineering, and math (STEM)")}
      {specialties?.socialScience && specialty("Social science")}
    </div>
  );
};

const AcademicsCard = ({ college }: Props) => {
  return (
    <Card layout="standardDefault" headerFirst={true} className="card_details">
      <h2 className="card_details_header-title">Academics</h2>
      <CardBody>
        <div>
          <h3 className="card_details_section-header">Degrees</h3>
          <div className="card_details_section-data">
            <div>
              <p className="card_details_section-data-title">
                Highest degree offered
              </p>
              <p className="card_details_section-data-highlight">
                {college.highestDegreeAwarded}
              </p>
            </div>
            <div>
              <p className="card_details_section-data-title">
                Main degree awarded
              </p>
              <p className="card_details_section-data-highlight">
                {college.predominantUndergradDegree}
              </p>
            </div>
          </div>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">Student/Faculty ratio</h3>
          <p className="card_details_section-data-title">Ratio</p>
          <p className="card_details_section-data-highlight">
            {college?.studentFacultyRatio}
          </p>
        </div>
        {college?.specialties && (
          <div className="card_details_section">
            <h3 className="card_details_section-header">Majors</h3>
            <div>{parseSpecialties(college?.specialties)}</div>
          </div>
        )}
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
  const under30 = maskCurrency(netPriceForType?.averagePriceUnder30k);
  const between30and40 = maskCurrency(
    netPriceForType?.averagePriceUnder30To48k,
  );
  const between40and70 = maskCurrency(
    netPriceForType?.averagePriceUnder48To75k,
  );
  const between75to110 = maskCurrency(
    netPriceForType?.averagePriceUnder75To110k,
  );
  const over110 = maskCurrency(netPriceForType?.averagePriceUnder110kPlus);
  return (
    <Card layout="standardDefault" headerFirst={true} className="card_details">
      <h2 className="card_details_header-title">Costs</h2>
      <CardBody>
        <div>
          <h3 className="card_details_section-header">Net price</h3>
          <p className="card_details_section-text">
            The net price is a school’s tuition and fees minus grants and
            scholarships. The net price you pay for a particular college is
            specific to you because it’s based on your personal circumstances
            and the college’s financial aid policies. Most people use savings
            and/or federal and parent loans to cover these costs. Use the
            college’s Net Price Calculator for the most accurate estimate for
            you (linked below)
          </p>
          <p className="card_details_section-data-title">Average net price</p>
          <p className="card_details_section-data-highlight">
            {maskCurrency(netPriceForType?.averagePrice)}
          </p>
        </div>
        {netPriceForType && (
          <div className="card_details_section">
            <h3 className="card_details_section-header">
              Average net price by household income
            </h3>
            <p className="card_details_section-text">
              Families are eligible for different amounts of financial aid from
              federal and state governments based on their income levels. After
              this optional financial aid is applied, college might cost
              significantly less. Remember you have to apply for financial aid
              to get it.
            </p>
            <table className="card_details_section-table">
              <thead>
                <tr>
                  <th>Household income</th>
                  <th>Average net price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"<$30,000"}</td>
                  <td>{under30 !== "--" ? `${under30} per year` : under30}</td>
                </tr>
                <tr>
                  <td>{"$30,000–48,000"}</td>
                  <td>
                    {between30and40 !== "--"
                      ? `${between30and40} per year`
                      : between30and40}
                  </td>
                </tr>
                <tr>
                  <td>{"$48,000–75,000"}</td>
                  <td>
                    {between40and70 !== "--"
                      ? `${between40and70} per year`
                      : between40and70}
                  </td>
                </tr>
                <tr>
                  <td>{"$75,000–110,000"}</td>
                  <td>
                    {between75to110 !== "--"
                      ? `${between75to110} per year`
                      : between75to110}
                  </td>
                </tr>
                <tr>
                  <td>{"$110,000+"}</td>
                  <td>{over110 !== "--" ? `${over110} per year` : over110}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="card_details_section">
          <h3 className="card_details_section-header">Tuition and fees</h3>
          <p className="card_details_section-text">
            Tuition is the price you pay for classes, and is listed here for
            full-time students. You would likely need to pay some fees to attend
            classes as well. Tuition and fees vary from college to college, and
            don’t include discounts from need-based grants or scholarships.
          </p>
          <div className="card_details_section-data">
            <div>
              <p className="card_details_section-data-title">In-state</p>
              <p className="card_details_section-data-highlight">
                {maskCurrency(college.tuitionInState)}
              </p>
            </div>
            <div>
              <p className="card_details_section-data-title">Out-of-state</p>
              <p className="card_details_section-data-highlight">
                {maskCurrency(college.tuitionOutOfState)}
              </p>
            </div>
          </div>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">Loans</h3>
          <p className="card_details_section-text">
            A federal loan is a type of financial aid provided by the government
            to help students and their families pay for higher education
            expenses, such as tuition, books, and living costs. Unlike grants or
            scholarships, which do not need to be repaid, loans require
            borrowers to repay the amount borrowed with interest.
          </p>
          <p className="card_details_section-data-title">
            Students with a federal loan
          </p>
          <p className="card_details_section-data-highlight">
            {maskPercentage(college.undergradWithFedLoan)}
          </p>
        </div>
        <div className="card_details_section">
          <h3 className="card_details_section-header">Net price calculator</h3>
          <p className="card_details_section-text">
            Every college has a different formula for financial aid. Net price
            calculators are free to use, and can help you get a sense of what
            this college might cost for your specific circumstances.
          </p>
          <Link href={college.npcUrl || "https://usa.gov"}>
            Calculate a customized price for you with financial aid applied
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

type Props = {
  college: College;
};
