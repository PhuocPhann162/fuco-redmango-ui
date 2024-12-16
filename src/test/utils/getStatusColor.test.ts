import { describe, expect, test } from "@jest/globals";
import { getStatusColor } from "../../Helper";
import { SD_Status } from "../../Utility/SD";

describe("confirmed status module", () => {
  test("get status color", () => {
    expect(getStatusColor(SD_Status.CONFIRMED)).toBe("primary");
  });
});

describe("pending status module", () => {
  test("get status color", () => {
    expect(getStatusColor(SD_Status.PENDING)).toBe("secondary");
  });
});

describe("cancelled status module", () => {
  test("get status color", () => {
    expect(getStatusColor(SD_Status.CANCELLED)).toBe("danger");
  });
});

describe("completed status module", () => {
  test("get status color", () => {
    expect(getStatusColor(SD_Status.COMPLETED)).toBe("success");
  });
});

describe("being cooked status module", () => {
  test("get status color", () => {
    expect(getStatusColor(SD_Status.BEING_COOKED)).toBe("info");
  });
});

describe("ready for pickup status module", () => {
  test("get status color", () => {
    expect(getStatusColor(SD_Status.READY_FOR_PICKUP)).toBe("warning");
  });
});
