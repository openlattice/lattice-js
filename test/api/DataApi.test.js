import BBPromise from 'bluebird';

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as DataApi from '../../src/api/DataApi';

import {
  DATA_API
} from '../../src/constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  MULTIPLE_PATH
} from '../../src/constants/ApiPaths';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const DATA_API_BASE_URL = AxiosUtils.getApiBaseUrl(DATA_API);

const MOCK_FQN = {
  namespace: 'LOOM',
  name: 'DATA_API'
};

const MOCK_ES_NAME = 'LoomDataApis';

const MOCK_CREATE_ENTITY_DATA = {
  type: MOCK_FQN,
  entitySetName: MOCK_ES_NAME,
  properties: [
    { 'LOOM.MY_PROPERTY': 'testing' }
  ]
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
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(DATA_API);
  });
}

function testApiMethods() {

  it('should expose getAllEntitiesOfType()', () => {
    expect(DataApi.getAllEntitiesOfType).toEqual(jasmine.any(Function));
  });

  it('should expose getAllEntitiesOfTypeFileUrl()', () => {
    expect(DataApi.getAllEntitiesOfTypeFileUrl).toEqual(jasmine.any(Function));
  });

  it('should expose getAllEntitiesOfTypeInSet()', () => {
    expect(DataApi.getAllEntitiesOfTypeInSet).toEqual(jasmine.any(Function));
  });

  it('should expose getAllEntitiesOfTypeInSetFileUrl()', () => {
    expect(DataApi.getAllEntitiesOfTypeInSetFileUrl).toEqual(jasmine.any(Function));
  });

  it('should expose createEntity()', () => {
    expect(DataApi.createEntity).toEqual(jasmine.any(Function));
  });
}

function testGetAllEntitiesOfType() {

  describe('getAllEntitiesOfType()', () => {

    beforeEach(() => {
      DataApi.getAllEntitiesOfType(MOCK_FQN);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {

      const returnValue = DataApi.getAllEntitiesOfType(MOCK_FQN);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          DataApi.getAllEntitiesOfType(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          DataApi.getAllEntitiesOfType(invalidInput)
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

function testGetAllEntitiesOfTypeFileUrl() {

  describe('getAllEntitiesOfTypeFileUrl()', () => {

    it('should return the correct URL', () => {

      expect(DataApi.getAllEntitiesOfTypeFileUrl(MOCK_FQN, 'json')).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=json`
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          DataApi.getAllEntitiesOfTypeFileUrl(invalidInput, 'json');
        }).not.toThrow();

        expect(() => {
          DataApi.getAllEntitiesOfTypeFileUrl(MOCK_FQN, invalidInput);
        }).not.toThrow();
      });
    });

    it('should return null when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(DataApi.getAllEntitiesOfTypeFileUrl(invalidInput, 'json')).toEqual(null);
        expect(DataApi.getAllEntitiesOfTypeFileUrl(MOCK_FQN, invalidInput)).toEqual(null);
      });
    });

  });
}

function testGetAllEntitiesOfTypeInSet() {

  describe('getAllEntitiesOfTypeInSet()', () => {

    beforeEach(() => {
      DataApi.getAllEntitiesOfTypeInSet(MOCK_FQN, MOCK_ES_NAME);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {

      const returnValue = DataApi.getAllEntitiesOfTypeInSet(MOCK_FQN, MOCK_ES_NAME);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a GET request with the correct URL path', () => {

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ES_NAME}`
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          DataApi.getAllEntitiesOfTypeInSet(invalidInput, MOCK_ES_NAME).catch(() => {});
        }).not.toThrow();

        expect(() => {
          DataApi.getAllEntitiesOfTypeInSet(MOCK_FQN, invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          DataApi.getAllEntitiesOfTypeInSet(invalidInput, MOCK_ES_NAME)
        );
        promises.push(
          DataApi.getAllEntitiesOfTypeInSet(MOCK_FQN, invalidInput)
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

function testGetAllEntitiesOfTypeInSetFileUrl() {

  describe('getAllEntitiesOfTypeInSetFileUrl()', () => {

    it('should return the correct URL', () => {

      const url = DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, MOCK_ES_NAME, 'json');
      expect(url).toEqual(
        `${DATA_API_BASE_URL}/${ENTITY_DATA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ES_NAME}?fileType=json`
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          DataApi.getAllEntitiesOfTypeInSetFileUrl(invalidInput, MOCK_ES_NAME, 'json');
        }).not.toThrow();

        expect(() => {
          DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, invalidInput, 'json');
        }).not.toThrow();

        expect(() => {
          DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, MOCK_ES_NAME, invalidInput);
        }).not.toThrow();
      });
    });

    it('should return null when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(DataApi.getAllEntitiesOfTypeInSetFileUrl(invalidInput, MOCK_ES_NAME, 'json')).toEqual(null);
        expect(DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, invalidInput, 'json')).toEqual(null);
        expect(DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, MOCK_ES_NAME, invalidInput)).toEqual(null);
      });
    });

  });
}

function testGetAllEntitiesOfTypes() {

  describe('getAllEntitiesOfTypes()', () => {

    beforeEach(() => {
      DataApi.getAllEntitiesOfTypes([MOCK_FQN]);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {

      const returnValue = DataApi.getAllEntitiesOfTypes([MOCK_FQN]);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a PUT request with the correct URL path and data', () => {

      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        `/${ENTITY_DATA_PATH}/${MULTIPLE_PATH}`,
        [MOCK_FQN]
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {

        expect(() => {
          DataApi.getAllEntitiesOfTypes(invalidInput).catch(() => {});
        }).not.toThrow();

        expect(() => {
          DataApi.getAllEntitiesOfTypes([invalidInput]).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          DataApi.getAllEntitiesOfTypes(invalidInput)
        );
        promises.push(
          DataApi.getAllEntitiesOfTypes([invalidInput])
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

function testCreateEntity() {

  describe('createEntity()', () => {

    beforeEach(() => {
      DataApi.createEntity(MOCK_CREATE_ENTITY_DATA);
    });

    testApiAxiosInstanceInvocation();

    it('should return a Promise', () => {

      const returnValue = DataApi.createEntity(MOCK_CREATE_ENTITY_DATA);
      expect(returnValue).toEqual(jasmine.any(Promise));
    });

    it('should send a POST request with the correct URL path and data', () => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ENTITY_DATA_PATH}`,
        MOCK_CREATE_ENTITY_DATA
      );
    });

    it('should not throw when given invalid parameters', () => {

      INVALID_INPUT.forEach((invalidInput) => {
        expect(() => {
          DataApi.createEntity(invalidInput).catch(() => {});
        }).not.toThrow();
      });
    });

    it('should reject when given invalid parameters', (done) => {

      const promises = [];
      INVALID_INPUT.forEach((invalidInput) => {
        promises.push(
          DataApi.createEntity(invalidInput)
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

describe('DataApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testApiMethods();
  testGetAllEntitiesOfType();
  testGetAllEntitiesOfTypeFileUrl();
  testGetAllEntitiesOfTypeInSet();
  testGetAllEntitiesOfTypeInSetFileUrl();
  testGetAllEntitiesOfTypes();
  testCreateEntity();
});
