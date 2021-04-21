import * as DataApi from './DataApi';

import * as AxiosUtils from '../utils/axios';
import { DATA_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  ASSOCIATION_PATH,
  BINARY_PATH,
  BLOCK_PATH,
  COUNT_PATH,
  DETAILED_PATH,
  NEIGHBORS_PATH,
  SET_ID,
  SET_PATH,
  TYPE_PATH,
} from '../constants/UrlConstants';
import { DeleteTypes, UpdateTypes } from '../constants/types';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { DATA_GRAPH_MOCK } from '../utils/testing/MockData';
import { genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_ESID = '308ad50c-ccc7-4971-ae1b-d20f74175cad';
const MOCK_EKID_1 = '01af0000-0000-0000-8000-000000000004';
const MOCK_EKID_2 = '00230000-0000-0000-8000-000000000004';
const MOCK_PTID_1 = '6547de32-de64-4521-9c78-dfb6a930cb97';
const MOCK_S3_DIGEST = '4e5dde0393853f5974614ae430b85f9f';
const MOCK_CONTENT_DISPOSITION = 'attachment; filename="filename.jpg"';

const MOCK_DATA_EDGE = {
  [`${genRandomUUID()}`]: [{
    data: { [genRandomUUID()]: ['value_1', 'value_2'] },
    dst: { entitySetId: genRandomUUID(), entityKeyId: genRandomUUID() },
    src: { entitySetId: genRandomUUID(), entityKeyId: genRandomUUID() },
  }]
};

const MOCK_ENTITY_DATA = {
  [genRandomUUID()]: ['value_1', 'value_2'],
  [genRandomUUID()]: ['value_3', 'value_4'],
};

const MOCK_BINARY_OBJECT_REQUEST = {
  [genRandomUUID()]: {
    [genRandomUUID()]: {
      [genRandomUUID()]: {
        [MOCK_S3_DIGEST]: MOCK_CONTENT_DISPOSITION
      }
    }
  }
};

jest.mock('../utils/axios');
jest.mock('../config/Configuration');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(DATA_API, () => {

  runTestSuite(
    DataApi,
    DATA_API,
    {
      createAssociations: {
        '': { params: { optional: [false], valid: [MOCK_DATA_EDGE] } },
        '(associations)': {
          method: 'post',
          params: {
            axios: [`/${ASSOCIATION_PATH}`, MOCK_DATA_EDGE],
            valid: [MOCK_DATA_EDGE],
          },
        },
      },
      createEntityAndAssociationData: {
        '': { params: { optional: [false], valid: [DATA_GRAPH_MOCK] } },
        '(dataGraph)': {
          method: 'post',
          params: {
            axios: ['/', DATA_GRAPH_MOCK],
            valid: [DATA_GRAPH_MOCK],
          },
        },
      },
      createOrMergeEntityData: {
        '': { params: { optional: [false, false], valid: [MOCK_ESID, [MOCK_ENTITY_DATA]] } },
        '(entitySetId, entityData)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/?${SET_ID}=${MOCK_ESID}`, [MOCK_ENTITY_DATA]],
            valid: [MOCK_ESID, [MOCK_ENTITY_DATA]],
          },
        },
      },
      deleteEntityAndNeighborData: {
        '': {
          params: {
            optional: [false, false, true],
            valid: [MOCK_ESID, { entityKeyIds: [MOCK_EKID_1] }, DeleteTypes.SOFT],
          },
        },
        '(entitySetId, filter, DeleteType=SOFT)': {
          method: 'post',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}/${NEIGHBORS_PATH}?${TYPE_PATH}=${DeleteTypes.SOFT}`,
              { entityKeyIds: [MOCK_EKID_1] },
            ],
            valid: [MOCK_ESID, { entityKeyIds: [MOCK_EKID_1] }, DeleteTypes.SOFT],
          },
        },
        '(entitySetId, filter, DeleteType=HARD)': {
          method: 'post',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}/${NEIGHBORS_PATH}?${TYPE_PATH}=${DeleteTypes.HARD}`,
              { entityKeyIds: [MOCK_EKID_1] },
            ],
            valid: [MOCK_ESID, { entityKeyIds: [MOCK_EKID_1] }, DeleteTypes.HARD],
          },
        },
      },
      deleteEntityData: {
        '': {
          params: {
            optional: [false, false, true, true],
            valid: [MOCK_ESID, MOCK_EKID_1, DeleteTypes.SOFT, true]
          }
        },
        '(entitySetId, entityKeyId, DeleteType=SOFT)': {
          method: 'delete',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${DeleteTypes.SOFT}&${BLOCK_PATH}=${true}`,
              { data: [MOCK_EKID_1] }
            ],
            valid: [MOCK_ESID, MOCK_EKID_1, DeleteTypes.SOFT, true],
          },
        },
        '(entitySetId, entityKeyId, DeleteType=HARD)': {
          method: 'delete',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${DeleteTypes.HARD}&${BLOCK_PATH}=${true}`,
              { data: [MOCK_EKID_1] }
            ],
            valid: [MOCK_ESID, MOCK_EKID_1, DeleteTypes.HARD, true],
          },
        },
        '(entitySetId, entityKeyIds, DeleteType=SOFT)': {
          method: 'delete',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${DeleteTypes.SOFT}&${BLOCK_PATH}=${true}`,
              { data: [MOCK_EKID_1, MOCK_EKID_2] }
            ],
            valid: [MOCK_ESID, [MOCK_EKID_1, MOCK_EKID_2], DeleteTypes.SOFT, true],
          },
        },
        '(entitySetId, entityKeyIds, DeleteType=HARD)': {
          method: 'delete',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${DeleteTypes.HARD}&${BLOCK_PATH}=${true}`,
              { data: [MOCK_EKID_1, MOCK_EKID_2] }
            ],
            valid: [MOCK_ESID, [MOCK_EKID_1, MOCK_EKID_2], DeleteTypes.HARD, true],
          },
        },
        '(entitySetId, entityKeyId, DeleteType=SOFT, false)': {
          method: 'delete',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${DeleteTypes.SOFT}&${BLOCK_PATH}=${false}`,
              { data: [MOCK_EKID_1, MOCK_EKID_2] }
            ],
            valid: [MOCK_ESID, [MOCK_EKID_1, MOCK_EKID_2], DeleteTypes.SOFT, false],
          },
        },
        '(entitySetId, entityKeyId, DeleteType=HARD, false)': {
          method: 'delete',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${DeleteTypes.HARD}&${BLOCK_PATH}=${false}`,
              { data: [MOCK_EKID_1, MOCK_EKID_2] }
            ],
            valid: [MOCK_ESID, [MOCK_EKID_1, MOCK_EKID_2], DeleteTypes.HARD, false],
          },
        },
      },
      deleteEntitySetData: {
        '': { params: { optional: [false, true], valid: [MOCK_ESID, DeleteTypes.SOFT] } },
        '(entitySetId, DeleteType=SOFT)': {
          method: 'delete',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}/${ALL_PATH}?${TYPE_PATH}=${DeleteTypes.SOFT}`],
            valid: [MOCK_ESID, DeleteTypes.SOFT],
          },
        },
        '(entitySetId, DeleteType=HARD)': {
          method: 'delete',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}/${ALL_PATH}?${TYPE_PATH}=${DeleteTypes.HARD}`],
            valid: [MOCK_ESID, DeleteTypes.HARD],
          },
        },
      },
      getBinaryProperties: {
        '': { params: { optional: [false], valid: [MOCK_BINARY_OBJECT_REQUEST] } },
        '(binaryObjectRequest)': {
          method: 'post',
          params: {
            axios: [`/${BINARY_PATH}`, MOCK_BINARY_OBJECT_REQUEST],
            valid: [MOCK_BINARY_OBJECT_REQUEST],
          },
        },
      },
      getEntityData: {
        '': { params: { optional: [false, false], valid: [MOCK_ESID, MOCK_EKID_1] } },
        '(entitySetId, entityKeyId)': {
          method: 'get',
          params: {
            axios: [`/${MOCK_ESID}/${MOCK_EKID_1}`],
            valid: [MOCK_ESID, MOCK_EKID_1],
          },
        },
      },
      getEntitySetData: {
        '': { params: { optional: [false, true, true], valid: [MOCK_ESID, [MOCK_PTID_1], [MOCK_EKID_1]] } },
        '(entitySetId, +propertyTypeIds, +entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}`, { ids: [MOCK_EKID_1], properties: [MOCK_PTID_1] }],
            valid: [MOCK_ESID, [MOCK_PTID_1], [MOCK_EKID_1]],
          },
        },
        '(entitySetId, -propertyTypeIds, +entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}`, { ids: [MOCK_EKID_1] }],
            valid: [MOCK_ESID, undefined, [MOCK_EKID_1]],
          }
        },
        '(entitySetId, +propertyTypeIds, -entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}`, { properties: [MOCK_PTID_1] }],
            valid: [MOCK_ESID, [MOCK_PTID_1], undefined],
          },
        },
        '(entitySetId, -propertyTypeIds, -entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}`, {}],
            valid: [MOCK_ESID, undefined, undefined],
          },
        },
      },
      getEntitySetSize: {
        '': { params: { optional: [false], valid: [MOCK_ESID] } },
        '(entitySetId)': {
          method: 'get',
          params: {
            axios: [`/${MOCK_ESID}/${COUNT_PATH}`],
            valid: [MOCK_ESID],
          },
        },
      },
      getLinkedEntitySetBreakdown: {
        '': { params: { optional: [false, true, true], valid: [MOCK_ESID, [MOCK_PTID_1], [MOCK_EKID_1]] } },
        '(entitySetId, +propertyTypeIds, +entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}/${DETAILED_PATH}`, { ids: [MOCK_EKID_1], properties: [MOCK_PTID_1] }],
            valid: [MOCK_ESID, [MOCK_PTID_1], [MOCK_EKID_1]],
          },
        },
        '(entitySetId, -propertyTypeIds, +entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}/${DETAILED_PATH}`, { ids: [MOCK_EKID_1] }],
            valid: [MOCK_ESID, undefined, [MOCK_EKID_1]],
          }
        },
        '(entitySetId, +propertyTypeIds, -entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}/${DETAILED_PATH}`, { properties: [MOCK_PTID_1] }],
            valid: [MOCK_ESID, [MOCK_PTID_1], undefined],
          },
        },
        '(entitySetId, -propertyTypeIds, -entityKeyIds)': {
          method: 'post',
          params: {
            axios: [`/${SET_PATH}/${MOCK_ESID}/${DETAILED_PATH}`, {}],
            valid: [MOCK_ESID, undefined, undefined],
          },
        },
      },
      updateEntityData: {
        '': {
          params: {
            optional: [false, false, true],
            valid: [MOCK_ESID, { [MOCK_EKID_1]: MOCK_ENTITY_DATA }, UpdateTypes.PARTIAL_REPLACE],
          },
        },
        '(entitySetId, entityData, UpdateType=MERGE)': {
          method: 'put',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${UpdateTypes.MERGE}`,
              { [MOCK_EKID_1]: MOCK_ENTITY_DATA }
            ],
            valid: [MOCK_ESID, { [MOCK_EKID_1]: MOCK_ENTITY_DATA }, UpdateTypes.MERGE],
          },
        },
        '(entitySetId, entityData, UpdateType=PARTIAL_REPLACE)': {
          method: 'put',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${UpdateTypes.PARTIAL_REPLACE}`,
              { [MOCK_EKID_1]: MOCK_ENTITY_DATA }
            ],
            valid: [MOCK_ESID, { [MOCK_EKID_1]: MOCK_ENTITY_DATA }, UpdateTypes.PARTIAL_REPLACE],
          },
        },
        '(entitySetId, entityData, UpdateType=REPLACE)': {
          method: 'put',
          params: {
            axios: [
              `/${SET_PATH}/${MOCK_ESID}?${TYPE_PATH}=${UpdateTypes.REPLACE}`,
              { [MOCK_EKID_1]: MOCK_ENTITY_DATA }
            ],
            valid: [MOCK_ESID, { [MOCK_EKID_1]: MOCK_ENTITY_DATA }, UpdateTypes.REPLACE],
          },
        },
      },
    },
  );

});
