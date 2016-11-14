import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as DataApi from '../../src/api/DataApi';

import {
  DATA_API
} from '../../src/constants/ApiNames';

const DATA_API_BASE_URL = 'http://localhost:8080/ontology/data';

const MOCK_FQN = {
  namespace: 'LOOM',
  name: 'DATA_API'
};

const MOCK_ENTITY_SET_NAME = 'LoomDataApis';

const MOCK_CREATE_ENTITY_DATA = {
  type: MOCK_FQN,
  entitySetName: MOCK_ENTITY_SET_NAME,
  properties: [
    { 'LOOM.MY_PROPERTY': 'testing' }
  ]
};

const MOCK_PROMISE = new Promise((resolve) => {
  resolve({ data: {} });
});

let mockAxiosInstance = null;
let requestPromise = null;

function runCommonTests() {

  it('should invoke getApiAxiosInstance() with the correct API', () => {
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(DATA_API);
  });

  it('should return a Promise', () => {
    expect(requestPromise).toEqual(jasmine.any(Promise));
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
      requestPromise = DataApi.getAllEntitiesOfType(MOCK_FQN);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/entitydata/${MOCK_FQN.namespace}/${MOCK_FQN.name}`
      );
    });

  });
}

function testGetAllEntitiesOfTypeFileUrl() {

  describe('getAllEntitiesOfTypeFileUrl()', () => {

    it('should return the correct URL', () => {
      expect(DataApi.getAllEntitiesOfTypeFileUrl(MOCK_FQN, 'json')).toEqual(
        `${DATA_API_BASE_URL}/entitydata/${MOCK_FQN.namespace}/${MOCK_FQN.name}?fileType=json`
      );
    });

  });
}

function testGetAllEntitiesOfTypeInSet() {

  describe('getAllEntitiesOfTypeInSet()', () => {

    beforeEach(() => {
      requestPromise = DataApi.getAllEntitiesOfTypeInSet(MOCK_FQN, MOCK_ENTITY_SET_NAME);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a GET request with the correct URL path', () => {
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/entitydata/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ENTITY_SET_NAME}`
      );
    });

  });
}

function testGetAllEntitiesOfTypeInSetFileUrl() {

  describe('getAllEntitiesOfTypeInSetFileUrl()', () => {

    it('should return the correct URL', () => {

      const url = DataApi.getAllEntitiesOfTypeInSetFileUrl(MOCK_FQN, MOCK_ENTITY_SET_NAME, 'json');
      expect(url).toEqual(
        `${DATA_API_BASE_URL}/entitydata/${MOCK_FQN.namespace}/${MOCK_FQN.name}/${MOCK_ENTITY_SET_NAME}?fileType=json`
      );
    });

  });
}

function testGetAllEntitiesOfTypes() {

  describe('getAllEntitiesOfTypes()', () => {

    beforeEach(() => {
      requestPromise = DataApi.getAllEntitiesOfTypes([MOCK_FQN]);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();


    it('should send a PUT request with the correct URL path and data', () => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/entitydata/multiple',
        [MOCK_FQN]
      );
    });

  });
}

function testCreateEntity() {

  describe('createEntity()', () => {

    beforeEach(() => {
      requestPromise = DataApi.createEntity(MOCK_CREATE_ENTITY_DATA);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a POST request with the correct URL path and data', () => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/entitydata',
        MOCK_CREATE_ENTITY_DATA
      );
    });

  });
}

describe('DataApi', () => {

  beforeEach(() => {

    mockAxiosInstance = jasmine.createSpyObj('mockAxiosInstance', ['get', 'post', 'put', 'patch', 'delete']);
    mockAxiosInstance.get.and.returnValue(MOCK_PROMISE);
    mockAxiosInstance.post.and.returnValue(MOCK_PROMISE);
    mockAxiosInstance.put.and.returnValue(MOCK_PROMISE);
    mockAxiosInstance.delete.and.returnValue(MOCK_PROMISE);

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
