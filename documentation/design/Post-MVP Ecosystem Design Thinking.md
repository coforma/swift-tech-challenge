# Post-MVP Ecosystem Design Thinking

To iterate on our MVP goals and designs, we focused on items in our [**prioritization matrix**](https://github.com/coforma/swift-tech-challenge/blob/main/documentation/design/prioritization%20matrix.pdf) that held high user value. We did not have sufficient capacity in our initial sprint to build these concepts, hence we drafted the following guiding thoughts and wireframes.

## Enable users to shortlist colleges and track applications 

1. **Creating an account to store their information**: Students may want to manage their college search and application process within just one website. Allowing users to create accounts and store their data encourages students to make smart return visits. (While authentication isn’t necessarily a feature users would directly want, it is an enabler for the capabilities listed below.)

![Screenshot of a mural with thinking about what fields might make up the student object, where the entry points might be, and how to present a profile](https://github.com/coforma/swift-tech-challenge/assets/122126772/5540f4a3-5f2d-42cc-b0be-1eff4eba5837)


2. **Selecting and saving colleges to a shortlist**: Students may want to save colleges to a list that they can edit and continue to add to over time. 

![Screenshots of prototype with a favorite icon and a favorites list](https://github.com/coforma/swift-tech-challenge/assets/122126772/f8112b7a-6700-4e51-9c57-f183c36d4c5b)


3. **Tracking applications**: Students who have submitted applications to different colleges may benefit from application status tracking, which would allow students to view which applications are in-progress, submitted, and unfinished. 

<img width="1728" alt="Applications page" src="https://github.com/coforma/swift-tech-challenge/assets/122126772/a9ffecd2-e99e-41cb-97e2-575cc6909644">


## Support for first-generation college students

Students first in their family to go to college face additional obstacles in attending. The application and enrollment process is unintuitive and a lack of clarity regarding costs and financial aid can cause confusion. After launching the initial functionality, we’d like to focus on supporting this population with additional tools and content, which—in addition to supporting a more straightforward enrollment experience—could have the added benefit of exposing students to college options they hadn’t considered.


1. **Guiding and educating through a ‘College match’ quiz**: There is an incredible amount of data about colleges for students to read through as they compare options. While we did restrict our filters to a set we believed to be most useful for prospective students, we also believe that a guided walkthrough of a few of the filters—structured as a “My College Matches” quiz—would be helpful. 

![Screenshot of a college quiz experience](https://github.com/coforma/swift-tech-challenge/assets/122126772/6c3e2998-3033-4bbc-8768-d3f434e58bed)


2. **Viewing net cost by income level when browsing colleges**: College costs can be intimidating and unclear. We made an assumption that the nuances of many of the cost fields provided could be confusing, and thus looked for ways to clarify in the tool post-MVP. We considered that, for students from low-income backgrounds, the average net cost might vary significantly from the average cost for students across all income levels. We explored a feature that could display the average cost for a specific income bracket on the college card by asking users to select their income bracket. We would definitely want to test this with users, because there is a risk that students and families could be even more confused.

![Screenshots of early design thinking around a college cost estimator](https://github.com/coforma/swift-tech-challenge/assets/122126772/332d235e-9e4c-41ac-8fdf-95f69e0f32bc)


3. **Providing educational content on applying and financing**: Students who do not have an accurate mental model of how college and financial aid works may need extra content to help them build that mental model, and thus be better equipped to successfully enroll and graduate from an affordable college. We explored the creation of [**static content**](https://github.com/coforma/swift-tech-challenge/blob/main/documentation/design/static_content.md) about applying to and paying for college using chat GPT, and verified the information with an internal subject matter expert. It would be interesting to explore the best way to surface and present this information in user research.
