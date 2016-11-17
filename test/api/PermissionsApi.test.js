import BBPromise from 'bluebird';

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

  describe('removeAllAclsForPropertyTypesInEntityTypes()', () => {

    beforeEach(() => {
      PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes([MOCK_FQN]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a DELETE request with the correct URL path and data', () => {

      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`,
        { data: [MOCK_FQN] }
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes([MOCK_FQN]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes(invalidInput)
        );

        promises.push(
          PermissionsApi.removeAllAclsForPropertyTypesInEntityTypes([invalidInput])
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

function testRemoveAllAclsForPropertyTypesInEntitySets() {

  describe('removeAllAclsForPropertyTypesInEntitySets()', () => {

    beforeEach(() => {
      PermissionsApi.removeAllAclsForPropertyTypesInEntitySets([MOCK_ES_NAME]);
    });

    testApiAxiosInstanceInvocation();

    it('should send a DELETE request with the correct URL path and data', () => {

      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`,
        { data: [MOCK_ES_NAME] }
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.removeAllAclsForPropertyTypesInEntitySets([MOCK_ES_NAME]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.removeAllAclsForPropertyTypesInEntitySets(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.removeAllAclsForPropertyTypesInEntitySets([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });
    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.removeAllAclsForPropertyTypesInEntitySets(invalidInput)
        );

        promises.push(
          PermissionsApi.removeAllAclsForPropertyTypesInEntitySets([invalidInput])
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

function testGetAclsForEntityType() {

  describe('getAclsForEntityType()', () => {

    beforeEach(() => {
      PermissionsApi.getAclsForEntityType(MOCK_FQN);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}?namespace=${MOCK_FQN.namespace}&name=${MOCK_FQN.name}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getAclsForEntityType(MOCK_FQN);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getAclsForEntityType(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getAclsForEntityType(invalidInput)
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

function testGetAclsForEntitySet() {

  describe('getAclsForEntitySet()', () => {

    beforeEach(() => {
      PermissionsApi.getAclsForEntitySet(MOCK_ES_NAME);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}?name=${MOCK_ES_NAME}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getAclsForEntitySet(MOCK_ES_NAME);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getAclsForEntitySet(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getAclsForEntitySet(invalidInput)
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

function testGetAclsForPropertyTypesInEntityType() {

  describe('getAclsForPropertyTypesInEntityType()', () => {

    beforeEach(() => {
      PermissionsApi.getAclsForPropertyTypesInEntityType(MOCK_FQN);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}?namespace=${MOCK_FQN.namespace}&name=${MOCK_FQN.name}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getAclsForPropertyTypesInEntityType(MOCK_FQN);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getAclsForPropertyTypesInEntityType(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getAclsForPropertyTypesInEntityType(invalidInput)
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

function testGetAclsForPropertyTypesInEntitySet() {

  describe('getAclsForPropertyTypesInEntitySet()', () => {

    beforeEach(() => {
      PermissionsApi.getAclsForPropertyTypesInEntitySet(MOCK_ES_NAME);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}?name=${MOCK_ES_NAME}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getAclsForPropertyTypesInEntitySet(MOCK_ES_NAME);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getAclsForPropertyTypesInEntitySet(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getAclsForPropertyTypesInEntitySet(invalidInput)
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

function testGetOwnerAclsForEntitySet() {

  describe('getOwnerAclsForEntitySet()', () => {

    beforeEach(() => {
      PermissionsApi.getOwnerAclsForEntitySet(MOCK_ES_NAME);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${OWNER_PATH}?name=${MOCK_ES_NAME}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getOwnerAclsForEntitySet(MOCK_ES_NAME);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getOwnerAclsForEntitySet(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getOwnerAclsForEntitySet(invalidInput)
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

function testGetOwnerAclsForPropertyTypesInEntitySet() {

  describe('getOwnerAclsForPropertyTypesInEntitySet()', () => {

    beforeEach(() => {
      PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet(MOCK_ES_NAME, MOCK_PRINCIPAL);
    });

    testApiAxiosInstanceInvocation();

    it('should send a POST request with the correct URL path and data', () => {

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${OWNER_PATH}?name=${MOCK_ES_NAME}`,
        MOCK_PRINCIPAL
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet(MOCK_ES_NAME, MOCK_PRINCIPAL);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet(invalidInput, MOCK_PRINCIPAL).catch(() => {});
        }).not.toThrow();

        expect(() => {
          PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet(MOCK_ES_NAME, invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {

        promises.push(
          PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet(invalidInput, MOCK_PRINCIPAL)
        );

        promises.push(
          PermissionsApi.getOwnerAclsForPropertyTypesInEntitySet(MOCK_ES_NAME, invalidInput)
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

function testGetAllReceivedRequestsForPermissions() {

  describe('getAllReceivedRequestsForPermissions()', () => {

    beforeEach(() => {
      PermissionsApi.getAllReceivedRequestsForPermissions(MOCK_ES_NAME);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${OWNER_PATH}/${REQUESTS_PATH}?name=${MOCK_ES_NAME}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getAllReceivedRequestsForPermissions(MOCK_ES_NAME);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getAllReceivedRequestsForPermissions(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should not reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getAllReceivedRequestsForPermissions(invalidInput)
        );
      });

      BBPromise.all(promises)
        .then(() => {
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

  });
}

function testGetAllSentRequestsForPermissions() {

  describe('getAllSentRequestsForPermissions()', () => {

    beforeEach(() => {
      PermissionsApi.getAllSentRequestsForPermissions(MOCK_ES_NAME);
    });

    testApiAxiosInstanceInvocation();

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_SET_PATH}/${REQUESTS_PATH}?name=${MOCK_ES_NAME}`
      );
    });

    it('should return a Promise', () => {

      const returnValue = PermissionsApi.getAllSentRequestsForPermissions(MOCK_ES_NAME);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          PermissionsApi.getAllSentRequestsForPermissions(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should not reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          PermissionsApi.getAllSentRequestsForPermissions(invalidInput)
        );
      });

      BBPromise.all(promises)
        .then(() => {
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

  });
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
