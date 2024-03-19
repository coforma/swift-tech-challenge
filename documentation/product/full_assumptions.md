# Full list of assumptions


<table>
  <tr>
   <td><strong>Topic</strong>
   </td>
   <td><strong>Assumption</strong>
   </td>
   <td><strong>Decision as a result</strong>
   </td>
  </tr>
  <tr>
   <td>Application
   </td>
   <td>We imagined that in June, 2020, Congress passed the Universal College Application Act that created just one application for all colleges in the US. It’s free to apply to all colleges, and applications are all due on <strong>May 1</strong> for enrollment in the following academic year.
   </td>
   <td>We simplified the application to only ask for the info in the supplied data.
   </td>
  </tr>
  <tr>
   <td>Application
   </td>
   <td>Colleges will send confirmation emails for a successful app submission and handle all subsequent communication with students
   </td>
   <td>Added message to submission confirmation page
   </td>
  </tr>
  <tr>
   <td>Application Tracking
   </td>
   <td>Students will want to track application progress in this tool so they can remember where they’ve applied
   </td>
   <td>Explore an authenticated experience in design to see what we can learn and how it can apply to our MVP, but don’t spend any dev time setting it up because we probably won't get to it.
   </td>
  </tr>
  <tr>
   <td>Authentication
   </td>
   <td>Students will want to try looking for colleges and applying without having to sign up
   </td>
   <td>Build core feature set as an unauthenticated experience
   </td>
  </tr>
  <tr>
   <td>Browse Colleges
   </td>
   <td>Some students will know exactly what college they want to apply to, others won't know where to start
   </td>
   <td>We need search AND filter. And should allow students to apply directly from Browse without having to go to the detail page. While some will want to see details first.
   </td>
  </tr>
  <tr>
   <td>Browse Colleges
   </td>
   <td>Sighted highschool-aged students living in a very visual digital ecosystem won’t use the tool unless there are images to break up the dense data and content.
   </td>
   <td>Add images to card view – we don’t have them in our data, so generated using AI. In a real scenario we would investigate AI vs other content gathering and management approaches.
   </td>
  </tr>
  <tr>
   <td>Browse Colleges
   </td>
   <td>Most first-time students won’t understand the nuances of financial aid, especially if they’re the first in their families to go to college
   </td>
   <td>Surface relevant info about financial aid in plain language wherever we can without overwhelming the student
<p>
We’d like to explore displaying average cost by household income on the card view, but think it’s out of scope for the MVP
   </td>
  </tr>
  <tr>
   <td>Browse Colleges
   </td>
   <td>Students will want to see some data about a college from the list view so they can compare a large list easily
   </td>
   <td>Based on competitive research we think type, size, grade rate, and cost are most important to students and fit the brief, and surfaced these data points on the ‘college cards’
   </td>
  </tr>
  <tr>
   <td>College Data
   </td>
   <td>A subset of the data would not be enough to ensure a performant application in future iterations
   </td>
   <td>The mock data needed to be ingested to be used by the application
   </td>
  </tr>
  <tr>
   <td>College Data
   </td>
   <td>This data will be mostly stagnant, refreshing at most once or twice a year
   </td>
   <td>Build with focus on quick reads and filtering with less data having complex queries or inserts 
   </td>
  </tr>
  <tr>
   <td>College Data
   </td>
   <td>Students will be overwhelmed by the amount of data. Some curation of data is needed. Competitive research could indicate what we can prioritize, but would be good for future user research.
   </td>
   <td>Don’t show: longitude and latitude, SAT percentiles, faculty info beyond student:faculty ratio, instructional expenditures per student
   </td>
  </tr>
  <tr>
   <td>College Data
   </td>
   <td>Students will need plain-language explanation of a bunch of these fields
   </td>
   <td>Add explainer text to detail page
   </td>
  </tr>
  <tr>
   <td>College Data
   </td>
   <td>Most students won't understand the nuances of different completion rate data
   </td>
   <td>Choose one completion marker rather than show both – we chose the one that aligned with the same reporting time frame as ‘Retention’
   </td>
  </tr>
  <tr>
   <td>College Data
   </td>
   <td>Non degree and certificate programs are &lt;2 years, associate degree programs are 2 years, and bachelor’s and graduate degrees are 4+ years.
   </td>
   <td>Would need to validate with SMEs, but this seems broadly correct to use in our filters.
   </td>
  </tr>
  <tr>
   <td>Filters
   </td>
   <td>Students won’t want to filter based on every field, we need to narrow them down
   </td>
   <td>We chose filters we thought might appeal to first-time,  high-school aged students interests the most using competitive research, but user research on this would be ideal.
   </td>
  </tr>
  <tr>
   <td>Marketing
   </td>
   <td>We imagined there is a comprehensive strategy in place to market this tool and get users on this site
   </td>
   <td>We didn’t spend time considering SEO strategy or marketing
   </td>
  </tr>
  <tr>
   <td>Users
   </td>
   <td>The majority of users of this tool would be first-time college applicants between ages 15-25
   </td>
   <td>We will focus on this subset in our design
   </td>
  </tr>
</table>

