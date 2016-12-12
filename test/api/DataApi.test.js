/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as DataApi from '../../src/api/DataApi';

import {
  DATA_API
} from '../../src/constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  MULTIPLE_PATH,
  SELECTED_PATH
} from '../../src/constants/ApiPaths';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldReturnNullOnInvalidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const DATA_API_BASE_URL = AxiosUtils.getApiBaseUrl(DATA_API);

const MOCK_FQN = {
  namespace: 'LOOM',
  name: 'DATA_API'
};

const MOCK_ES_NAME = 'LoomDataApis';

const MOCK_CREATE_ENTITY_DATA = {
  type: MOCK_FQN,
  entitySetName: MOCK_ES_NAME,
  properties: [
    { 'LOOM.MY_PROPERTY': 'testing' }
  ]
};

let mockAxiosInstance = null;

describe('DataApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetAllEntitiesOfType();
  testGetAllEntitiesOfTypeFileUrl();
  testGetAllEntitiesOfTypeInSet();
  testGetAllEntitiesOfTypeInSetFileUrl();
  testGetSelectedEntitiesOfTypeInSet();
  testGetAllEntitiesOfTypes();
  testCreateEntity();
});

function testGetAllEntitiesOfType() {

  describe('getAllEntitiesOfType()', () => {

    const functionInvocation = [
      DataApi.getAllEntitiesOfType, MOCK_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      DataApi.getAllEntitiesOfType(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllEntitiesOfTypeFileUrl() {

  describe('getAllEntitiesOfTypeFileUrl()', () => {

    const functionInvocation = [
      DataApi.getAllEntitiesOfTypeFileUrl, MOCK_FQN
    ];

    it('should return the correct URL', () => {

      expect(DataApi.getAllEntitiesOfTypeFileUrl(MOCK_FQN, 'json')).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=json`
      );
    });

    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldReturnNullOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllEntitiesOfTypeInSet() {

  describe('getAllEntitiesOfTypeInSet()', () => {

    const functionInvocation = [
      DataApi.getAllEntitiesOfTypeInSet, MOCK_FQN, MOCK_ES_NAME
    ];

    it('should send a GET request with the correct URL path', (done) => {

      DataApi.getAllEntitiesOfTypeInSet(MOCK_FQN, MOCK_ES_NAME)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ES_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllEntitiesOfTypeInSetFileUrl() {

  describe('getAllEntitiesOfTypeInSetFileUrl()', () => {

    const functionInvocation = [
      DataApi.getAllEntitiesOfTypeInSetFileUrl, MOCK_FQN, MOCK_ES_NAME, 'json'
    ];

    it('should return the correct URL', () => {

      const url = DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, MOCK_ES_NAME, 'json');
      expect(url).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ES_NAME}?fileType=json`
      );
    });

    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldReturnNullOnInvalidParameters(...functionInvocation);

  });
}

function testGetSelectedEntitiesOfTypeInSet() {

  describe('getSelectedEntitiesOfTypeInSet()', () => {

    const functionInvocation = [
      DataApi.getSelectedEntitiesOfTypeInSet, MOCK_FQN, MOCK_ES_NAME, [MOCK_FQN]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      DataApi.getSelectedEntitiesOfTypeInSet(MOCK_FQN, MOCK_ES_NAME, [MOCK_FQN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ES_NAME}/${SELECTED_PATH}`,
            [MOCK_FQN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllEntitiesOfTypes() {

  describe('getAllEntitiesOfTypes()', () => {

    const functionInvocation = [
      DataApi.getAllEntitiesOfTypes, [MOCK_FQN]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      DataApi.getAllEntitiesOfTypes([MOCK_FQN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${MULTIPLE_PATH}`,
            [MOCK_FQN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreateEntity() {

  describe('createEntity()', () => {

    const functionInvocation = [
      DataApi.createEntity, MOCK_CREATE_ENTITY_DATA
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      DataApi.createEntity(MOCK_CREATE_ENTITY_DATA)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}`,
            MOCK_CREATE_ENTITY_DATA
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
