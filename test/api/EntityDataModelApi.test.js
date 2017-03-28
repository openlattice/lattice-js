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
  INVALID_PARAMS,
  INVALID_SS_PARAMS,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
} from '../constants/InvalidParams';

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

    const functionToTest :Function = EntityDataModelApi.getEntityDataModel;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetSchema() {

  describe('getSchema()', () => {

    const functionToTest :Function = EntityDataModelApi.getSchema;

    const validParams :any[] = [
      MOCK_FQN
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getSchema(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetSchemaFileUrl() {

  describe('getSchemaFileUrl()', () => {

    const MOCK_FILE_TYPE = 'json';

    const functionToTest :Function = EntityDataModelApi.getSchemaFileUrl;

    const validParams :any[] = [
      MOCK_FQN,
      MOCK_FILE_TYPE
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
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

    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldReturnNullOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllSchemas() {

  describe('getAllSchemas()', () => {

    const functionToTest :Function = EntityDataModelApi.getAllSchemas;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllSchemasInNamespace() {

  describe('getAllSchemasInNamespace()', () => {

    const functionToTest :Function = EntityDataModelApi.getAllSchemasInNamespace;

    const validParams :any[] = [
      MOCK_FQN.namespace
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllSchemasInNamespace(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateSchema() {

  describe('createSchema()', () => {

    const functionToTest :Function = EntityDataModelApi.createSchema;

    const validParams :any[] = [
      MOCK_SCHEMA_DM
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createSchema(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateEmptySchema() {

  describe('createEmptySchema()', () => {

    const functionToTest :Function = EntityDataModelApi.createEmptySchema;

    const validParams :any[] = [
      MOCK_FQN
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEmptySchema(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateSchema() {

  describe('updateSchema()', () => {

    const MOCK_ACTION = 'ADD';

    const functionToTest :Function = EntityDataModelApi.updateSchema;

    const validParams :any[] = [
      MOCK_FQN,
      MOCK_ACTION,
      [MOCK_ENTITY_TYPE_DM.id],
      [MOCK_PROPERTY_TYPE_DM.id]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED,
      INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateSchema(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetEntitySet() {

  describe('getEntitySet()', () => {

    const functionToTest :Function = EntityDataModelApi.getEntitySet;

    const validParams :any[] = [
      MOCK_ENTITY_SET_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntitySet(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetEntitySetId() {

  describe('getEntitySetId()', () => {

    const functionToTest :Function = EntityDataModelApi.getEntitySetId;

    const validParams :any[] = [
      MOCK_ENTITY_SET_DM.name
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntitySetId(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllEntitySets() {

  describe('getAllEntitySets()', () => {

    const functionToTest :Function = EntityDataModelApi.getAllEntitySets;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    const functionToTest :Function = EntityDataModelApi.createEntitySets;

    const validParams :any[] = [
      [MOCK_ENTITY_SET_DM]
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEntitySets(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testDeleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const functionToTest :Function = EntityDataModelApi.deleteEntitySet;

    const validParams :any[] = [
      MOCK_ENTITY_SET_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntitySet(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateEntitySetMetaData() {

  describe('updateEntitySetMetaData()', () => {

    const functionToTest :Function = EntityDataModelApi.updateEntitySetMetaData;

    const validParams :any[] = [
      MOCK_ENTITY_SET_DM.id,
      MOCK_METADATA_UPDATE
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateEntitySetMetaData(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetEntityType() {

  describe('getEntityType()', () => {

    const functionToTest :Function = EntityDataModelApi.getEntityType;

    const validParams :any[] = [
      MOCK_ENTITY_TYPE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetEntityTypeId() {

  describe('getEntityTypeId()', () => {

    const functionToTest :Function = EntityDataModelApi.getEntityTypeId;

    const validParams :any[] = [
      MOCK_FQN
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getEntityTypeId(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllEntityTypes() {

  describe('getAllEntityTypes()', () => {

    const functionToTest :Function = EntityDataModelApi.getAllEntityTypes;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    const functionToTest :Function = EntityDataModelApi.createEntityType;

    const validParams :any[] = [
      MOCK_ENTITY_TYPE_DM
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createEntityType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testDeleteEntityType() {

  describe('deleteEntityType()', () => {

    const functionToTest :Function = EntityDataModelApi.deleteEntityType;

    const validParams :any[] = [
      MOCK_ENTITY_TYPE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.deleteEntityType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAddPropertyTypeToEntityType() {

  describe('addPropertyTypeToEntityType()', () => {

    const functionToTest :Function = EntityDataModelApi.addPropertyTypeToEntityType;

    const validParams :any[] = [
      MOCK_ENTITY_TYPE_DM.id,
      MOCK_PROPERTY_TYPE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS
    ];

    it('should send a PUT request with the correct URL path', (done) => {

      EntityDataModelApi.addPropertyTypeToEntityType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testRemovePropertyTypeFromEntityType() {

  describe('removePropertyTypeFromEntityType()', () => {

    const functionToTest :Function = EntityDataModelApi.removePropertyTypeFromEntityType;

    const validParams :any[] = [
      MOCK_ENTITY_TYPE_DM.id,
      MOCK_PROPERTY_TYPE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      EntityDataModelApi.removePropertyTypeFromEntityType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateEntityTypeMetaData() {

  describe('updateEntityTypeMetaData()', () => {

    const functionToTest :Function = EntityDataModelApi.updateEntityTypeMetaData;

    const validParams :any[] = [
      MOCK_ENTITY_TYPE_DM.id,
      MOCK_METADATA_UPDATE
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updateEntityTypeMetaData(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetPropertyType() {

  describe('getPropertyType()', () => {

    const functionToTest :Function = EntityDataModelApi.getPropertyType;

    const validParams :any[] = [
      MOCK_PROPERTY_TYPE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetPropertyTypeId() {

  describe('getPropertyTypeId()', () => {

    const functionToTest :Function = EntityDataModelApi.getPropertyTypeId;

    const validParams :any[] = [
      MOCK_FQN
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getPropertyTypeId(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllPropertyTypes() {

  describe('getAllPropertyTypes()', () => {

    const functionToTest :Function = EntityDataModelApi.getAllPropertyTypes;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    const functionToTest :Function = EntityDataModelApi.getAllPropertyTypesInNamespace;

    const validParams :any[] = [
      MOCK_FQN.namespace
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      EntityDataModelApi.getAllPropertyTypesInNamespace(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreatePropertyType() {

  describe('createPropertyType()', () => {

    const functionToTest :Function = EntityDataModelApi.createPropertyType;

    const validParams :any[] = [
      MOCK_PROPERTY_TYPE_DM
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      EntityDataModelApi.createPropertyType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testDeletePropertyType() {

  describe('deletePropertyType()', () => {

    const functionToTest :Function = EntityDataModelApi.deletePropertyType;

    const validParams :any[] = [
      MOCK_PROPERTY_TYPE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      EntityDataModelApi.deletePropertyType(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdatePropertyTypeMetaData() {

  describe('updatePropertyTypeMetaData()', () => {

    const functionToTest :Function = EntityDataModelApi.updatePropertyTypeMetaData;

    const validParams :any[] = [
      MOCK_PROPERTY_TYPE_DM.id,
      MOCK_METADATA_UPDATE
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PATCH request with the correct URL path and data', (done) => {

      EntityDataModelApi.updatePropertyTypeMetaData(...validParams)
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

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, EDM_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
