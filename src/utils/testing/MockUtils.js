/*
 * @flow
 */

import randomUUID from 'uuid/v4';

function genRandomBoolean() :boolean {

  return Math.random() >= 0.5;
}

function genRandomInt(minimum :number = 0, maximum :number = 100) {

  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  // max is inclusive, min is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRandomString() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id, useful in unit tests
  return Math.random().toString(36).slice(2);
}

function genRandomUUID() :string {

  return randomUUID();
}

function genRandomX(randomX :Function, count :number) {

  if (count === null || count === undefined || count === 0) {
    return randomX();
  }

  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(randomX());
  }
  return result;
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
function getMockAxiosInstance(mockPromise :?Promise<*>) :Object {

  const mockAxiosInstance = {};

  ['delete', 'get', 'patch', 'post', 'put', 'request'].forEach((httpMethod) => {
    mockAxiosInstance[httpMethod] = jest.fn()
      .mockName(httpMethod)
      .mockReturnValue(mockPromise || getMockPromise());
  });

  return mockAxiosInstance;
}

function pickRandomValue(thing :Object) :any {

  const keys = Object.keys(thing);
  return thing[keys[Math.floor(Math.random() * keys.length)]];
}

export {
  genMockAuthToken,
  genMockBaseUrl,
  genRandomBoolean,
  genRandomInt,
  genRandomString,
  genRandomUUID,
  genRandomX,
  getMockAxiosInstance,
  pickRandomValue,
};
