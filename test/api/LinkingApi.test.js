/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as LinkingApi from '../../src/api/LinkingApi';

import {
  LINKING_API
} from '../../src/constants/ApiNames';

import {
  SET_PATH,
  TYPE_PATH
} from '../../src/constants/ApiPaths';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

const MOCK_ENTITY_TYPE = {
  title: 'MyEntity',
  description: 'so this is an EntityType',
  type: { namespace: 'LOOM', name: 'ENTITY_TYPE' },
  schemas: [
    { namespace: 'LOOM', name: 'SCHEMA' }
  ],
  key: [
    '8f79e123-3411-4099-a41f-88e5d22d0e8d'
  ],
  properties: [
    '8f79e123-3411-4099-a41f-88e5d22d0e8d'
  ]
};

const MOCK_ET_IDS = [
  'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
  'fae6af98-2675-45bd-9a5b-1619a87235a8'
];

const MOCK_LET = {
  entityType: MOCK_ENTITY_TYPE,
  entityTypeIds: MOCK_ET_IDS,
  deidentified: false
};

const MOCK_ENTITY_SET = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  entityTypeId: '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  name: 'name',
  title: 'title',
  description: 'description'
};

const MOCK_LINKING_PROPERTIES = [
  {
    '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e': '4b08e1f9-4a00-4169-92ea-10e377070220',
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': 'ec6865e6-e60e-424b-a071-6a9c1603d735'
  },
  { 'fae6af98-2675-45bd-9a5b-1619a87235a8': '8f79e123-3411-4099-a41f-88e5d22d0e8d' }
];

const MOCK_LES = {
  entitySet: MOCK_ENTITY_SET,
  linkingProperties: MOCK_LINKING_PROPERTIES
};

let mockAxiosInstance = null;

describe('LinkingApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testCreateLinkingEntityType();
  testLinkEntitySets();
});

function testCreateLinkingEntityType() {

  describe('createLinkingEntityType()', () => {

    const functionInvocation = [
      LinkingApi.createLinkingEntityType, MOCK_LET
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      LinkingApi.createLinkingEntityType(MOCK_LET)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/${TYPE_PATH}`, MOCK_LET);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(LINKING_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testLinkEntitySets() {

  describe('linkEntitySets()', () => {

    const functionInvocation = [
      LinkingApi.linkEntitySets, MOCK_LES
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      LinkingApi.linkEntitySets(MOCK_LES)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/${SET_PATH}`, MOCK_LES);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(LINKING_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
