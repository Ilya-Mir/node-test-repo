import {shortenPublicHoliday, validateInput} from "./helpers";

const COUNTRY_CODE = "FR";
const YEAR = 2023

const NEXT_PUBLIC_HOLIDAYS_MOCK = [
  {
    "date": "2023-11-01",
    "localName": "Toussaint",
    "name": "All Saints' Day",
    "countryCode": "FR",
    "fixed": true,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  }]

const SHORT_PUBLIC_HOLIDAYS_MOCK = [
  {
    "date": "2023-11-01",
    "localName": "Toussaint",
    "name": "All Saints' Day"
  }
]
describe("validateInput", () => {
  it("should return true in case of correct data", () => {
    const isCValidate = validateInput({year: YEAR, country: COUNTRY_CODE})

    expect(isCValidate).toBeTruthy();
  })

  it("should return error in case of incorrect country", () => {
    const isCValidate = () => validateInput({year: YEAR, country: "AR"})

    expect(isCValidate).toThrow(
        new Error(`Country provided is not supported, received: AR`),
    );
  })

  it("should return error in case of incorrect year", () => {
    const isCValidate = () => validateInput({year: 123, country: "FR"})

    expect(isCValidate).toThrow(
        new Error(`Year provided not the current, received: 123`),
    );
  })
});

describe("shortenPublicHoliday", () => {
  it("should return shorten Public Holiday", () => {
    const shortenPublic = shortenPublicHoliday(NEXT_PUBLIC_HOLIDAYS_MOCK[0]);

    expect(shortenPublic).toEqual(SHORT_PUBLIC_HOLIDAYS_MOCK[0])
  })
});
