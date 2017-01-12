/*
 * @flow
 */

const ActionTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SET: 'SET',
  REQUEST: 'REQUEST'
};

export type Action = $Keys<typeof ActionTypes>;

export {
  ActionTypes as default
};
