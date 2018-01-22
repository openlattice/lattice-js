/*
 * @flow
 */

function genRandomString() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id, useful in unit tests
  return Math.random().toString(36).slice(2);
}

function genMockAuthToken() :string {

  return `${genRandomString()}.${genRandomString()}.${genRandomString()}`;
}

function genMockBaseUrl() :string {

  return `https://${genRandomString()}.openlattice.com`;
}

export {
  genMockAuthToken,
  genMockBaseUrl,
  genRandomString
};
