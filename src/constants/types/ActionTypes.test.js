import ActionTypes from './ActionTypes';

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const SET = 'SET';
const REQUEST = 'REQUEST';

describe('ActionTypes', () => {

  test(`should export "${ADD}"`, () => {
    expect(ActionTypes.ADD).toBeDefined();
    expect(ActionTypes.ADD).toEqual(ADD);
  });

  test(`should export "${REMOVE}"`, () => {
    expect(ActionTypes.REMOVE).toBeDefined();
    expect(ActionTypes.REMOVE).toEqual(REMOVE);
  });

  test(`should export "${SET}"`, () => {
    expect(ActionTypes.SET).toBeDefined();
    expect(ActionTypes.SET).toEqual(SET);
  });

  test(`should export "${REQUEST}"`, () => {
    expect(ActionTypes.REQUEST).toBeDefined();
    expect(ActionTypes.REQUEST).toEqual(REQUEST);
  });

});
