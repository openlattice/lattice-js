/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

function randomId() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id, useful in unit tests
  return Math.random().toString(36).slice(2);
}

export {
  randomId
};
