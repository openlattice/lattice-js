/*
 * @flow
 */

type ActionTypesEnum = {|
  ADD :'ADD';
  REMOVE :'REMOVE';
  REQUEST :'REQUEST';
  SET :'SET';
|};

type ActionType = $Values<ActionTypesEnum>;

const ActionTypes :{| ...ActionTypesEnum |} = Object.freeze({
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  REQUEST: 'REQUEST',
  SET: 'SET',
});

export default ActionTypes;
export type { ActionType };
