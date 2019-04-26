/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataApi from './DataApi';
import { DATA_API } from '../constants/ApiNames';
import { MOCK_DATA_EDGE_DM, MOCK_DATA_GRAPH_DM } from '../utils/testing/MockDataModels';
import { UpdateTypes, DeleteTypes } from '../constants/types';

import {
  ASSOCIATION_PATH,
  COUNT_PATH,
  NEIGHBORS_PATH,
  SET_ID,
  SET_PATH,
  TYPE_PATH
} from '../constants/UrlConstants';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

import {
  genMockBaseUrl,
  genRandomString,
  genRandomUUID,
  getMockAxiosInstance
} from '../utils/testing/MockUtils';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

const MOCK_BASE_URL = genMockBaseUrl();
const MOCK_FILE_TYPE = 'json';

jest.mock('../utils/axios');
AxiosUtils.getApiBaseUrl.mockImplementation(() => MOCK_BASE_URL);
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('DataApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  createAssociations();
  createEntityAndAssociationData();
  createOrMergeEntityData();
  deleteEntitiesAndNeighbors();
  deleteEntity();
  deleteEntitySet();
  getEntityData();
  getEntitySetData();
  getEntitySetDataFileUrl();
  getEntitySetSize();
  replaceEntityData();
  replaceEntityInEntitySet();
  replaceEntityInEntitySetUsingFqns();
});

function createAssociations() {

  describe('createAssociations()', () => {

    const apiToTest = DataApi.createAssociations;
    const validParams = [MOCK_DATA_EDGE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ASSOCIATION_PATH}`, MOCK_DATA_EDGE_DM];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
  });
}

function createEntityAndAssociationData() {

  describe('createEntityAndAssociationData()', () => {

    const apiToTest = DataApi.createEntityAndAssociationData;
    const validParams = [MOCK_DATA_GRAPH_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_DATA_GRAPH_DM];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
  });
}

function createOrMergeEntityData() {

  describe('createOrMergeEntityData()', () => {

    const apiToTest = DataApi.createOrMergeEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityData = [{
      [`${genRandomUUID()}`]: ['value_1', 'value_2'],
      [`${genRandomUUID()}`]: ['value_3', 'value_4']
    }];

    const validParams = [mockEntitySetId, mockEntityData];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/?${SET_ID}=${mockEntitySetId}`, mockEntityData];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
  });
}

function deleteEntitiesAndNeighbors() {

  describe('deleteEntitiesAndNeighbors()', () => {

    const apiToTest = DataApi.deleteEntitiesAndNeighbors;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const validParams = [mockEntitySetId, { entityKeyIds: [mockEntityKeyId] }, DeleteTypes.Soft];
    const invalidParams = [
      INVALID_PARAMS_SS,
      {
        destinationEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
        entityKeyIds: INVALID_PARAMS_SS,
        sourceEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
      },
      INVALID_PARAMS_SS,
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

    test('type=Soft', () => {
      const apiInvocationParams = [mockEntitySetId, { entityKeyIds: [mockEntityKeyId] }, DeleteTypes.Soft];
      const expectedAxiosParams = [
        `/${SET_PATH}/${mockEntitySetId}/${NEIGHBORS_PATH}?${TYPE_PATH}=${DeleteTypes.Soft}`,
        { entityKeyIds: [mockEntityKeyId] },
      ];
      return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
    });

    test('type=Hard', () => {
      const apiInvocationParams = [mockEntitySetId, { entityKeyIds: [mockEntityKeyId] }, DeleteTypes.Hard];
      const expectedAxiosParams = [
        `/${SET_PATH}/${mockEntitySetId}/${NEIGHBORS_PATH}?${TYPE_PATH}=${DeleteTypes.Hard}`,
        { entityKeyIds: [mockEntityKeyId] },
      ];
      return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
    });
  });
}

function deleteEntity() {

  describe('deleteEntity()', () => {

    const apiToTest = DataApi.deleteEntity;
    const mockEKID = genRandomUUID();
    const mockESID = genRandomUUID();
    const validParams = [mockESID, mockEKID, DeleteTypes.Soft];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_SS];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

    test('type=Soft', () => {
      const apiInvocationParams = [mockESID, mockEKID, 'Soft'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockESID}/${mockEKID}?${TYPE_PATH}=${DeleteTypes.Soft}`];
      return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });

    test('type=Hard', () => {
      const apiInvocationParams = [mockESID, mockEKID, 'Hard'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockESID}/${mockEKID}?${TYPE_PATH}=${DeleteTypes.Hard}`];
      return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });
  });
}

function deleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const apiToTest = DataApi.deleteEntitySet;
    const mockEntitySetId = genRandomUUID();
    const validParams = [mockEntitySetId, 'Soft'];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

    test('type=Soft', () => {
      const apiInvocationParams = [mockEntitySetId, 'Soft'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockEntitySetId}/all?${TYPE_PATH}=${DeleteTypes.Soft}`];
      return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });

    test('type=Hard', () => {
      const apiInvocationParams = [mockEntitySetId, 'Hard'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockEntitySetId}/all?${TYPE_PATH}=${DeleteTypes.Hard}`];
      return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });
  });
}

function getEntityData() {

  describe('getEntityData()', () => {

    const apiToTest = DataApi.getEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();

    const validParams = [mockEntitySetId, mockEntityKeyId];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${mockEntitySetId}/${mockEntityKeyId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
  });
}

function getEntitySetData() {

  describe('getEntitySetData()', () => {

    const apiToTest = DataApi.getEntitySetData;
    const mockEntityKeyId = genRandomUUID();
    const mockEntitySetId = genRandomUUID();
    const mockPropertyTypeId = genRandomUUID();

    const validParams = [
      mockEntitySetId,
      [mockPropertyTypeId],
      [mockEntityKeyId]
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
      INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY
    ];

    describe('should send a POST request with the correct params', () => {

      test('+propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          [mockPropertyTypeId],
          [mockEntityKeyId]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          {
            ids: [mockEntityKeyId],
            properties: [mockPropertyTypeId]
          }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          undefined,
          [mockEntityKeyId]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          { ids: [mockEntityKeyId] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('+propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          [mockPropertyTypeId],
          undefined
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          { properties: [mockPropertyTypeId] }
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          {}
        ];

        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

    });

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
  });
}

function getEntitySetDataFileUrl() {

  describe('getEntitySetDataFileUrl()', () => {

    const apiToTest = DataApi.getEntitySetDataFileUrl;
    const mockEntitySetId = genRandomUUID();

    const validParams = [
      mockEntitySetId,
      MOCK_FILE_TYPE
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    test('should return the correct URL', () => {

      expect(DataApi.getEntitySetDataFileUrl(mockEntitySetId, MOCK_FILE_TYPE)).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${mockEntitySetId}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    test('should correctly set the "fileType" query param as lowercase', () => {

      expect(DataApi.getEntitySetDataFileUrl(mockEntitySetId, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${mockEntitySetId}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(apiToTest, validParams, invalidParams);

  });
}

function getEntitySetSize() {

  describe('getEntitySetSize()', () => {

    const apiToTest = DataApi.getEntitySetSize;
    const mockEntitySetId = genRandomUUID();

    const validParams = [mockEntitySetId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${mockEntitySetId}/${COUNT_PATH}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
  });
}

function replaceEntityData() {

  describe('replaceEntityData()', () => {

    const apiToTest = DataApi.replaceEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityData = {
      [`${genRandomUUID()}`]: {
        [`${genRandomUUID()}`]: ['value_1', 'value_2'],
        [`${genRandomUUID()}`]: ['value_3', 'value_4']
      }
    };

    // TODO: generate invalid params for the "entities" param

    const validParams = [mockEntitySetId, mockEntityData, false];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS, []];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);

    // TODO: add tests to validate "partial" query param is being set correctly for invalid values
    describe('should send a PUT request with the correct params', () => {

      test('type=PartialReplace', () => {
        const apiInvocationParams = [mockEntitySetId, mockEntityData, true];
        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}?${TYPE_PATH}=${UpdateTypes.PartialReplace}`,
          mockEntityData
        ];
        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });

      test('type=Replace', () => {
        const apiInvocationParams = [mockEntitySetId, mockEntityData, false];
        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}?${TYPE_PATH}=${UpdateTypes.Replace}`,
          mockEntityData
        ];
        return assertApiShouldSendCorrectHttpRequest(apiToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });
    });
  });
}

function replaceEntityInEntitySet() {

  describe('replaceEntityInEntitySet()', () => {

    const apiToTest = DataApi.replaceEntityInEntitySet;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const mockEntity = {
      [`${genRandomUUID()}`]: ['value_1', 'value_2']
    };

    // TODO: generate invalid params for the "entity" param

    const validParams = [mockEntitySetId, mockEntityKeyId, mockEntity];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`, mockEntity];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'put');
  });
}

function replaceEntityInEntitySetUsingFqns() {

  describe('replaceEntityInEntitySetUsingFqns()', () => {

    const apiToTest = DataApi.replaceEntityInEntitySetUsingFqns;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const mockEntity = {
      [`${genRandomString()}.${genRandomString()}`]: ['value_1', 'value_2']
    };

    // TODO: generate invalid params for the "entity" param

    const validParams = [mockEntitySetId, mockEntityKeyId, mockEntity];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`, mockEntity];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
  });
}
