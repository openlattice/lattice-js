import RequestStateTypes from './RequestStateTypes';

const APPROVED = 'APPROVED';
const DECLINED = 'DECLINED';
const SUBMITTED = 'SUBMITTED';

describe('RequestStateTypes', () => {

  test(`should export "${APPROVED}"`, () => {
    expect(RequestStateTypes.APPROVED).toBeDefined();
    expect(RequestStateTypes.APPROVED).toEqual(APPROVED);
  });

  test(`should export "${DECLINED}"`, () => {
    expect(RequestStateTypes.DECLINED).toBeDefined();
    expect(RequestStateTypes.DECLINED).toEqual(DECLINED);
  });

  test(`should export "${SUBMITTED}"`, () => {
    expect(RequestStateTypes.SUBMITTED).toBeDefined();
    expect(RequestStateTypes.SUBMITTED).toEqual(SUBMITTED);
  });

});
