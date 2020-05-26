import * as EntitySetsApi from './EntitySetsApi';

import * as AxiosUtils from '../utils/axios';
import { ENTITY_SETS_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  BY_ID_PATH,
  BY_NAME_PATH,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH,
} from '../constants/UrlConstants';
import { ENTITY_SET_MOCK } from '../models/EntitySet';
import { PROPERTY_TYPE_MOCK } from '../models/PropertyType';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(ENTITY_SETS_API, () => {
  runTestSuite(
    EntitySetsApi,
    ENTITY_SETS_API,
    {
      createEntitySets: {
        '': { params: { optional: [false], valid: [[ENTITY_SET_MOCK]] } },
        '(entitySets)': {
          method: 'post',
          params: {
            axios: ['/', [ENTITY_SET_MOCK]],
            valid: [[ENTITY_SET_MOCK]],
          },
        },
      },
      deleteEntitySet: {
        '': { params: { optional: [false], valid: [ENTITY_SET_MOCK.id] } },
        '(entitySetId)': {
          method: 'delete',
          params: {
            axios: [`/${ALL_PATH}/${ENTITY_SET_MOCK.id}`],
            valid: [ENTITY_SET_MOCK.id],
          },
        },
      },
      getAllEntitySets: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: ['/'],
            valid: [],
          },
        },
      },
      getEntitySet: {
        '': { params: { optional: [false], valid: [ENTITY_SET_MOCK.id] } },
        '(entitySetId)': {
          method: 'get',
          params: {
            axios: [`/${ALL_PATH}/${ENTITY_SET_MOCK.id}`],
            valid: [ENTITY_SET_MOCK.id],
          },
        },
      },
      getEntitySetId: {
        '': { params: { optional: [false], valid: [ENTITY_SET_MOCK.name] } },
        '(entitySetName)': {
          method: 'get',
          params: {
            axios: [`/${IDS_PATH}/${ENTITY_SET_MOCK.name}`],
            valid: [ENTITY_SET_MOCK.name],
          },
        },
      },
      getEntitySetIds: {
        '': { params: { optional: [false], valid: [[ENTITY_SET_MOCK.name]] } },
        '(entitySetNames)': {
          method: 'post',
          params: {
            axios: [`/${IDS_PATH}`, [ENTITY_SET_MOCK.name]],
            valid: [[ENTITY_SET_MOCK.name]],
          },
        },
      },
      getEntitySets: {
        '': { params: { optional: [false], valid: [[ENTITY_SET_MOCK.id]] } },
        '(entitySetIds)': {
          method: 'post',
          params: {
            axios: [`/${BY_ID_PATH}`, [ENTITY_SET_MOCK.id]],
            valid: [[ENTITY_SET_MOCK.id]],
          },
        },
        '(entitySetIds) - duplicates': {
          method: 'post',
          params: {
            axios: [`/${BY_ID_PATH}`, [ENTITY_SET_MOCK.id]],
            valid: [[ENTITY_SET_MOCK.id, ENTITY_SET_MOCK.id]],
          },
        },
        '(entitySetNames)': {
          method: 'post',
          params: {
            axios: [`/${BY_NAME_PATH}`, [ENTITY_SET_MOCK.name]],
            valid: [[ENTITY_SET_MOCK.name]],
          },
        },
        '(entitySetNames) - duplicates': {
          method: 'post',
          params: {
            axios: [`/${BY_NAME_PATH}`, [ENTITY_SET_MOCK.name]],
            valid: [[ENTITY_SET_MOCK.name, ENTITY_SET_MOCK.name]],
          },
        },
      },
      getPropertyTypeMetaDataForEntitySet: {
        '': { params: { optional: [false, true], valid: [ENTITY_SET_MOCK.id, PROPERTY_TYPE_MOCK.id] } },
        '(entitySetId, +propertyTypeId)': {
          method: 'get',
          params: {
            axios: [`/${ALL_PATH}/${ENTITY_SET_MOCK.id}/${PROPERTIES_PATH}/${PROPERTY_TYPE_MOCK.id}`],
            valid: [ENTITY_SET_MOCK.id, PROPERTY_TYPE_MOCK.id],
          },
        },
        '(entitySetId, -propertyTypeId)': {
          method: 'get',
          params: {
            axios: [`/${ALL_PATH}/${ENTITY_SET_MOCK.id}/${METADATA_PATH}`],
            valid: [ENTITY_SET_MOCK.id],
          },
        },
      },
      getPropertyTypeMetaDataForEntitySets: {
        '': { params: { optional: [false], valid: [[ENTITY_SET_MOCK.id]] } },
        '(entitySetIds)': {
          method: 'post',
          params: {
            axios: [`/${ALL_PATH}/${METADATA_PATH}`, [ENTITY_SET_MOCK.id]],
            valid: [[ENTITY_SET_MOCK.id]],
          },
        },
      },
    },
  );
});
