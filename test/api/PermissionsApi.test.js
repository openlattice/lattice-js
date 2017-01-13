/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PermissionsApi from '../../src/api/PermissionsApi';

import {
  PERMISSIONS_API
} from '../../src/constants/ApiNames';

import {
  PERMISSIONS_PATH
} from '../../src/constants/ApiPaths';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_ACL_KEY = [
  {
    type: 'EntityType',
    id: 'ec6865e6-e60e-424b-a071-6a9c1603d735'
  }
];

const MOCK_ACL_DATA = {
  acl: {
    aclKey: MOCK_ACL_KEY,
    aces: [{
      principal: {
        type: 'USER',
        id: 'some_id'
      },
      permissions: ['READ', 'WRITE']
    }]
  },
  action: 'ADD'
};

let mockAxiosInstance = null;

describe('PermissionsApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetAcl();
  testUpdateAcl();
});

function testGetAcl() {

  describe('getAcl()', () => {

    const functionInvocation = [
      PermissionsApi.getAcl, MOCK_ACL_KEY
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.getAcl(MOCK_ACL_KEY)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/',
            MOCK_ACL_KEY
          );
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testUpdateAcl() {

  describe('updateAcl()', () => {

    const functionInvocation = [
      PermissionsApi.updateAcl, MOCK_ACL_DATA
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      PermissionsApi.updateAcl(MOCK_ACL_DATA)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            '/',
            MOCK_ACL_DATA
          );
          done();
        })
        .catch((e) => {
          done.fail(e);
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
