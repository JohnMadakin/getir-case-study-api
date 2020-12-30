const RecordModel = require('../../models/records');
const records = require('../../services/records/records');

let mockRecordModel = null;

beforeAll(() => {
  mockRecordModel = jest.spyOn(RecordModel, 'aggregate').mockImplementationOnce(() => ({
    sort: jest.fn().mockResolvedValueOnce([
      {
        key: 'MLvQHQzi',
        createdAt: '2016-11-26T06:32:45.324Z',
        totalCount: 2015,
      },
      {
        key: 'BKIbexWl',
        createdAt: '2016-11-02T15:06:35.213Z',
        totalCount: 2026,
      },
      {
        key: 'UZyCOljV',
        createdAt: '2016-05-14T15:29:59.373Z',
        totalCount: 2013,
      },
    ]),
  })).mockImplementationOnce(() => ({ sort: jest.fn().mockResolvedValueOnce([]) }));
});

afterAll(() => {
  mockRecordModel.mockRestore();
});

describe('Records Service - Unit Test', () => {
  it('Should fetch records when startdate, enddate, mincount and maxcount is passed', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      endDate: '2017-01-26',
      minCount: '2000',
      maxCount: '2020',
    };
    const response = await records(filterPayload);

    expect(response).toBeDefined();
    expect(Array.isArray(response)).toEqual(true);
    expect(response).toHaveLength(3);
    expect(mockRecordModel).toHaveBeenCalled();
  });

  it('Should return Empty array if no result match a filter', async () => {
    const filterPayload = {
      startDate: '2016-01-26',
      endDate: '2017-01-26',
      minCount: '2000',
      maxCount: '2000',
    };
    const response = await records(filterPayload);
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toEqual(true);
    expect(response).toHaveLength(0);
  });
});
