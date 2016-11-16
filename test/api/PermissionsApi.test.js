import * as ApiPaths from '../../src/constants/ApiPaths';
import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as PermissionsApi from '../../src/api/PermissionsApi';

import {
  PERMISSIONS_API
} from '../../src/constants/ApiNames';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES = [{
  role: 'role',
  action: 'add',
  type: {
    namespace: 'LOOM',
    name: 'MyEntity'
  },
  permissions: ['read', 'write']
}];

let mockAxiosInstance = null;
let requestPromise = null;

function runCommonTests() {

  it('should invoke getApiAxiosInstance() with the correct API', () => {
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledTimes(1);
    expect(AxiosUtils.getApiAxiosInstance).toHaveBeenCalledWith(PERMISSIONS_API);
  });

  it('should return a Promise', () => {
    expect(requestPromise).toEqual(jasmine.any(Promise));
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
      requestPromise = PermissionsApi.updateAclsForEntityTypes(MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES);
    });

    afterEach(() => {
      requestPromise = null;
    });

    runCommonTests();

    it('should send a POST request with the correct URL path and data', () => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        `/${ApiPaths.ENTITY_TYPE_PATH}`,
        MOCK_UPDATE_ACLS_FOR_ENTITY_TYPES
      );
    });
  });
}

function testRemoveAclsForEntityTypes() {

}

function testUpdateAclsForEntitySets() {

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
