/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as DataSourcesApi from '../../src/api/DataSourcesApi';

import { DATA_SOURCES_API } from '../../src/constants/ApiNames';
import { getMockAxiosInstance } from '../utils/MockDataUtils';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

const MOCK_DS_UUID = '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e';
const MOCK_SYNC_UUID = '8f79e123-3411-4099-a41f-88e5d22d0e8d';
const MOCK_TITLE = 'title';
const MOCK_DESCRIPTION = 'description';
const MOCK_ES_IDS = [
  'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
  'fae6af98-2675-45bd-9a5b-1619a87235a8'
];

const MOCK_DS_OBJ = {
  id: MOCK_DS_UUID,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  entitySetIds: MOCK_ES_IDS
};

let mockAxiosInstance = null;

describe('DataSourcesApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetDataSource();
  testCreateOrUpdateDataSource();
  testDeleteDataSource();
  testStartSync();
  testSignalSyncCompleted();

});

function testGetDataSource() {

  describe('getDataSource()', () => {

    const functionInvocation = [
      DataSourcesApi.getDataSource, MOCK_DS_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      DataSourcesApi.getDataSource(MOCK_DS_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/${MOCK_DS_UUID}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_SOURCES_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreateOrUpdateDataSource() {

  describe('createOrUpdateDataSource()', () => {

    const functionInvocation = [
      DataSourcesApi.createOrUpdateDataSource, MOCK_DS_OBJ
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      DataSourcesApi.createOrUpdateDataSource(MOCK_DS_OBJ)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith('/', MOCK_DS_OBJ);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_SOURCES_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testDeleteDataSource() {

  describe('deleteDataSource()', () => {

    const functionInvocation = [
      DataSourcesApi.deleteDataSource, MOCK_DS_UUID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      DataSourcesApi.deleteDataSource(MOCK_DS_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/${MOCK_DS_UUID}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_SOURCES_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testStartSync() {

  describe('startSync()', () => {

    const functionInvocation = [
      DataSourcesApi.startSync, MOCK_DS_UUID
    ];

    it('should send a POST request with the correct URL path', (done) => {

      DataSourcesApi.startSync(MOCK_DS_UUID)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/${MOCK_DS_UUID}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_SOURCES_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testSignalSyncCompleted() {

  describe('signalSyncCompleted()', () => {

    const functionInvocation = [
      DataSourcesApi.signalSyncCompleted, MOCK_DS_UUID, MOCK_SYNC_UUID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      DataSourcesApi.signalSyncCompleted(MOCK_DS_UUID, MOCK_SYNC_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/${MOCK_DS_UUID}/${MOCK_SYNC_UUID}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(DATA_SOURCES_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
