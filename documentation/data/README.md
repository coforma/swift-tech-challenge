# Data

*Note: this file was moved into the documentation folder along with the raw_data folder provided to maintain for prosperity*

The data in this repository (under `raw_data`) is compiled from a number of sources.

## Institutions

The file `institutions.csv` contains information about colleges and universities in the United States.

The primary source of data is the Department of Education's College Scorecard.

To remove institutions with limited data, we removed all institutions that enroll fewer than 750 undergraduates, as well as institutions with a large number of null values in relevant data fields.

The fields with the name prefix `SPECIALTY_` are randomly generated. They were randomly generated because the data model to represent similar concepts in the College Scorecard data is distractingly complex. Forcing Offerors to understand that data model is not germane to the point of this Challenge Scenario.

There are no requirements or expectations to use all the data in `insitutions.csv` in the response to the Challenge Scenario. Offerors are encouraged to use what is useful to their designs, and to not use what is not useful.

## Application questions

The file `application_questions.csv` contains information about the applications for the same set of colleges and universities.

This information has been invented for this Challenge Scenario, drawing on a number of sources. It is not real data.

The institutions share a partially "common" application, with the following fields being identical for all institutions:

* First and last name
* Email
* Phone
* The first essay question (`QUESTION_LESSONS`)

Some institutions ask applicants to submit SAT scores, and some institutions do not.

The second essay question (`QUESTION_PROMPT_ONE`) rotates between one of three prompts. The third essay question (`QUESTION_PROMPT_TWO`) is randomly chosen and rarely repeats between institutions.

In order to complete an application, the user of the prototypes must fill out all prompts as described above.

All essay prompts are selected from either the [Common App](https://www.commonapp.org/apply/essay-prompts) or a lightly edited list of [New York Times writing prompts](https://www.nytimes.com/2018/04/12/learning/over-1000-writing-prompts-for-students.html).

In a user interface, Offerors are welcome to rephrase question titles or other content from how they are phrased in the data file, if that's deemed to be helpful for the user experience. For example, the user interface does not need to ask, "What is your SAT score?" just because that is the phrasing of the question in the spreadsheet. Please note these changes where appropriate.

## Institutions data dictionary

The file `institutions_data_dictionary.csv` is lightly modified from the Department of Education's College Scorecard to provide definitions for key fields in the `institutions.csv`. Fields have been limited to only those used in this challenge.

There are no requirements to use the names or "developer-friendly names" of the variables in your challenge response. This file is provided solely for informational purposes to help you understand the meaning of the data.

# Assumptions

If you wish to make assumptions about the data to facilitate your analysis and work, please feel free to do so. Please note these assumptions where appropriate.

Teams are also allowed to invent additional data or business logic rules, or join on other data sources, if they feel it would add to the quality of their submission. Please note these inventions and additions where appropriate.
