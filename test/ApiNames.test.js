import * as ApiNames from '../src/constants/ApiNames';

const DATA_API = 'DataApi';
const EDM_API = 'EntityDataModelApi';

describe('ApiNames', () => {

  it(`should expose "${DATA_API}"`, () => {
    expect(ApiNames.DATA_API).toBeDefined();
    expect(ApiNames.DATA_API).toEqual(DATA_API);
  });

  it(`should expose "${EDM_API}"`, () => {
    expect(ApiNames.EDM_API).toBeDefined();
    expect(ApiNames.EDM_API).toEqual(EDM_API);
  });

});
