import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as EntityDataModelApi from '../../src/api/EntityDataModelApi';

import {
  EDM_API
} from '../../src/constants/ApiNames';

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
let requestPromise = null;

function runCommonTests() {

  it('should invoke getApiAxiosInstance() with the correct API', () => {
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(EDM_API);
  });

  it('should return a Promise', () => {
    expect(requestPromise).toEqual(jasmine.any(Promise));
  });
}

function testApiMethods() {

  it('should expose getEntityDataModel()', () => {
    expect(EntityDataModelApi.getEntityDataModel).toEqual(jasmine.any(Function));
  });

  it('should expose getSchema()', () => {
    expect(EntityDataModelApi.getSchema).toEqual(jasmine.any(Function));
  });

  it('should expose getAllSchemas()', () => {
    expect(EntityDataModelApi.getAllSchemas).toEqual(jasmine.any(Function));
  });

  it('should expose getAllSchemasInNamespace()', () => {
    expect(EntityDataModelApi.getAllSchemasInNamespace).toEqual(jasmine.any(Function));
  });

  it('should expose createSchema()', () => {
    expect(EntityDataModelApi.createSchema).toEqual(jasmine.any(Function));
  });

  it('should expose addEntityTypesToSchema()', () => {
    expect(EntityDataModelApi.addEntityTypesToSchema).toEqual(jasmine.any(Function));
  });

  it('should expose removeEntityTypesFromSchema()', () => {
    expect(EntityDataModelApi.removeEntityTypesFromSchema).toEqual(jasmine.any(Function));
  });

  it('should expose addPropertyTypesToSchema()', () => {
    expect(EntityDataModelApi.addPropertyTypesToSchema).toEqual(jasmine.any(Function));
  });

  it('should expose removePropertyTypesFromSchema()', () => {
    expect(EntityDataModelApi.removePropertyTypesFromSchema).toEqual(jasmine.any(Function));
  });

  it('should expose getAllEntitySets()', () => {
    expect(EntityDataModelApi.getAllEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose createEntitySets()', () => {
    expect(EntityDataModelApi.createEntitySets).toEqual(jasmine.any(Function));
  });

  it('should expose getEntityType()', () => {
    expect(EntityDataModelApi.getEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose getAllEntityTypes()', () => {
    expect(EntityDataModelApi.getAllEntityTypes).toEqual(jasmine.any(Function));
  });

  it('should expose createEntityType()', () => {
    expect(EntityDataModelApi.createEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose deleteEntityType()', () => {
    expect(EntityDataModelApi.deleteEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose addPropertyTypesToEntityType()', () => {
    expect(EntityDataModelApi.addPropertyTypesToEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose removePropertyTypesFromEntityType()', () => {
    expect(EntityDataModelApi.removePropertyTypesFromEntityType).toEqual(jasmine.any(Function));
  });

  it('should expose getPropertyType()', () => {
    expect(EntityDataModelApi.getPropertyType).toEqual(jasmine.any(Function));
  });

  it('should expose getAllPropertyTypes()', () => {
    expect(EntityDataModelApi.getAllPropertyTypes).toEqual(jasmine.any(Function));
  });

  it('should expose getAllPropertyTypesInNamespace()', () => {
    expect(EntityDataModelApi.getAllPropertyTypesInNamespace).toEqual(jasmine.any(Function));
  });

  it('should expose createPropertyType()', () => {
    expect(EntityDataModelApi.createPropertyType).toEqual(jasmine.any(Function));
  });

  it('should expose deletePropertyType()', () => {
    expect(EntityDataModelApi.deletePropertyType).toEqual(jasmine.any(Function));
  });
}

function testGetEntityDataModel() {

  describe('getEntityDataModel()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getEntityDataModel();
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/');
    });

  });
}

function testGetSchema() {

  describe('getSchema()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getSchema(MOCK_SCHEMA_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/schema/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`
      );
    });

  });
}

function testGetAllSchemas() {

  describe('getAllSchemas()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getAllSchemas();
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/schema');
    });

  });
}

function testGetAllSchemasInNamespace() {

  describe('getAllSchemasInNamespace()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getAllSchemasInNamespace(MOCK_SCHEMA_FQN.namespace);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/schema/${MOCK_SCHEMA_FQN.namespace}`);
    });

  });
}

function testCreateSchema() {

  describe('createSchema()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.createSchema(MOCK_SCHEMA_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a PUT request with the correct URL path and data', () => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/schema',
        MOCK_SCHEMA_FQN
      );
    });

  });
}

function testAddEntityTypesToSchema() {

  describe('addEntityTypesToSchema()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.addEntityTypesToSchema(MOCK_SCHEMA_FQN, [MOCK_ENTITY_TYPE_FQN]);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a PUT request with the correct URL path and data', () => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        `/schema/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`,
        [MOCK_ENTITY_TYPE_FQN]
      );
    });

  });
}

function testRemoveEntityTypesFromSchema() {

  describe('removeEntityTypesFromSchema()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.removeEntityTypesFromSchema(MOCK_SCHEMA_FQN, [MOCK_ENTITY_TYPE_FQN]);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a DELETE request with the correct URL path and data', () => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/schema/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}`,
        { data: [MOCK_ENTITY_TYPE_FQN] }
      );
    });

  });
}

function testAddPropertyTypesToSchema() {

  describe('addPropertyTypesToSchema()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.addPropertyTypesToSchema(MOCK_SCHEMA_FQN, [MOCK_PROPERTY_TYPE_FQN]);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a PUT request with the correct URL path and data', () => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        `/schema/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}/addPropertyTypes`,
        [MOCK_PROPERTY_TYPE_FQN]
      );
    });

  });
}

function testRemovePropertyTypesFromSchema() {

  describe('removePropertyTypesFromSchema()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.removePropertyTypesFromSchema(MOCK_SCHEMA_FQN, [MOCK_PROPERTY_TYPE_FQN]);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a DELETE request with the correct URL path and data', () => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/schema/${MOCK_SCHEMA_FQN.namespace}/${MOCK_SCHEMA_FQN.name}/deletePropertyTypes`,
        { data: [MOCK_PROPERTY_TYPE_FQN] }
      );
    });

  });
}

function testGetAllEntitySets() {

  describe('getAllEntitySets()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getAllEntitySets();
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/entity/set');
    });

  });
}

function testCreateEntitySets() {

  describe('createEntitySets()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.createEntitySets([MOCK_ENTITY_SET]);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a POST request with the correct URL path and data', () => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/entity/set',
        [MOCK_ENTITY_SET]
      );
    });

  });
}

function testGetEntityType() {

  describe('getEntityType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getEntityType(MOCK_ENTITY_TYPE_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/entity/type/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}`
      );
    });

  });
}

function testGetAllEntityTypes() {

  describe('getAllEntityTypes()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getAllEntityTypes();
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/entity/type');
    });

  });
}

function testCreateEntityType() {

  describe('createEntityType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.createEntityType(MOCK_ENTITY_TYPE);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a POST request with the correct URL path and data', () => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/entity/type',
        MOCK_ENTITY_TYPE
      );
    });

  });
}

function testDeleteEntityType() {

  describe('deleteEntityType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.deleteEntityType(MOCK_ENTITY_TYPE_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a DELETE request with the correct URL path', () => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/entity/type/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}`
      );
    });

  });
}

function testAddPropertyTypesToEntityType() {

  describe('addPropertyTypesToEntityType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.addPropertyTypesToEntityType(
        MOCK_ENTITY_TYPE_FQN,
        [MOCK_PROPERTY_TYPE_FQN]
      );
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a PUT request with the correct URL path and data', () => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        `/entity/type/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}/addPropertyTypes`,
        [MOCK_PROPERTY_TYPE_FQN]
      );
    });

  });
}

function testRemovePropertyTypesFromEntityType() {

  describe('removePropertyTypesFromEntityType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.removePropertyTypesFromEntityType(
        MOCK_ENTITY_TYPE_FQN,
        [MOCK_PROPERTY_TYPE_FQN]
      );
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a DELETE request with the correct URL path and data', () => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/entity/type/${MOCK_ENTITY_TYPE_FQN.namespace}/${MOCK_ENTITY_TYPE_FQN.name}/deletePropertyTypes`,
        { data: [MOCK_PROPERTY_TYPE_FQN] }
      );
    });

  });
}

function testGetPropertyType() {

  describe('getPropertyType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getPropertyType(MOCK_PROPERTY_TYPE_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/property/type/${MOCK_PROPERTY_TYPE_FQN.namespace}/${MOCK_PROPERTY_TYPE_FQN.name}`
      );
    });

  });
}

function testGetAllPropertyTypes() {

  describe('getAllPropertyTypes()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getAllPropertyTypes();
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/property/type');
    });

  });
}

function testGetAllPropertyTypesInNamespace() {

  describe('getAllPropertyTypesInNamespace()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.getAllPropertyTypesInNamespace(MOCK_PROPERTY_TYPE_FQN.namespace);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/property/type/${MOCK_PROPERTY_TYPE_FQN.namespace}`);
    });

  });
}

function testCreatePropertyType() {

  describe('createPropertyType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.createPropertyType(MOCK_PROPERTY_TYPE);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a POST request with the correct URL path and data', () => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/property/type',
        MOCK_PROPERTY_TYPE
      );
    });

  });
}

function testDeletePropertyType() {

  describe('deletePropertyType()', () => {

    beforeEach(() => {
      requestPromise = EntityDataModelApi.deletePropertyType(MOCK_PROPERTY_TYPE_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a DELETE request with the correct URL path and data', () => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/property/type/${MOCK_PROPERTY_TYPE_FQN.namespace}/${MOCK_PROPERTY_TYPE_FQN.name}`
      );
    });

  });
}

describe('EntityDataModelApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testApiMethods();
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
