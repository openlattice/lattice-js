/* eslint-disable no-use-before-define */

import RequestStateTypes from '../../src/constants/types/RequestStateTypes';

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as RequestsApi from '../../src/api/RequestsApi';

import {
  REQUESTS_API
} from '../../src/constants/ApiNames';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  MOCK_ACL_KEY,
  MOCK_REQUEST_DM,
  MOCK_REQUEST_STATUS_DM
} from '../constants/MockDataModels';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnGivenInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

const GET_ALL_REQUEST_STATUSES_INVALID_PARAMS = [];
GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
  state: 'invalid'
});

INVALID_PARAMS.forEach((invalidParam :any) => {

  if (isDefined(invalidParam)) {
    GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push(
      invalidParam
    );
  }

  GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
    state: invalidParam
  });

  GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
    aclKeys: invalidParam
  });
});

INVALID_PARAMS.forEach((invalidParam1 :any) => {
  INVALID_PARAMS.forEach((invalidParam2 :any) => {
    GET_ALL_REQUEST_STATUSES_INVALID_PARAMS.push({
      state: invalidParam1,
      aclKeys: invalidParam2
    });
  });
});

let mockAxiosInstance = null;

describe('RequestsApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetAllRequestStatuses();
  testSubmitRequests();
  // testUpdateRequestStatuses();
});

function testGetAllRequestStatuses() {

  describe('getAllRequestStatuses()', () => {

    testApiFunctionShouldRejectOnGivenInvalidParameters(
      GET_ALL_REQUEST_STATUSES_INVALID_PARAMS,
      RequestsApi.getAllRequestStatuses
    );

    describe('get all RequestStatuses', () => {

      const functionInvocation = [
        RequestsApi.getAllRequestStatuses
      ];

      it('should send a GET request with the correct URL path', (done) => {

        RequestsApi.getAllRequestStatuses()
          .then(() => {
            expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
              url: '/',
              method: 'get'
            });
            done();
          })
          .catch(() => {
            done.fail();
          });
      });

      testApiFunctionShouldGetCorrectAxiosInstance(REQUESTS_API, ...functionInvocation);
      testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

    });

    describe('get all RequestStatuses for the specified RequestState', () => {

      const invocationParameters = [
        { state: RequestStateTypes.SUBMITTED }
      ];

      const functionInvocation = [
        RequestsApi.getAllRequestStatuses, ...invocationParameters
      ];

      it('should send a GET request with the correct URL path', (done) => {

        RequestsApi.getAllRequestStatuses(...invocationParameters)
          .then(() => {
            expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
              url: `/${RequestStateTypes.SUBMITTED}`,
              method: 'get'
            });
            done();
          })
          .catch(() => {
            done.fail();
          });
      });

      testApiFunctionShouldGetCorrectAxiosInstance(REQUESTS_API, ...functionInvocation);
      testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

    });

    describe('get all RequestStatuses for the specified AclKeys', () => {

      const invocationParameters = [
        { aclKeys: [MOCK_ACL_KEY] }
      ];

      const functionInvocation = [
        RequestsApi.getAllRequestStatuses, ...invocationParameters
      ];

      it('should send a POST request with the correct URL path and data', (done) => {

        RequestsApi.getAllRequestStatuses(...invocationParameters)
          .then(() => {
            expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
              url: '/',
              method: 'post',
              data: [MOCK_ACL_KEY]
            });
            done();
          })
          .catch(() => {
            done.fail();
          });
      });

      it('should send a Set of AclKeys by correctly removing duplicates', (done) => {

        const aclKeys = [
          ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
          ['ec6865e6-e60e-424b-a071-6a9c1603d735', '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e'],
          ['8f79e123-3411-4099-a41f-88e5d22d0e8d'],
          ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
          ['fae6af98-2675-45bd-9a5b-1619a87235a8', '4b08e1f9-4a00-4169-92ea-10e377070220'],
          ['ec6865e6-e60e-424b-a071-6a9c1603d735', '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e']
        ];

        RequestsApi.getAllRequestStatuses({ aclKeys })
          .then(() => {
            expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
              url: '/',
              method: 'post',
              data: [
                ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
                ['ec6865e6-e60e-424b-a071-6a9c1603d735', '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e'],
                ['8f79e123-3411-4099-a41f-88e5d22d0e8d'],
                ['fae6af98-2675-45bd-9a5b-1619a87235a8', '4b08e1f9-4a00-4169-92ea-10e377070220']
              ]
            });
            done();
          })
          .catch(() => {
            done.fail();
          });
      });

      testApiFunctionShouldGetCorrectAxiosInstance(REQUESTS_API, ...functionInvocation);
      testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

    });

    describe('get all RequestStatuses for the specified RequestState and AclKeys', () => {

      const invocationParameters = [
        {
          state: RequestStateTypes.SUBMITTED,
          aclKeys: [MOCK_ACL_KEY]
        }
      ];

      const functionInvocation = [
        RequestsApi.getAllRequestStatuses, ...invocationParameters
      ];

      it('should send a POST request with the correct URL path and data', (done) => {

        RequestsApi.getAllRequestStatuses(...invocationParameters)
          .then(() => {
            expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
              url: `/${RequestStateTypes.SUBMITTED}`,
              method: 'post',
              data: [MOCK_ACL_KEY]
            });
            done();
          })
          .catch(() => {
            done.fail();
          });
      });

      testApiFunctionShouldGetCorrectAxiosInstance(REQUESTS_API, ...functionInvocation);
      testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

    });

  });
}

function testSubmitRequests() {

  describe('submitRequests()', () => {

    const invocationParameters = [
      [MOCK_REQUEST_DM]
    ];

    const functionInvocation = [
      RequestsApi.submitRequests, ...invocationParameters
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      RequestsApi.submitRequests(...invocationParameters)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith('/', [MOCK_REQUEST_DM]);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(REQUESTS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);
  });
}

function testUpdateRequestStatuses() {

  describe('updateRequestStatuses()', () => {

    const invocationParameters = [
      [MOCK_REQUEST_STATUS_DM]
    ];

    const functionInvocation = [
      RequestsApi.updateRequestStatuses, ...invocationParameters
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      RequestsApi.updateRequestStatuses(...invocationParameters)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/', [MOCK_REQUEST_STATUS_DM]);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(REQUESTS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);
  });
}
