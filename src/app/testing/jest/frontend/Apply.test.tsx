import Page from "@/src/app/[id]/apply/page";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

const Apply = Page({ params: { id: "123" } });

jest.mock("../../../utils/institutions", () => ({
  getInstitutionApplication: () =>
    Promise.resolve({
      questions: [
        "First and last name",
        "Email",
        "Phone",
        "No SAT score required.",
        "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
        "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
        "Where Do You Stand on Unconcealed Handguns?",
      ],
      institutionName: "California State University-Northridge",
      institutionId: 123,
      recordType: "application",
    }),
}));

describe("Test Application Page", () => {
  it("should render the application page", async () => {
    await act(async () => {
      await render(Apply);
    });
    expect(
      screen.getByText("California State University-Northridge"),
    ).toBeVisible();
  });

  it("should show all questions", async () => {
    await act(async () => {
      await render(Apply);
    });
    expect(screen.getByText("First name (required)")).toBeVisible();
    expect(screen.getByText("Last name (required)")).toBeVisible();
    expect(screen.getByText("Phone number (required)")).toBeVisible();
    expect(screen.getByText("Email (required)")).toBeVisible();
    expect(screen.getByText("Writing")).toBeVisible();
    expect(screen.getByText("Essay Question 1 (required)")).toBeVisible();
  });
});

describe("Test Application page accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = render(Apply);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
