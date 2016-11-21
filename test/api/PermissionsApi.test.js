/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PermissionsApi from '../../src/api/PermissionsApi';

import {
  PERMISSIONS_API
} from '../../src/constants/ApiNames';

import {
  ALL_PATH,
  ENTITY_TYPE_PATH,
  ENTITY_SET_PATH,
  OWNER_PATH,
  PROPERTY_TYPE_PATH,
  REQUESTS_PATH
} from '../../src/constants/ApiPaths';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldNotRejectOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_FQN = {
  namespace: 'LOOM',
  name: 'PERMISSIONS_API'
};

const MOCK_PRINCIPAL = {
  type: 'hello',
  name: 'world'
};

const MOCK_ES_NAME = 'LoomDataApis';
const MOCK_REQUEST_ID = 'requestId';

const MOCK_DATA = {
  type: MOCK_FQN
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

  testUpdateAclsForEntityTypes();
  testRemoveAclsForEntityTypes();
  testUpdateAclsForEntitySets();
  testRemoveAclsForEntitySets();
  testUpdateAclsForPropertyTypesInEntityTypes();
  testRemoveAclsForPropertyTypesInEntityTypes();
  testUpdateAclsForPropertyTypesInEntitySets();
  testRemoveAclsForPropertyTypesInEntitySets();
  testRemoveAllAclsForPropertyTypesInEntityTypes();
  testRemoveAllAclsForPropertyTypesInEntitySets();
  testGetAclsForEntityType();
  testGetAclsForEntitySet();
  testGetAclsForPropertyTypesInEntityType();
  testGetAclsForPropertyTypesInEntitySet();
  testGetOwnerAclsForEntitySet();
  testGetOwnerAclsForPropertyTypeInEntitySet();
  testGetOwnerAclsForAllPropertyTypesInEntitySet();
  testGetAllReceivedRequestsForPermissions();
  testGetAllSentRequestsForPermissions();
  testAddPermissionsRequestForPropertyTypesInEntitySet();
  testRemovePermissionsRequestForEntitySet();
});

function testUpdateAclsForEntityTypes() {

  describe('updateAclsForEntityTypes()', () => {

    const functionInvocation = [
      PermissionsApi.updateAclsForEntityTypes, [MOCK_DATA]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.updateAclsForEntityTypes([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}`,
            [MOCK_DATA]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAclsForEntityTypes() {

  describe('removeAclsForEntityTypes()', () => {

    const functionInvocation = [
      PermissionsApi.removeAclsForEntityTypes, [MOCK_FQN]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removeAclsForEntityTypes([MOCK_FQN])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}`,
            { data: [MOCK_FQN] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testUpdateAclsForEntitySets() {

  describe('updateAclsForEntitySets()', () => {

    const functionInvocation = [
      PermissionsApi.updateAclsForEntitySets, [MOCK_DATA]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.updateAclsForEntitySets([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}`,
            [MOCK_DATA]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAclsForEntitySets() {

  describe('removeAclsForEntitySets()', () => {

    const functionInvocation = [
      PermissionsApi.removeAclsForEntitySets, [MOCK_ES_NAME]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removeAclsForEntitySets([MOCK_ES_NAME])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}`,
            { data: [MOCK_ES_NAME] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testUpdateAclsForPropertyTypesInEntityTypes() {

  describe('updateAclsForPropertyTypesInEntityTypes()', () => {

    const functionInvocation = [
      PermissionsApi.updateAclsForPropertyTypesInEntityTypes, [MOCK_DATA]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.updateAclsForPropertyTypesInEntityTypes([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`,
            [MOCK_DATA]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAclsForPropertyTypesInEntityTypes() {

  describe('removeAclsForPropertyTypesInEntityTypes()', () => {

    const functionInvocation = [
      PermissionsApi.removeAclsForPropertyTypesInEntityTypes, [MOCK_DATA]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removeAclsForPropertyTypesInEntityTypes([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`,
            { data: [MOCK_DATA] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testUpdateAclsForPropertyTypesInEntitySets() {

  describe('updateAclsForPropertyTypesInEntitySets()', () => {

    const functionInvocation = [
      PermissionsApi.updateAclsForPropertyTypesInEntitySets, [MOCK_DATA]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.updateAclsForPropertyTypesInEntitySets([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`,
            [MOCK_DATA]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAclsForPropertyTypesInEntitySets() {

  describe('removeAclsForPropertyTypesInEntitySets()', () => {

    const functionInvocation = [
      PermissionsApi.removeAclsForPropertyTypesInEntitySets, [MOCK_DATA]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removeAclsForPropertyTypesInEntitySets([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`,
            { data: [MOCK_DATA] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAllAclsForPropertyTypesInEntityTypes() {

  describe('removeAllAclsForPropertyTypesInEntityTypes()', () => {

    const functionInvocation = [
      PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes, [MOCK_FQN]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes([MOCK_FQN])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`,
            { data: [MOCK_FQN] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAllAclsForPropertyTypesInEntitySets() {

  describe('removeAllAclsForPropertyTypesInEntitySets()', () => {

    const functionInvocation = [
      PermissionsApi.removeAllAclsForPropertyTypesInEntitySets, [MOCK_ES_NAME]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removeAllAclsForPropertyTypesInEntitySets([MOCK_ES_NAME])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`,
            { data: [MOCK_ES_NAME] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAclsForEntityType() {

  describe('getAclsForEntityType()', () => {

    const functionInvocation = [
      PermissionsApi.getAclsForEntityType, MOCK_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getAclsForEntityType(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}?namespace=${MOCK_FQN.namespace}&name=${MOCK_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAclsForEntitySet() {

  describe('getAclsForEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.getAclsForEntitySet, MOCK_ES_NAME
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getAclsForEntitySet(MOCK_ES_NAME)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}?name=${MOCK_ES_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAclsForPropertyTypesInEntityType() {

  describe('getAclsForPropertyTypesInEntityType()', () => {

    const functionInvocation = [
      PermissionsApi.getAclsForPropertyTypesInEntityType, MOCK_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getAclsForPropertyTypesInEntityType(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}?namespace=${MOCK_FQN.namespace}&name=${MOCK_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAclsForPropertyTypesInEntitySet() {

  describe('getAclsForPropertyTypesInEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.getAclsForPropertyTypesInEntitySet, MOCK_ES_NAME
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getAclsForPropertyTypesInEntitySet(MOCK_ES_NAME)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}?name=${MOCK_ES_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetOwnerAclsForEntitySet() {

  describe('getOwnerAclsForEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.getOwnerAclsForEntitySet, MOCK_ES_NAME
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getOwnerAclsForEntitySet(MOCK_ES_NAME)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${OWNER_PATH}?name=${MOCK_ES_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetOwnerAclsForPropertyTypeInEntitySet() {

  describe('getOwnerAclsForPropertyTypeInEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.getOwnerAclsForPropertyTypeInEntitySet, MOCK_ES_NAME, MOCK_FQN
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.getOwnerAclsForPropertyTypeInEntitySet(MOCK_ES_NAME, MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${OWNER_PATH}/${PROPERTY_TYPE_PATH}?name=${MOCK_ES_NAME}`,
            MOCK_FQN
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetOwnerAclsForAllPropertyTypesInEntitySet() {

  describe('getOwnerAclsForAllPropertyTypesInEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.getOwnerAclsForAllPropertyTypesInEntitySet, MOCK_ES_NAME, MOCK_PRINCIPAL
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.getOwnerAclsForAllPropertyTypesInEntitySet(MOCK_ES_NAME, MOCK_PRINCIPAL)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${OWNER_PATH}?name=${MOCK_ES_NAME}`,
            MOCK_PRINCIPAL
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllReceivedRequestsForPermissions() {

  describe('getAllReceivedRequestsForPermissions()', () => {

    const functionInvocation = [
      PermissionsApi.getAllReceivedRequestsForPermissions, MOCK_ES_NAME
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getAllReceivedRequestsForPermissions(MOCK_ES_NAME)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${OWNER_PATH}/${REQUESTS_PATH}?name=${MOCK_ES_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldNotRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllSentRequestsForPermissions() {

  describe('getAllSentRequestsForPermissions()', () => {

    const functionInvocation = [
      PermissionsApi.getAllSentRequestsForPermissions, MOCK_ES_NAME
    ];

    it('should send a GET request with the correct URL path', (done) => {

      PermissionsApi.getAllSentRequestsForPermissions(MOCK_ES_NAME)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${REQUESTS_PATH}?name=${MOCK_ES_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldNotRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddPermissionsRequestForPropertyTypesInEntitySet() {

  describe('addPermissionsRequestForPropertyTypesInEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.addPermissionsRequestForPropertyTypesInEntitySet, [MOCK_DATA]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      PermissionsApi.addPermissionsRequestForPropertyTypesInEntitySet([MOCK_DATA])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${REQUESTS_PATH}`,
            [MOCK_DATA]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemovePermissionsRequestForEntitySet() {

  describe('removePermissionsRequestForEntitySet()', () => {

    const functionInvocation = [
      PermissionsApi.removePermissionsRequestForEntitySet, MOCK_REQUEST_ID
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      PermissionsApi.removePermissionsRequestForEntitySet(MOCK_REQUEST_ID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${REQUESTS_PATH}?id=${MOCK_REQUEST_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(PERMISSIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
