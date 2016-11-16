import BBPromise from 'bluebird';

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PermissionsApi from '../../src/api/PermissionsApi';

import {
  PERMISSIONS_API
} from '../../src/constants/ApiNames';

import {
  ENTITY_TYPE_PATH,
  ENTITY_SET_PATH
} from '../../src/constants/ApiPaths';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_FQN = {
  namespace: 'LOOM',
  name: 'PERMISSIONS_API'
};

const MOCK_ES_NAME = 'LoomDataApis';

const MOCK_DATA = {
  type: MOCK_FQN
};

const MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES = [{
  role: 'role',
  action: 'add',
  type: {
    namespace: 'LOOM',
    name: 'MyEntity'
  },
  permissions: ['read', 'write']
}];

/* eslint-disable no-array-constructor, no-new-object */
const INVALID_INPUT = [
  undefined,
  null,
  [],
  new Array(),
  {},
  new Object(),
  true,
  false,
  -1,
  0,
  1,
  '',
  ' ',
  /regex/
];
/* eslint-enable */

let mockAxiosInstance = null;

function testApiAxiosInstanceInvocation() {

  it('should invoke getApiAxiosInstance() once with the correct API', () => {
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(PERMISSIONS_API);
  });
}

function testApiMethods() {

  it('should expose updateAclsForEntityTypes()', () => {
    expect(PermissionsApi.updateAclsForEntityTypes).toEqual(jasmine.any(Function));
  });

  it('should expose removeAclsForEntityTypes()', () => {
    expect(PermissionsApi.removeAclsForEntityTypes).toEqual(jasmine.any(Function));
  });

  it('should expose updateAclsForEntitySets()', () => {
    expect(PermissionsApi.updateAclsForEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose removeAclsForEntitySets()', () => {
    expect(PermissionsApi.removeAclsForEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose updateAclsForPropertyTypesInEntityTypes()', () => {
    expect(PermissionsApi.updateAclsForPropertyTypesInEntityTypes).toEqual(jasmine.any(Function));
  });

  it('should expose removeAclsForPropertyTypesInEntityTypes()', () => {
    expect(PermissionsApi.removeAclsForPropertyTypesInEntityTypes).toEqual(jasmine.any(Function));
  });

  it('should expose updateAclsForPropertyTypesInEntitySets()', () => {
    expect(PermissionsApi.updateAclsForPropertyTypesInEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose removeAclsForPropertyTypesInEntitySets()', () => {
    expect(PermissionsApi.removeAclsForPropertyTypesInEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose removeAllAclsForPropertyTypesInEntityTypes()', () => {
    expect(PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes).toEqual(jasmine.any(Function));
  });

  it('should expose removeAllAclsForPropertyTypesInEntitySets()', () => {
    expect(PermissionsApi.removeAllAclsForPropertyTypesInEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose getAclsForEntityType()', () => {
    expect(PermissionsApi.getAclsForEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose getAclsForEntitySet()', () => {
    expect(PermissionsApi.getAclsForEntitySet).toEqual(jasmine.any(Function));
  });

  it('should expose getAclsForPropertyTypesInEntityType()', () => {
    expect(PermissionsApi.getAclsForPropertyTypesInEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose getAclsForPropertyTypesInEntitySet()', () => {
    expect(PermissionsApi.getAclsForPropertyTypesInEntitySet).toEqual(jasmine.any(Function));
  });

  it('should expose getOwnerAclsForEntitySet()', () => {
    expect(PermissionsApi.getOwnerAclsForEntitySet).toEqual(jasmine.any(Function));
  });

  it('should expose getOwnerAclsForPropertyTypesInEntitySet()', () => {
    expect(PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet).toEqual(jasmine.any(Function));
  });

  it('should expose getAllReceivedRequestsForPermissions()', () => {
    expect(PermissionsApi.getAllReceivedRequestsForPermissions).toEqual(jasmine.any(Function));
  });

  it('should expose getAllSentRequestsForPermissions()', () => {
    expect(PermissionsApi.getAllSentRequestsForPermissions).toEqual(jasmine.any(Function));
  });

  it('should expose addPermissionsRequestForPropertyTypesInEntitySet()', () => {
    expect(PermissionsApi.addPermissionsRequestForPropertyTypesInEntitySet).toEqual(jasmine.any(Function));
  });

  it('should expose removePermissionsRequestForEntitySet()', () => {
    expect(PermissionsApi.removePermissionsRequestForEntitySet).toEqual(jasmine.any(Function));
  });
}

function testUpdateAclsForEntityTypes() {

  describe('updateAclsForEntityTypes()', () => {

    beforeEach(() => {
      PermissionsApi.updateAclsForEntityTypes(MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES);
    });

    testApiAxiosInstanceInvocation();

    it('should send a POST request with the correct URL path and data', () => {

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}`,
        MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.updateAclsForEntityTypes(MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.updateAclsForEntityTypes(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.updateAclsForEntityTypes([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.updateAclsForEntityTypes(invalidInput)
        );

        promises.push(
          PermissionsApi.updateAclsForEntityTypes([invalidInput])
        );
      });

      BBPromise.any(promises)
        .then(() => {
          done.fail();
        })
        .catch(() => {
          done();
        });
    });

  });
}

function testRemoveAclsForEntityTypes() {

  describe('removeAclsForEntityTypes()', () => {

    beforeEach(() => {
      PermissionsApi.removeAclsForEntityTypes([MOCK_FQN]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a DELETE request with the correct URL path and data', () => {

      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}`,
        { data: [MOCK_FQN] }
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.removeAclsForEntityTypes([MOCK_FQN]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.removeAclsForEntityTypes(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.removeAclsForEntityTypes([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.removeAclsForEntityTypes(invalidInput)
        );

        promises.push(
          PermissionsApi.removeAclsForEntityTypes([invalidInput])
        );
      });

      BBPromise.any(promises)
        .then(() => {
          done.fail();
        })
        .catch(() => {
          done();
        });
    });

  });
}

function testUpdateAclsForEntitySets() {

  describe('updateAclsForEntitySets()', () => {

    beforeEach(() => {
      PermissionsApi.updateAclsForEntitySets([MOCK_DATA]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a POST request with the correct URL path and data', () => {

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}`,
        [MOCK_DATA]
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.updateAclsForEntitySets([MOCK_DATA]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.updateAclsForEntitySets(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.updateAclsForEntitySets([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.updateAclsForEntitySets(invalidInput)
        );

        promises.push(
          PermissionsApi.updateAclsForEntitySets([invalidInput])
        );
      });

      BBPromise.any(promises)
        .then(() => {
          done.fail();
        })
        .catch(() => {
          done();
        });
    });

  });
}

function testRemoveAclsForEntitySets() {

}

function testUpdateAclsForPropertyTypesInEntityTypes() {

}

function testRemoveAclsForPropertyTypesInEntityTypes() {

}

function testUpdateAclsForPropertyTypesInEntitySets() {

}

function testRemoveAclsForPropertyTypesInEntitySets() {

}

function testRemoveAllAclsForPropertyTypesInEntityTypes() {

}

function testRemoveAllAclsForPropertyTypesInEntitySets() {

}

function testGetAclsForEntityType() {

}

function testGetAclsForEntitySet() {

}

function testGetAclsForPropertyTypesInEntityType() {

}

function testGetAclsForPropertyTypesInEntitySet() {

}

function testGetOwnerAclsForEntitySet() {

}

function testGetOwnerAclsForPropertyTypesInEntitySet() {

}

function testGetAllReceivedRequestsForPermissions() {

}

function testGetAllSentRequestsForPermissions() {

}

function testAddPermissionsRequestForPropertyTypesInEntitySet() {

}

function testRemovePermissionsRequestForEntitySet() {

}

describe('PermissionsApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testApiMethods();
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
  testGetOwnerAclsForPropertyTypesInEntitySet();
  testGetAllReceivedRequestsForPermissions();
  testGetAllSentRequestsForPermissions();
  testAddPermissionsRequestForPropertyTypesInEntitySet();
  testRemovePermissionsRequestForEntitySet();
});
