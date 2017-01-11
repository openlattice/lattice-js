import ActionTypes from '../../src/constants/ActionTypes';

const ADD :string = 'ADD';
const REMOVE :string = 'REMOVE';
const SET :string = 'SET';
const REQUEST :string = 'REQUEST';

describe('ActionTypes', () => {

  it(`should expose "${ADD}"`, () => {
    expect(ActionTypes.ADD).toBeDefined();
    expect(ActionTypes.ADD).toEqual(ADD);
  });

  it(`should expose "${REMOVE}"`, () => {
    expect(ActionTypes.REMOVE).toBeDefined();
    expect(ActionTypes.REMOVE).toEqual(REMOVE);
  });

  it(`should expose "${SET}"`, () => {
    expect(ActionTypes.SET).toBeDefined();
    expect(ActionTypes.SET).toEqual(SET);
  });

  it(`should expose "${REQUEST}"`, () => {
    expect(ActionTypes.REQUEST).toBeDefined();
    expect(ActionTypes.REQUEST).toEqual(REQUEST);
  });

});
