import { random, timeOfDay } from "../utils";

describe("random", () => {
  it("returns a number between 0 and 9 by default", () => {
    const rand = random();
    expect(rand).toBeGreaterThanOrEqual(0);
    expect(rand).toBeLessThanOrEqual(9);
  });

  it("allows passing in a larger range", () => {
    const rand = random(1000);
    expect(rand).toBeGreaterThanOrEqual(0);
    expect(rand).toBeLessThanOrEqual(999);
  });
});

describe("timeOfDay", () => {
  it("returns the expected time of day for AM/PM time strings", () => {
    const morningAmTimeString = new Date("1/1/2023 8:00 AM").toLocaleTimeString(
      [],
      {
        hour: "2-digit",
      }
    );
    const afternoonPmTimeString = new Date(
      "1/1/2023 2:00 PM"
    ).toLocaleTimeString([], {
      hour: "2-digit",
    });
    const eveningPmTimeString = new Date("1/1/2023 6:00 PM").toLocaleTimeString(
      [],
      {
        hour: "2-digit",
      }
    );
    expect(timeOfDay(morningAmTimeString)).toEqual("morning");
    expect(timeOfDay(afternoonPmTimeString)).toEqual("afternoon");
    expect(timeOfDay(eveningPmTimeString)).toEqual("evening");
  });

  it("returns the expected time of day for 24 hour time strings", () => {
    const morningTimeString = new Date("1/1/2023 8:00").toLocaleTimeString([], {
      hour: "2-digit",
    });
    const afternoonTimeString = new Date("1/1/2023 14:00").toLocaleTimeString(
      [],
      {
        hour: "2-digit",
      }
    );
    const eveningTimeString = new Date("1/1/2023 18:00").toLocaleTimeString(
      [],
      {
        hour: "2-digit",
      }
    );
    expect(timeOfDay(morningTimeString)).toEqual("morning");
    expect(timeOfDay(afternoonTimeString)).toEqual("afternoon");
    expect(timeOfDay(eveningTimeString)).toEqual("evening");
  });
});
