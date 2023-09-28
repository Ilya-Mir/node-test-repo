import axios from 'axios';

describe('/CountryInfo', () => {
  test('should return 200 and list of breeds if limit is 2', async () => {
    const {status, data} = await axios.get(`https://date.nager.at/api/v3/CountryInfo/RU`);

    expect(status).toEqual(200);

    expect(data).toEqual({
      "commonName": expect.any(String),
      "officialName": expect.any(String),
      "countryCode": expect.any(String),
      "region": expect.any(String),
      "borders": expect.any(Array),
    });
  });
});

describe('/Version', () => {
  test('should return 200 and list of breeds if limit is 2', async () => {
    const {status, data} = await axios.get(`https://date.nager.at/api/v3/Version`);

    expect(status).toEqual(200);

    expect(data).toEqual({name: expect.any(String), version: expect.any(String)});

    expect(data).toEqual({"name": "Nager.Date", "version": "1.45.0"});
  });
});
