import {checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays} from "./public-holidays.service";
import axios from 'axios';
import clearAllMocks = jest.clearAllMocks;

  const COUNTRY_CODE = "FR";
  const YEAR = 2023

const HOLIDAYS_MOCK = [
    {
      "date": "2023-01-01",
      "localName": "Año Nuevo",
      "name": "New Year's Day",
      "countryCode": "AR",
      "fixed": true,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": [
        "Public"
      ]
    }];

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
describe("getListOfPublicHolidays", () => {
  beforeEach(() => {
    clearAllMocks();
  })

  it("should return list of holidays get", async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: NEXT_PUBLIC_HOLIDAYS_MOCK}));

    const response = await getListOfPublicHolidays(YEAR, COUNTRY_CODE);

    expect(response).toEqual(SHORT_PUBLIC_HOLIDAYS_MOCK);
  }
  )

  it("should call api with proper arguments", async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: HOLIDAYS_MOCK}));

    await getListOfPublicHolidays(YEAR, COUNTRY_CODE);

    expect(axiosGetSpy).toHaveBeenLastCalledWith(`https://date.nager.at/api/v3/PublicHolidays/2023/FR`);
  });

  it("should return empty array in case of error", async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({data: new Error("error")}));

    const result = await getListOfPublicHolidays(YEAR, COUNTRY_CODE);

    expect(result).toEqual([]);
  });
});


describe("checkIfTodayIsPublicHoliday", () => {
  it("should return if today is public holiday", async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 200}));

        const response = await checkIfTodayIsPublicHoliday(COUNTRY_CODE);

        expect(response).toEqual(true);
      }
  )

  it("should call api with proper arguments", async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 200}));

    await checkIfTodayIsPublicHoliday(COUNTRY_CODE);

    expect(axiosGetSpy).toHaveBeenLastCalledWith(`https://date.nager.at/api/v3/IsTodayPublicHoliday/FR`);
  });

  it("should return false in case of error", async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({status: new Error("Error")}));

    const result = await checkIfTodayIsPublicHoliday(COUNTRY_CODE);

    expect(result).toEqual(false);
  });
});

describe("getNextPublicHolidays", () => {
  it("should return next public holidays", async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: NEXT_PUBLIC_HOLIDAYS_MOCK}));

        const response = await getNextPublicHolidays(COUNTRY_CODE);

        expect(response).toEqual(SHORT_PUBLIC_HOLIDAYS_MOCK);
      }
  )

  it("should call api with proper arguments", async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 200}));

    await getNextPublicHolidays(COUNTRY_CODE);

    expect(axiosGetSpy).toHaveBeenLastCalledWith(`https://date.nager.at/api/v3/NextPublicHolidays/FR`);
  });

  it("should return empty array in case of error", async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({data: new Error("Error")}));

    const result = await getNextPublicHolidays(COUNTRY_CODE);

    expect(result).toEqual([]);
  });
});
