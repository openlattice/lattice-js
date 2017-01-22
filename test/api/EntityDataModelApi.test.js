/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as EntityDataModelApi from '../../src/api/EntityDataModelApi';

import {
  EDM_API
} from '../../src/constants/ApiNames';

import {
  IDS_PATH,
  NAMESPACE_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
} from '../constants/TestConstants';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldRejectOnGivenInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_SCHEMA_FQN = {
  namespace: 'LOOM',
  name: 'EDM_API'
};

const MOCK_ENTITY_TYPE_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';

const MOCK_ENTITY_TYPE_FQN = {
  namespace: 'LOOM',
  name: 'ENTITY_TYPE'
};

const MOCK_PROPERTY_TYPE_UUID = '8f79e123-3411-4099-a41f-88e5d22d0e8d';

const MOCK_PROPERTY_TYPE_FQN = {
  namespace: 'LOOM',
  name: 'PROPERTY_TYPE'
};

const MOCK_ENTITY_SET_UUID = '4b08e1f9-4a00-4169-92ea-10e377070220';

const MOCK_ENTITY_SET = {
  entityTypeId: MOCK_ENTITY_TYPE_UUID,
  name: 'EntityTypes',
  title: 'a collection EntityTypes',
  description: 'a collection EntityTypes'
};

const MOCK_ENTITY_TYPE = {
  title: 'MyEntity',
  description: 'so this is an EntityType',
  type: MOCK_ENTITY_TYPE_FQN,
  schemas: [
    MOCK_SCHEMA_FQN
  ],
  key: [
    MOCK_PROPERTY_TYPE_UUID
  ],
  properties: [
    MOCK_PROPERTY_TYPE_UUID
  ]
};

const MOCK_PROPERTY_TYPE = {
  title: 'MyProperty',
  description: 'so this is a PropertyType',
  type: MOCK_PROPERTY_TYPE_FQN,
  datatype: 'String',
  schemas: [
    MOCK_SCHEMA_FQN
  ]
};

const MOCK_SCHEMA = {
  fqn: MOCK_SCHEMA_FQN,
  entityTypes: [
    MOCK_ENTITY_TYPE
  ],
  propertyTypes: [
    MOCK_PROPERTY_TYPE
  ]
};

const MOCK_ACTION = 'ADD';

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
  testCreateEmptySchema();
  testUpdateSchema();
  testGetEntitySet();
  testGetEntitySetId();
  testGetAllEntitySets();
  testCreateEntitySets();
  testDeleteEntitySet();
  testGetEntityType();
  testGetEntityTypeId();
  testGetAllEntityTypes();
  testCreateEntityType();
  testDeleteEntityType();
  testAddPropertyTypeToEntityType();
  testRemovePropertyTypeFromEntityType();
  testGetPropertyType();
  testGetPropertyTypeId();
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
      EntityDataModelApi.createSchema, MOCK_SCHEMA
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createSchema(MOCK_SCHEMA)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}`,
            MOCK_SCHEMA
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

function testCreateEmptySchema() {

  describe('createEmptySchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.createEmptySchema, MOCK_SCHEMA_FQN
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEmptySchema(MOCK_SCHEMA_FQN)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
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

function testUpdateSchema() {

  describe('updateSchema()', () => {

    const functionInvocation = [
      EntityDataModelApi.updateSchema, MOCK_SCHEMA_FQN, MOCK_ACTION, [MOCK_ENTITY_TYPE_UUID], [MOCK_PROPERTY_TYPE_UUID]
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateSchema(MOCK_SCHEMA_FQN, MOCK_ACTION, [MOCK_ENTITY_TYPE_UUID], [MOCK_PROPERTY_TYPE_UUID])
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`,
            {
              action: MOCK_ACTION,
              entityTypes: [MOCK_ENTITY_TYPE_UUID],
              propertyTypes: [MOCK_PROPERTY_TYPE_UUID]
            }
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
    testApiFunctionShouldRejectOnGivenInvalidParameters(
      INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED,
      ...functionInvocation
    );

  });
}

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const functionInvocation = [
      EntityDataModelApi.getEntitySet, MOCK_ENTITY_SET_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntitySet(MOCK_ENTITY_SET_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_UUID}`,
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

function testGetEntitySetId() {

  describe('getEntitySetId()', () => {

    const functionInvocation = [
      EntityDataModelApi.getEntitySetId, MOCK_ENTITY_SET.name
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntitySetId(MOCK_ENTITY_SET.name)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${IDS_PATH}/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET.name}`,
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

function testDeleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const functionInvocation = [
      EntityDataModelApi.deleteEntitySet, MOCK_ENTITY_SET_UUID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntitySet(MOCK_ENTITY_SET_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_UUID}`
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
      EntityDataModelApi.getEntityType, MOCK_ENTITY_TYPE_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityType(MOCK_ENTITY_TYPE_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_UUID}`
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

function testGetEntityTypeId() {

  describe('getEntityTypeId()', () => {

    const functionInvocation = [
      EntityDataModelApi.getEntityTypeId, MOCK_ENTITY_TYPE_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityTypeId(MOCK_ENTITY_TYPE_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${IDS_PATH}/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}`,
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
      EntityDataModelApi.deleteEntityType, MOCK_ENTITY_TYPE_UUID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntityType(MOCK_ENTITY_TYPE_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_UUID}`
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

function testAddPropertyTypeToEntityType() {

  describe('addPropertyTypeToEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.addPropertyTypeToEntityType, MOCK_ENTITY_TYPE_UUID, MOCK_PROPERTY_TYPE_UUID
    ];

    it('should send a PUT request with the correct URL path', (done) => {

      EntityDataModelApi.addPropertyTypeToEntityType(MOCK_ENTITY_TYPE_UUID, MOCK_PROPERTY_TYPE_UUID)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_UUID}/${MOCK_PROPERTY_TYPE_UUID}`
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

function testRemovePropertyTypeFromEntityType() {

  describe('removePropertyTypeFromEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.removePropertyTypeFromEntityType, MOCK_ENTITY_TYPE_UUID, MOCK_PROPERTY_TYPE_UUID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.removePropertyTypeFromEntityType(MOCK_ENTITY_TYPE_UUID, MOCK_PROPERTY_TYPE_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_UUID}/${MOCK_PROPERTY_TYPE_UUID}`
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
      EntityDataModelApi.getPropertyType, MOCK_PROPERTY_TYPE_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyType(MOCK_PROPERTY_TYPE_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_UUID}`
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

function testGetPropertyTypeId() {

  describe('getPropertyTypeId()', () => {

    const functionInvocation = [
      EntityDataModelApi.getPropertyTypeId, MOCK_PROPERTY_TYPE_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyTypeId(MOCK_PROPERTY_TYPE_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_FQN.namespace}/${MOCK_PROPERTY_TYPE_FQN.name}`,
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
            `/${PROPERTY_TYPE_PATH}/${NAMESPACE_PATH}/${MOCK_PROPERTY_TYPE_FQN.namespace}`
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
      EntityDataModelApi.deletePropertyType, MOCK_PROPERTY_TYPE_UUID
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.deletePropertyType(MOCK_PROPERTY_TYPE_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_UUID}`
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
