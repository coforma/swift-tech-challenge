// ImageWithFallback.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ImageWithFallback } from "../../../../../components/utilities/ImageWithFallback";

describe("ImageWithFallback", () => {
  const testString = "12345678abcedfg";
  const imageProps = {
    src: `https://www.google.com/${testString}.png`,
    alt: "Test Image",
    height: 512,
    width: 512,
  };

  // normal case, image is found
  test("renders image, passes props", () => {
    render(<ImageWithFallback {...imageProps} />);
    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toContain(testString);
    expect(image).toHaveAttribute("alt", imageProps.alt);
    expect(image).toHaveAttribute("height", String(imageProps.height));
    expect(image).toHaveAttribute("width", String(imageProps.width));
  });

  test("switches to fallback image on error", () => {
    render(<ImageWithFallback {...imageProps} />);
    const image = screen.getByRole("img");
    fireEvent.error(image);
    expect(image).toBeVisible();
    expect(image).toHaveAttribute("alt", "Placeholder image");
  });
});
