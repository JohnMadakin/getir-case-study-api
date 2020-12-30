jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

const supertest = require('supertest');
const app = require('../../app');

describe('Fetch records - Positive Test', () => {
  const endpoint = '/v1/records';
  const request = supertest(app);

  it('Should filter records by startdate, enddate, mincount and maxcount', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      endDate: '2017-01-26',
      minCount: '2000',
      maxCount: '2070',
    };
    const response = await request.post(endpoint)
      .set('Content-Type', 'application/json')
      .send(filterPayload);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('records');
    expect(response.body.msg).toEqual('Success');
    expect(Array.isArray(response.body.records)).toEqual(true);
    expect(response.body.records.length).toBeGreaterThan(0);
  });

  it('Should return Empty records if no result match filter', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      endDate: '2017-01-26',
      minCount: '2000',
      maxCount: '2000',
    };
    const response = await request.post(endpoint)
      .set('Content-Type', 'application/json')
      .send(filterPayload);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('records');
    expect(response.body.msg).toEqual('Success');
    expect(Array.isArray(response.body.records)).toEqual(true);
    expect(response.body.records).toHaveLength(0);
  });
});

describe('Fetch records - Negative Test', () => {
  const endpoint = '/v1/records';
  const request = supertest(app);

  it('Should throw error if startDate is not present', async () => {
    const filterPayload = {
      endDate: '2017-01-26',
      minCount: '2000',
      maxCount: '2070',
    };
    const response = await request.post(endpoint)
      .set('Content-Type', 'application/json')
      .send(filterPayload);

    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual('startDate is required');
    expect(response.body.code).toEqual('1');
  });

  it('Should throw error if endDate is missing', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      minCount: '2000',
      maxCount: '2070',
    };
    const response = await request.post(endpoint)
      .set('Content-Type', 'application/json')
      .send(filterPayload);

    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual('endDate is required');
    expect(response.body.code).toEqual('1');
  });

  it('Should throw error if minCount is missing', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      endDate: '2017-01-26',
      maxCount: '2070',
    };
    const response = await request.post(endpoint)
      .set('Content-Type', 'application/json')
      .send(filterPayload);

    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual('minCount is required');
    expect(response.body.code).toEqual('1');
  });

  it('Should throw error if maxCount is not present', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      endDate: '2017-01-26',
      minCount: '2070',
    };
    const response = await request.post(endpoint)
      .set('Content-Type', 'application/json')
      .send(filterPayload);

    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual('maxCount is required');
    expect(response.body.code).toEqual('1');
  });
});
