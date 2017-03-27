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
  MOCK_FQN,
  MOCK_ENTITY_SET_DM,
  MOCK_ENTITY_TYPE_DM,
  MOCK_PROPERTY_TYPE_DM,
  MOCK_SCHEMA_DM
} from '../constants/MockDataModels';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  // testApiFunctionShouldRejectOnGivenInvalidParameters,
  testApiFunctionShouldReturnNullOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const EDM_API_BASE_URL = AxiosUtils.getApiBaseUrl(EDM_API);

const MOCK_METADATA_UPDATE = {
  type: MOCK_FQN,
  name: 'name',
  title: 'title',
  description: 'description',
  contacts: ['foo@bar.com']
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
  testGetSchemaFileUrl();
  testCreateSchema();
  testCreateEmptySchema();
  testUpdateSchema();
  testGetEntitySet();
  testGetEntitySetId();
  testGetAllEntitySets();
  testCreateEntitySets();
  testDeleteEntitySet();
  testUpdateEntitySetMetaData();
  testGetEntityType();
  testGetEntityTypeId();
  testGetAllEntityTypes();
  testCreateEntityType();
  testDeleteEntityType();
  testAddPropertyTypeToEntityType();
  testRemovePropertyTypeFromEntityType();
  testUpdateEntityTypeMetaData();
  testGetPropertyType();
  testGetPropertyTypeId();
  testGetAllPropertyTypes();
  testGetAllPropertyTypesInNamespace();
  testCreatePropertyType();
  testDeletePropertyType();
  testUpdatePropertyTypeMetaData();
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
      EntityDataModelApi.getSchema, MOCK_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getSchema(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`
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

function testGetSchemaFileUrl() {

  describe('getSchemaFileUrl()', () => {

    const MOCK_FILE_TYPE = 'json';

    const functionInvocation = [
      EntityDataModelApi.getSchemaFileUrl, MOCK_FQN, MOCK_FILE_TYPE
    ];

    it('should return the correct URL', () => {

      expect(EntityDataModelApi.getSchemaFileUrl(MOCK_FQN, MOCK_FILE_TYPE)).toEqual(
        // eslint-disable-next-line
        `${EDM_API_BASE_URL}/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    it('should correctly set the fileType query param as lowercase', () => {

      expect(EntityDataModelApi.getSchemaFileUrl(MOCK_FQN, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        // eslint-disable-next-line
        `${EDM_API_BASE_URL}/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=${MOCK_FILE_TYPE}`
      );
    });

    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldReturnNullOnInvalidParameters(...functionInvocation);

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
      EntityDataModelApi.getAllSchemasInNamespace, MOCK_FQN.namespace
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllSchemasInNamespace(MOCK_FQN.namespace)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_FQN.namespace}`
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
      EntityDataModelApi.createSchema, MOCK_SCHEMA_DM
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createSchema(MOCK_SCHEMA_DM)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}`,
            MOCK_SCHEMA_DM
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
      EntityDataModelApi.createEmptySchema, MOCK_FQN
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEmptySchema(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`
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

    const MOCK_ACTION = 'ADD';

    const functionInvocation = [
      EntityDataModelApi.updateSchema, MOCK_FQN, MOCK_ACTION, [MOCK_ENTITY_TYPE_DM.id], [MOCK_PROPERTY_TYPE_DM.id]
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateSchema(MOCK_FQN, MOCK_ACTION, [MOCK_ENTITY_TYPE_DM.id], [MOCK_PROPERTY_TYPE_DM.id])
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${SCHEMA_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`,
            {
              action: MOCK_ACTION,
              entityTypes: [MOCK_ENTITY_TYPE_DM.id],
              propertyTypes: [MOCK_PROPERTY_TYPE_DM.id]
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
    // testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    // testApiFunctionShouldRejectOnGivenInvalidParameters(
    //   [
    //     INVALID_PARAMS,
    //     INVALID_PARAMS_ENUM_VALUES,
    //     INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED,
    //     INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
    //   ],
    //   ...functionInvocation
    // );

  });
}

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const functionInvocation = [
      EntityDataModelApi.getEntitySet, MOCK_ENTITY_SET_DM.id
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntitySet(MOCK_ENTITY_SET_DM.id)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.id}`,
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
      EntityDataModelApi.getEntitySetId, MOCK_ENTITY_SET_DM.name
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntitySetId(MOCK_ENTITY_SET_DM.name)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${IDS_PATH}/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.name}`,
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

  });
}

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    const functionInvocation = [
      EntityDataModelApi.createEntitySets, [MOCK_ENTITY_SET_DM]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEntitySets([MOCK_ENTITY_SET_DM])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}`,
            [MOCK_ENTITY_SET_DM]
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
      EntityDataModelApi.deleteEntitySet, MOCK_ENTITY_SET_DM.id
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntitySet(MOCK_ENTITY_SET_DM.id)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.id}`
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

function testUpdateEntitySetMetaData() {

  describe('updateEntitySetMetaData()', () => {

    const functionInvocation = [
      EntityDataModelApi.updateEntitySetMetaData, MOCK_ENTITY_SET_DM.id, MOCK_METADATA_UPDATE
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateEntitySetMetaData(MOCK_ENTITY_SET_DM.id, MOCK_METADATA_UPDATE)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${ENTITY_SET_PATH}/${MOCK_ENTITY_SET_DM.id}`,
            MOCK_METADATA_UPDATE
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
      EntityDataModelApi.getEntityType, MOCK_ENTITY_TYPE_DM.id
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityType(MOCK_ENTITY_TYPE_DM.id)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_DM.id}`
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
      EntityDataModelApi.getEntityTypeId, MOCK_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityTypeId(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${IDS_PATH}/${ENTITY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`,
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

  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    const functionInvocation = [
      EntityDataModelApi.createEntityType, MOCK_ENTITY_TYPE_DM
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEntityType(MOCK_ENTITY_TYPE_DM)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}`,
            MOCK_ENTITY_TYPE_DM
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
      EntityDataModelApi.deleteEntityType, MOCK_ENTITY_TYPE_DM.id
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntityType(MOCK_ENTITY_TYPE_DM.id)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_DM.id}`
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
      EntityDataModelApi.addPropertyTypeToEntityType, MOCK_ENTITY_TYPE_DM.id, MOCK_PROPERTY_TYPE_DM.id
    ];

    it('should send a PUT request with the correct URL path', (done) => {

      EntityDataModelApi.addPropertyTypeToEntityType(MOCK_ENTITY_TYPE_DM.id, MOCK_PROPERTY_TYPE_DM.id)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_DM.id}/${MOCK_PROPERTY_TYPE_DM.id}`
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
      EntityDataModelApi.removePropertyTypeFromEntityType, MOCK_ENTITY_TYPE_DM.id, MOCK_PROPERTY_TYPE_DM.id
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.removePropertyTypeFromEntityType(MOCK_ENTITY_TYPE_DM.id, MOCK_PROPERTY_TYPE_DM.id)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_DM.id}/${MOCK_PROPERTY_TYPE_DM.id}`
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

function testUpdateEntityTypeMetaData() {

  describe('updateEntityTypeMetaData()', () => {

    const functionInvocation = [
      EntityDataModelApi.updateEntityTypeMetaData, MOCK_ENTITY_TYPE_DM.id, MOCK_METADATA_UPDATE
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateEntityTypeMetaData(MOCK_ENTITY_TYPE_DM.id, MOCK_METADATA_UPDATE)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${ENTITY_TYPE_PATH}/${MOCK_ENTITY_TYPE_DM.id}`,
            MOCK_METADATA_UPDATE
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
      EntityDataModelApi.getPropertyType, MOCK_PROPERTY_TYPE_DM.id
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyType(MOCK_PROPERTY_TYPE_DM.id)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_DM.id}`
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
      EntityDataModelApi.getPropertyTypeId, MOCK_FQN
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyTypeId(MOCK_FQN)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`,
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

  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    const functionInvocation = [
      EntityDataModelApi.getAllPropertyTypesInNamespace, MOCK_FQN.namespace
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllPropertyTypesInNamespace(MOCK_FQN.namespace)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${NAMESPACE_PATH}/${MOCK_FQN.namespace}`
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
      EntityDataModelApi.createPropertyType, MOCK_PROPERTY_TYPE_DM
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createPropertyType(MOCK_PROPERTY_TYPE_DM)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}`,
            MOCK_PROPERTY_TYPE_DM
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
      EntityDataModelApi.deletePropertyType, MOCK_PROPERTY_TYPE_DM.id
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.deletePropertyType(MOCK_PROPERTY_TYPE_DM.id)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_DM.id}`
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

function testUpdatePropertyTypeMetaData() {

  describe('updatePropertyTypeMetaData()', () => {

    const functionInvocation = [
      EntityDataModelApi.updatePropertyTypeMetaData, MOCK_PROPERTY_TYPE_DM.id, MOCK_METADATA_UPDATE
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updatePropertyTypeMetaData(MOCK_PROPERTY_TYPE_DM.id, MOCK_METADATA_UPDATE)
        .then(() => {
          expect(mockAxiosInstance.patch).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
            `/${PROPERTY_TYPE_PATH}/${MOCK_PROPERTY_TYPE_DM.id}`,
            MOCK_METADATA_UPDATE
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
