import BBPromise from 'bluebird';

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PermissionsApi from '../../src/api/PermissionsApi';

import {
  PERMISSIONS_API
} from '../../src/constants/ApiNames';

import {
  ENTITY_TYPE_PATH,
  ENTITY_SET_PATH,
  PROPERTY_TYPE_PATH
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
      PermissionsApi.updateAclsForEntityTypes([MOCK_DATA]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a POST request with the correct URL path and data', () => {

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}`,
        [MOCK_DATA]
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.updateAclsForEntityTypes([MOCK_DATA]);
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

  describe('removeAclsForEntitySets()', () => {

    beforeEach(() => {
      PermissionsApi.removeAclsForEntitySets([MOCK_ES_NAME]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a DELETE request with the correct URL path and data', () => {

      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}`,
        { data: [MOCK_ES_NAME] }
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.removeAclsForEntitySets([MOCK_ES_NAME]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.removeAclsForEntitySets(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.removeAclsForEntitySets([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.removeAclsForEntitySets(invalidInput)
        );

        promises.push(
          PermissionsApi.removeAclsForEntitySets([invalidInput])
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

function testUpdateAclsForPropertyTypesInEntityTypes() {

  describe('updateAclsForPropertyTypesInEntityTypes()', () => {

    beforeEach(() => {
      PermissionsApi.updateAclsForPropertyTypesInEntityTypes([MOCK_DATA]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a POST request with the correct URL path and data', () => {

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`,
        [MOCK_DATA]
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.updateAclsForPropertyTypesInEntityTypes([MOCK_DATA]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.updateAclsForPropertyTypesInEntityTypes(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.updateAclsForPropertyTypesInEntityTypes([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.updateAclsForPropertyTypesInEntityTypes(invalidInput)
        );

        promises.push(
          PermissionsApi.updateAclsForPropertyTypesInEntityTypes([invalidInput])
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

function testRemoveAclsForPropertyTypesInEntityTypes() {

  describe('removeAclsForPropertyTypesInEntityTypes()', () => {

    beforeEach(() => {
      PermissionsApi.removeAclsForPropertyTypesInEntityTypes([MOCK_DATA]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a DELETE request with the correct URL path and data', () => {

      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`,
        { data: [MOCK_DATA] }
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.removeAclsForPropertyTypesInEntityTypes([MOCK_DATA]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.removeAclsForPropertyTypesInEntityTypes(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.removeAclsForPropertyTypesInEntityTypes([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.removeAclsForPropertyTypesInEntityTypes(invalidInput)
        );

        promises.push(
          PermissionsApi.removeAclsForPropertyTypesInEntityTypes([invalidInput])
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

function testUpdateAclsForPropertyTypesInEntitySets() {

  describe('updateAclsForPropertyTypesInEntitySets()', () => {

    beforeEach(() => {
      PermissionsApi.updateAclsForPropertyTypesInEntitySets([MOCK_DATA]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a POST request with the correct URL path and data', () => {

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`,
        [MOCK_DATA]
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.updateAclsForPropertyTypesInEntitySets([MOCK_DATA]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.updateAclsForPropertyTypesInEntitySets(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.updateAclsForPropertyTypesInEntitySets([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.updateAclsForPropertyTypesInEntitySets(invalidInput)
        );

        promises.push(
          PermissionsApi.updateAclsForPropertyTypesInEntitySets([invalidInput])
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

function testRemoveAclsForPropertyTypesInEntitySets() {

  describe('removeAclsForPropertyTypesInEntitySets()', () => {

    beforeEach(() => {
      PermissionsApi.removeAclsForPropertyTypesInEntitySets([MOCK_DATA]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a DELETE request with the correct URL path and data', () => {

      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`,
        { data: [MOCK_DATA] }
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.removeAclsForPropertyTypesInEntitySets([MOCK_DATA]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.removeAclsForPropertyTypesInEntitySets(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.removeAclsForPropertyTypesInEntitySets([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.removeAclsForPropertyTypesInEntitySets(invalidInput)
        );

        promises.push(
          PermissionsApi.removeAclsForPropertyTypesInEntitySets([invalidInput])
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

fdescribe('PermissionsApi', () => {

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
