import RequestStatusTypes from '../../src/constants/types/RequestStatusTypes';

const APPROVED :string = 'APPROVED';
const DECLINED :string = 'DECLINED';
const SUBMITTED :string = 'SUBMITTED';

describe('RequestStatusTypes', () => {

  it(`should expose "${APPROVED}"`, () => {
    expect(RequestStatusTypes.APPROVED).toBeDefined();
    expect(RequestStatusTypes.APPROVED).toEqual(APPROVED);
  });

  it(`should expose "${DECLINED}"`, () => {
    expect(RequestStatusTypes.DECLINED).toBeDefined();
    expect(RequestStatusTypes.DECLINED).toEqual(DECLINED);
  });

  it(`should expose "${SUBMITTED}"`, () => {
    expect(RequestStatusTypes.SUBMITTED).toBeDefined();
    expect(RequestStatusTypes.SUBMITTED).toEqual(SUBMITTED);
  });

});
