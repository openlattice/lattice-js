/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const ActionTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  REQUEST: 'REQUEST',
  SET: 'SET',
};

export type Action = $Keys<typeof ActionTypes>;

export { ActionTypes as default };
