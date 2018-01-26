/*
 * @flow
 */

import randomUUID from 'uuid/v4';

function genRandomString() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id, useful in unit tests
  return Math.random().toString(36).slice(2);
}

function genRandomUUID() :string {

  return randomUUID();
}

function genMockAuthToken() :string {

  return `${genRandomString()}.${genRandomString()}.${genRandomString()}`;
}

function genMockBaseUrl() :string {

  return `https://${genRandomString()}.openlattice.com`;
}

function getMockPromise() :Promise<*> {

  return new Promise((resolve) => {
    resolve({ data: {} });
  });
}

function getMockAxiosInstance() :Object {

  const mockAxiosInstance = {};

  ['delete', 'get', 'patch', 'post', 'put', 'request'].forEach((httpMethod) => {
    mockAxiosInstance[httpMethod] = jest.fn()
      .mockName(httpMethod)
      .mockReturnValue(getMockPromise());
  });

  return mockAxiosInstance;
}

export {
  genMockAuthToken,
  genMockBaseUrl,
  genRandomString,
  genRandomUUID,
  getMockPromise,
  getMockAxiosInstance
};
