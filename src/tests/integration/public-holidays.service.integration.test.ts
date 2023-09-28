import clearAllMocks = jest.clearAllMocks;
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays
} from "../../services/public-holidays.service";

const COUNTRY_CODE = "FR";
const YEAR = 2023

describe("getListOfPublicHolidays", () => {
  beforeEach(() => {
    clearAllMocks();
  })

  it("should return list of holidays get", async () => {
        const response = await getListOfPublicHolidays(YEAR, COUNTRY_CODE);

        expect(response.length).toEqual(11)
      }
  )

  it("should return error if country doesn't exist", async () => {
        await expect(getListOfPublicHolidays(YEAR, "SS"))
        .rejects
        .toThrow("Country provided is not supported, received: SS");
      }
  )
});


describe("checkIfTodayIsPublicHoliday", () => {
  it("should return if today is public holiday", async () => {
        const response = await checkIfTodayIsPublicHoliday(COUNTRY_CODE);

        expect(response).toEqual(false);
      }
  )

  it("should return error if country doesn't exist", async () => {
        await expect(checkIfTodayIsPublicHoliday( "SS"))
            .rejects
            .toThrow("Country provided is not supported, received: SS");
      }
  )
});

describe("getNextPublicHolidays", () => {
  it("should return next public holidays", async () => {
        const response = await getNextPublicHolidays(COUNTRY_CODE);

        expect(response.length).toEqual(11);
      }
  )

  it("should return error if country doesn't exist", async () => {
        await expect(getNextPublicHolidays( "SS"))
            .rejects
            .toThrow("Country provided is not supported, received: SS");
      }
  )
});
