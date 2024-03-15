import {
  convertPercentage,
  convertToThousandsSeparatedString,
} from "@/src/app/utils/masking";

describe("test convert percentage", () => {
  test("test verify percentages are correct", () => {
    expect(convertPercentage(0.562)).toBe("56");
    expect(convertPercentage(0.5623454322453)).toBe("56");
    expect(convertPercentage(0.1)).toBe("10");
    expect(convertPercentage(0.567)).toBe("57");
    expect(convertPercentage(0.65)).toBe("65");
  });
});

describe("test comma separate", () => {
  test("test comma separation", () => {
    expect(convertToThousandsSeparatedString(0.4431)).toBe("0");
    expect(convertToThousandsSeparatedString(0.562)).toBe("1");
    expect(convertToThousandsSeparatedString(100)).toBe("100");
    expect(convertToThousandsSeparatedString(1000)).toBe("1,000");
    expect(convertToThousandsSeparatedString(100000)).toBe("100,000");
  });
});
