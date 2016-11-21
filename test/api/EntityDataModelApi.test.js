/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as EntityDataModelApi from '../../src/api/EntityDataModelApi';

import {
  EDM_API
} from '../../src/constants/ApiNames';

import {
  ADD_PROPERTY_TYPES_PATH,
  DELETE_PROPERTY_TYPES_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH
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

const MOCK_SCHEMA_FQN = {
  namespace: 'LOOM',
  name: 'EDM_API'
};

const MOCK_ENTITY_TYPE_FQN = {
  namespace: 'LOOM',
  name: 'ENTITY_TYPE'
};

const MOCK_PROPERTY_TYPE_FQN = {
  namespace: 'LOOM',
  name: 'PROPERTY_TYPE'
};

const MOCK_ENTITY_SET = {
  name: 'EntityTypes',
  type: MOCK_ENTITY_TYPE_FQN,
  title: 'a collection EntityTypes'
};

const MOCK_ENTITY_TYPE = {
  namespace: 'LOOM',
  type: 'ENTITY_TYPE',
  key: [
    { namespace: 'LOOM', name: 'PROPERTY_TYPE' }
  ],
  properties: [
    { namespace: 'LOOM', name: 'PROPERTY_TYPE' }
  ]
};

const MOCK_PROPERTY_TYPE = {
  namespace: MOCK_PROPERTY_TYPE_FQN.namespace,
  name: MOCK_PROPERTY_TYPE_FQN.name,
  datatype: 'String',
  properties: 0
};

let mockAxiosInstance = null;

describe('EntityDataModelApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetEntityDataModel();
  testGetSchema();
  testGetAllSchemas();
  testGetAllSchemasInNamespace();
  testCreateSchema();
  testAddEntityTypesToSchema();
  testRemoveEntityTypesFromSchema();
  testAddPropertyTypesToSchema();
  testRemovePropertyTypesFromSchema();
  testGetAllEntitySets();
  testCreateEntitySets();
  testGetEntityType();
  testGetAllEntityTypes();
  testCreateEntityType();
  testDeleteEntityType();
  testAddPropertyTypesToEntityType();
  testRemovePropertyTypesFromEntityType();
  testGetPropertyType();
  testGetAllPropertyTypes();
  testGetAllPropertyTypesInNamespace();
  testCreatePropertyType();
  testDeletePropertyType();
});

function testGetEntityDataModel() {

  describe('getEntityDataModel()', () => {

    const functionInvocation = [
      EntityDataModelApi.getEntityDataModel
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityDataModel()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith('/');
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}

function testGetSchema() {

  describe('getSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.getSchema, MOCK_SCHEMA_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getSchema(MOCK_SCHEMA_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllSchemas() {

  describe('getAllSchemas()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllSchemas
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllSchemas()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);

  });
}

function testGetAllSchemasInNamespace() {

  describe('getAllSchemasInNamespace()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllSchemasInNamespace, MOCK_SCHEMA_FQN.namespace
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllSchemasInNamespace(MOCK_SCHEMA_FQN.namespace)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreateSchema() {

  describe('createSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.createSchema, MOCK_SCHEMA_FQN
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.createSchema(MOCK_SCHEMA_FQN)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}`,
            MOCK_SCHEMA_FQN
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddEntityTypesToSchema() {

  describe('addEntityTypesToSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.addEntityTypesToSchema, MOCK_SCHEMA_FQN, [MOCK_ENTITY_TYPE_FQN]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.addEntityTypesToSchema(MOCK_SCHEMA_FQN, [MOCK_ENTITY_TYPE_FQN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`,
            [MOCK_ENTITY_TYPE_FQN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveEntityTypesFromSchema() {

  describe('removeEntityTypesFromSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.removeEntityTypesFromSchema, MOCK_SCHEMA_FQN, [MOCK_ENTITY_TYPE_FQN]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.removeEntityTypesFromSchema(MOCK_SCHEMA_FQN, [MOCK_ENTITY_TYPE_FQN])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`,
            { data: [MOCK_ENTITY_TYPE_FQN] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddPropertyTypesToSchema() {

  describe('addPropertyTypesToSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.addPropertyTypesToSchema, MOCK_SCHEMA_FQN, [MOCK_PROPERTY_TYPE_FQN]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.addPropertyTypesToSchema(MOCK_SCHEMA_FQN, [MOCK_PROPERTY_TYPE_FQN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}/${ADD_PROPERTY_TYPES_PATH}`,
            [MOCK_PROPERTY_TYPE_FQN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemovePropertyTypesFromSchema() {

  describe('removePropertyTypesFromSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.removePropertyTypesFromSchema, MOCK_SCHEMA_FQN, [MOCK_PROPERTY_TYPE_FQN]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.removePropertyTypesFromSchema(MOCK_SCHEMA_FQN, [MOCK_PROPERTY_TYPE_FQN])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}/${DELETE_PROPERTY_TYPES_PATH}`,
            { data: [MOCK_PROPERTY_TYPE_FQN] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllEntitySets() {

  describe('getAllEntitySets()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllEntitySets
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllEntitySets()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    const functionInvocation = [
      EntityDataModelApi.createEntitySets, [MOCK_ENTITY_SET]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEntitySets([MOCK_ENTITY_SET])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}`,
            [MOCK_ENTITY_SET]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetEntityType() {

  describe('getEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.getEntityType, MOCK_ENTITY_TYPE_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityType(MOCK_ENTITY_TYPE_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllEntityTypes() {

  describe('getAllEntityTypes()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllEntityTypes
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllEntityTypes()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.createEntityType, MOCK_ENTITY_TYPE
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEntityType(MOCK_ENTITY_TYPE)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}`,
            MOCK_ENTITY_TYPE
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testDeleteEntityType() {

  describe('deleteEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.deleteEntityType, MOCK_ENTITY_TYPE_FQN
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntityType(MOCK_ENTITY_TYPE_FQN)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddPropertyTypesToEntityType() {

  describe('addPropertyTypesToEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.addPropertyTypesToEntityType, MOCK_ENTITY_TYPE_FQN, [MOCK_PROPERTY_TYPE_FQN]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.addPropertyTypesToEntityType(MOCK_ENTITY_TYPE_FQN, [MOCK_PROPERTY_TYPE_FQN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}/${ADD_PROPERTY_TYPES_PATH}`, // eslint-disable-line
            [MOCK_PROPERTY_TYPE_FQN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemovePropertyTypesFromEntityType() {

  describe('removePropertyTypesFromEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.removePropertyTypesFromEntityType, MOCK_ENTITY_TYPE_FQN, [MOCK_PROPERTY_TYPE_FQN]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.removePropertyTypesFromEntityType(MOCK_ENTITY_TYPE_FQN, [MOCK_PROPERTY_TYPE_FQN])
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}/${DELETE_PROPERTY_TYPES_PATH}`, // eslint-disable-line
            { data: [MOCK_PROPERTY_TYPE_FQN] }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetPropertyType() {

  describe('getPropertyType()', () => {

    const functionInvocation = [
      EntityDataModelApi.getPropertyType, MOCK_PROPERTY_TYPE_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyType(MOCK_PROPERTY_TYPE_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_FQN.namespace}/${MOCK_PROPERTY_TYPE_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllPropertyTypes() {

  describe('getAllPropertyTypes()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllPropertyTypes
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllPropertyTypes()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllPropertyTypesInNamespace, MOCK_PROPERTY_TYPE_FQN.namespace
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllPropertyTypesInNamespace(MOCK_PROPERTY_TYPE_FQN.namespace)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_FQN.namespace}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreatePropertyType() {

  describe('createPropertyType()', () => {

    const functionInvocation = [
      EntityDataModelApi.createPropertyType, MOCK_PROPERTY_TYPE
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createPropertyType(MOCK_PROPERTY_TYPE)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}`,
            MOCK_PROPERTY_TYPE
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testDeletePropertyType() {

  describe('deletePropertyType()', () => {

    const functionInvocation = [
      EntityDataModelApi.deletePropertyType, MOCK_PROPERTY_TYPE_FQN
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.deletePropertyType(MOCK_PROPERTY_TYPE_FQN)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_FQN.namespace}/${MOCK_PROPERTY_TYPE_FQN.name}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(EDM_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);
  });
}
