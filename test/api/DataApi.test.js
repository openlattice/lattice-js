/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/axios';
import * as DataApi from '../../src/api/DataApi';

import {
  DATA_API
} from '../../src/constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  TICKET_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED
} from '../constants/InvalidParams';

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

const MOCK_FILE_TYPE = 'json';
const MOCK_ENTITY_SET_UUID = '4b08e1f9-4a00-4169-92ea-10e377070220';
const MOCK_PROPERTY_TYPE_UUID = '8f79e123-3411-4099-a41f-88e5d22d0e8d';
const MOCK_SYNC_UUID = '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e';
const MOCK_TICKET_UUID = '89ad6988-37f1-48d7-a89b-618909b432a2';

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
  testCreateEntityData();
  testStoreEntityData();
  testAcquireSyncTicket();
  testReleaseSyncTicket();
});

function testGetEntitySetData() {

  describe('getEntitySetData()', () => {

    const functionToTest = DataApi.getEntitySetData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_SYNC_UUID,
      [MOCK_PROPERTY_TYPE_UUID]
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED,
      INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
    ];

    function testApi(invocationParams, expectedParameters, done) {

      DataApi.getEntitySetData(...invocationParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(...expectedParameters);
          done();
        })
        .catch(() => {
          done.fail();
        });
    }

    describe('should send a POST request with the correct URL path and data', () => {

      it('+syncId, +propertyTypeIds', (done) => {

        const invocationParams = [
          MOCK_ENTITY_SET_UUID,
          MOCK_SYNC_UUID,
          [MOCK_PROPERTY_TYPE_UUID]
        ];

        const expectedParameters = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          {
            syncId: MOCK_SYNC_UUID,
            properties: [MOCK_PROPERTY_TYPE_UUID]
          }
        ];

        testApi(invocationParams, expectedParameters, done);
      });

      it('+syncId, -propertyTypeIds', (done) => {

        const invocationParams = [
          MOCK_ENTITY_SET_UUID,
          MOCK_SYNC_UUID,
          undefined
        ];

        const expectedParameters = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          { syncId: MOCK_SYNC_UUID }
        ];

        testApi(invocationParams, expectedParameters, done);
      });

      it('-syncId, +propertyTypeIds', (done) => {

        const invocationParams = [
          MOCK_ENTITY_SET_UUID,
          undefined,
          [MOCK_PROPERTY_TYPE_UUID]
        ];

        const expectedParameters = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          { properties: [MOCK_PROPERTY_TYPE_UUID] }
        ];

        testApi(invocationParams, expectedParameters, done);
      });

      it('-syncId, -propertyTypeIds', (done) => {

        const invocationParams = [
          MOCK_ENTITY_SET_UUID
        ];

        const expectedParameters = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          {}
        ];

        testApi(invocationParams, expectedParameters, done);
      });

    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetEntitySetDataFileUrl() {

  describe('getEntitySetDataFileUrl()', () => {

    const functionToTest = DataApi.getEntitySetDataFileUrl;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_FILE_TYPE
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should return the correct URL', () => {

      expect(DataApi.getEntitySetDataFileUrl(MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE)).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    it('should correctly set the fileType query param as lowercase', () => {

      expect(DataApi.getEntitySetDataFileUrl(MOCK_ENTITY_SET_UUID, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldReturnNullOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateEntityData() {

  describe('createEntityData()', () => {

    const functionToTest = DataApi.createEntityData;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_SYNC_UUID,
      MOCK_ENTITIES
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED,
      INVALID_PARAMS
    ];

    function testApi(invocationParams, expectedParameters, done) {

      DataApi.createEntityData(...invocationParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(...expectedParameters);
          done();
        })
        .catch(() => {
          done.fail();
        });
    }

    describe('should send a PUT request with the correct URL path and data when syncId is given', () => {

      it('+syncId', (done) => {

        const invocationParams = [
          MOCK_ENTITY_SET_UUID,
          MOCK_SYNC_UUID,
          MOCK_ENTITIES
        ];

        const expectedParameters = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}/${MOCK_SYNC_UUID}`,
          MOCK_ENTITIES
        ];

        testApi(invocationParams, expectedParameters, done);
      });

      it('-syncId', (done) => {

        const invocationParams = [
          MOCK_ENTITY_SET_UUID,
          undefined,
          MOCK_ENTITIES
        ];

        const expectedParameters = [
          `/${ENTITY_DATA_PATH}/${MOCK_ENTITY_SET_UUID}`,
          MOCK_ENTITIES
        ];

        testApi(invocationParams, expectedParameters, done);
      });

    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testStoreEntityData() {

  describe('storeEntityData()', () => {

    const functionToTest = DataApi.storeEntityData;

    const validParams = [
      MOCK_TICKET_UUID,
      MOCK_SYNC_UUID,
      MOCK_ENTITIES
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      DataApi.storeEntityData(...validParams)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${ENTITY_DATA_PATH}/${TICKET_PATH}/${MOCK_TICKET_UUID}/${MOCK_SYNC_UUID}`,
            MOCK_ENTITIES
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAcquireSyncTicket() {

  describe('acquireSyncTicket()', () => {

    const functionToTest = DataApi.acquireSyncTicket;

    const validParams = [
      MOCK_ENTITY_SET_UUID,
      MOCK_SYNC_UUID
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS
    ];

    it('should send a POST request with the correct URL path', (done) => {

      DataApi.acquireSyncTicket(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${TICKET_PATH}/${MOCK_ENTITY_SET_UUID}/${MOCK_SYNC_UUID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testReleaseSyncTicket() {

  describe('releaseSyncTicket()', () => {

    const functionToTest = DataApi.releaseSyncTicket;

    const validParams = [
      MOCK_TICKET_UUID
    ];

    const invalidParams = [
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      DataApi.releaseSyncTicket(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${TICKET_PATH}/${MOCK_TICKET_UUID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
