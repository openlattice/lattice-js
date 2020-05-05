/*
 * @flow
 */

type ActionTypesEnum = {|
  ADD :'ADD';
  REMOVE :'REMOVE';
  REPLACE :'REPLACE';
  REQUEST :'REQUEST';
  SET :'SET';
|};

const ActionTypes :{| ...ActionTypesEnum |} = Object.freeze({
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  REPLACE: 'REPLACE',
  REQUEST: 'REQUEST',
  SET: 'SET',
});

type ActionType = $Values<typeof ActionTypes>;

export default ActionTypes;
export type { ActionType };
