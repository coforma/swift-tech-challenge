import {
  maskCurrency,
  maskPercentage,
  maskThousands,
  noDataAvailable,
} from "@/src/app/utils/masking";

describe("Test masks", () => {
  test("Floats mask to percentages correctly", () => {
    expect(maskPercentage(0.562)).toBe("56%");
    expect(maskPercentage(0.5623454322453)).toBe("56%");
    expect(maskPercentage(0.1)).toBe("10%");
    expect(maskPercentage(0.567)).toBe("57%");
    expect(maskPercentage(0.65)).toBe("65%");
    expect(maskPercentage(undefined)).toBe(noDataAvailable);
    expect(maskPercentage(NaN)).toBe(noDataAvailable);
  });

  test("Strings mask with thousands separators correctly", () => {
    expect(maskThousands(0.4431)).toBe("0");
    expect(maskThousands(0.562)).toBe("1");
    expect(maskThousands(100)).toBe("100");
    expect(maskThousands(1000)).toBe("1,000");
    expect(maskThousands(100000)).toBe("100,000");
    expect(maskThousands(undefined)).toBe(noDataAvailable);
    expect(maskThousands(NaN)).toBe(noDataAvailable);
  });

  test("Strings mask with currency & thousands separators correctly", () => {
    expect(maskCurrency(0.4431)).toBe("$0");
    expect(maskCurrency(0.562)).toBe("$1");
    expect(maskCurrency(100)).toBe("$100");
    expect(maskCurrency(1000)).toBe("$1,000");
    expect(maskCurrency(100000)).toBe("$100,000");
    expect(maskCurrency(undefined)).toBe(noDataAvailable);
    expect(maskCurrency(NaN)).toBe(noDataAvailable);
  });
});
