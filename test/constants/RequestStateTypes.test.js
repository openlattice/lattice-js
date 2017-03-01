import RequestStateTypes from '../../src/constants/types/RequestStateTypes';

const APPROVED :string = 'APPROVED';
const DECLINED :string = 'DECLINED';
const SUBMITTED :string = 'SUBMITTED';

describe('RequestStateTypes', () => {

  it(`should expose "${APPROVED}"`, () => {
    expect(RequestStateTypes.APPROVED).toBeDefined();
    expect(RequestStateTypes.APPROVED).toEqual(APPROVED);
  });

  it(`should expose "${DECLINED}"`, () => {
    expect(RequestStateTypes.DECLINED).toBeDefined();
    expect(RequestStateTypes.DECLINED).toEqual(DECLINED);
  });

  it(`should expose "${SUBMITTED}"`, () => {
    expect(RequestStateTypes.SUBMITTED).toBeDefined();
    expect(RequestStateTypes.SUBMITTED).toEqual(SUBMITTED);
  });

});
