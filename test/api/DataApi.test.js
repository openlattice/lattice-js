/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as DataApi from '../../src/api/DataApi';

import {
  DATA_API
} from '../../src/constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  GET_DATA_PATH,
  HISTORICAL_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
} from '../constants/TestConstants';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldReturnNullOnInvalidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnGivenInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const DATA_API_BASE_URL = AxiosUtils.getApiBaseUrl(DATA_API);

const MOCK_FILE_TYPE = 'json';
const MOCK_ENTITY_SET_UUID = '4b08e1f9-4a00-4169-92ea-10e377070220';
const MOCK_SYNC_UUID = '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e';
const MOCK_PROPERTY_TYPE_UUID = '8f79e123-3411-4099-a41f-88e5d22d0e8d';

const MOCK_ENTITIES = {
  entityId_1: [
    {
      'ec6865e6-e60e-424b-a071-6a9c1603d735': ['value_1', 'value_2'],
      '3ada2cec-0e3a-48b1-ba4f-72be7a81169e': ['value_3', 'value_4']
    }
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

  testGetEntitySetData();
  testGetEntitySetDataFileUrl();
  testGetSelectedEntitySetData();
  testCreateEntityData();
});

function testGetEntitySetData() {

  describe('getEntitySetData()', () => {

    const functionInvocation = [
      DataApi.getEntitySetData, MOCK_ENTITY_SET_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      DataApi.getEntitySetData(MOCK_ENTITY_SET_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`
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

function testGetEntitySetDataFileUrl() {

  describe('getEntitySetDataFileUrl()', () => {

    const functionInvocation = [
      DataApi.getEntitySetDataFileUrl, MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE
    ];

    it('should return the correct URL', () => {

      expect(DataApi.getEntitySetDataFileUrl(MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE)).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldReturnNullOnInvalidParameters(...functionInvocation);

  });
}

function testGetSelectedEntitySetData() {

  describe('getSelectedEntitySetData()', () => {

    const functionInvocation = [
      DataApi.getSelectedEntitySetData, MOCK_ENTITY_SET_UUID, [MOCK_SYNC_UUID], [MOCK_PROPERTY_TYPE_UUID]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      DataApi.getSelectedEntitySetData(MOCK_ENTITY_SET_UUID, [MOCK_SYNC_UUID], [MOCK_PROPERTY_TYPE_UUID])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${HISTORICAL_PATH}/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}/${GET_DATA_PATH}`,
            {
              syncIds: [MOCK_SYNC_UUID],
              properties: [MOCK_PROPERTY_TYPE_UUID]
            }
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
    testApiFunctionShouldRejectOnGivenInvalidParameters(
      INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED,
      ...functionInvocation
    );

  });
}

function testCreateEntityData() {

  describe('createEntityData()', () => {

    const functionInvocation = [
      DataApi.createEntityData, MOCK_ENTITY_SET_UUID, MOCK_SYNC_UUID, MOCK_ENTITIES
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      DataApi.createEntityData(MOCK_ENTITY_SET_UUID, MOCK_SYNC_UUID, MOCK_ENTITIES)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}/${MOCK_SYNC_UUID}`,
            MOCK_ENTITIES
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
