/* eslint-disable no-use-before-define */

import * as SearchApi from './SearchApi';

import * as AxiosUtils from '../utils/axios';
import { SEARCH_API } from '../constants/ApiNames';
import { ADVANCED_PATH, IDS_PATH, NEIGHBORS_PATH } from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_START = 10;
const MOCK_MAX_HITS = 100;
const MOCK_SEARCH_TERM = 'mockSearchTerm';

const MOCK_EKID_1 = '08e30000-0000-0000-8000-000000000004';
const MOCK_EKID_2 = '00480000-0000-0000-8000-000000000004';
const MOCK_ESID_1 = '899476b9-b390-48c2-a2b7-d17230e02d57';
const MOCK_ESID_2 = 'a3e81cb8-092b-4d6a-a7ff-7d850852f46b';
const MOCK_ETID = 'f5a1f24f-2d69-467f-8616-71f70b57377d';
const MOCK_PTID_1 = '64e869e9-95ec-467e-a374-5028e306242e';
const MOCK_PTID_2 = 'a112d04c-0574-42f7-82a2-331623767d10';

const MOCK_SEARCH_CONSTRAINTS = {
  entitySetIds: [MOCK_ESID_1, MOCK_ESID_2],
  maxHits: MOCK_MAX_HITS,
  start: MOCK_START,
};

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(SEARCH_API, () => {
  runTestSuite(
    SearchApi,
    SEARCH_API,
    {
      searchEntityNeighborsWithFilter: {
        '': {
          params: {
            optional: [false, false, true],
            valid: [MOCK_ESID_1, { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2] }, false]
          }
        },
        '(entitySetId, { entityKeyIds }, false)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2] },
            ],
            valid: [MOCK_ESID_1, { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2] }, false],
          },
        },
        '(entitySetId, { entityKeyIds }, true)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}/${IDS_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2] },
            ],
            valid: [MOCK_ESID_1, { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2] }, true],
          },
        },
        '(entitySetId, { entityKeyIds, destinationEntitySetIds }, false)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], dst: [MOCK_ESID_2] },
            ],
            valid: [
              MOCK_ESID_1,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], destinationEntitySetIds: [MOCK_ESID_2] },
              false,
            ],
          },
        },
        '(entitySetId, { entityKeyIds, destinationEntitySetIds }, true)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}/${IDS_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], dst: [MOCK_ESID_2] },
            ],
            valid: [
              MOCK_ESID_1,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], destinationEntitySetIds: [MOCK_ESID_2] },
              true,
            ],
          },
        },
        '(entitySetId, { entityKeyIds, sourceEntitySetIds }, false)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], src: [MOCK_ESID_2] },
            ],
            valid: [
              MOCK_ESID_1,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], sourceEntitySetIds: [MOCK_ESID_2] },
              false,
            ],
          },
        },
        '(entitySetId, { entityKeyIds, sourceEntitySetIds }, true)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}/${IDS_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], src: [MOCK_ESID_2] },
            ],
            valid: [
              MOCK_ESID_1,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], sourceEntitySetIds: [MOCK_ESID_2] },
              true,
            ],
          },
        },
        '(entitySetId, { entityKeyIds, edgeEntitySetIds }, false)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], edge: [MOCK_ESID_2] },
            ],
            valid: [
              MOCK_ESID_1,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], edgeEntitySetIds: [MOCK_ESID_2] },
              false,
            ],
          },
        },
        '(entitySetId, { entityKeyIds, edgeEntitySetIds }, true)': {
          method: 'post',
          params: {
            axios: [
              `/${MOCK_ESID_1}/${NEIGHBORS_PATH}/${ADVANCED_PATH}/${IDS_PATH}`,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], edge: [MOCK_ESID_2] },
            ],
            valid: [
              MOCK_ESID_1,
              { entityKeyIds: [MOCK_EKID_1, MOCK_EKID_2], edgeEntitySetIds: [MOCK_ESID_2] },
              true,
            ],
          },
        },
      },
      searchEntitySetData: {
        '': { params: { optional: [false], valid: [MOCK_SEARCH_CONSTRAINTS] } },
        '({ entitySetIds, maxHits, start })': {
          method: 'patch',
          params: {
            axios: ['/', MOCK_SEARCH_CONSTRAINTS],
            valid: [MOCK_SEARCH_CONSTRAINTS],
          },
        },
      },
      searchEntitySetMetaData: {
        '': {
          params: {
            optional: [false],
            valid: [{ maxHits: MOCK_MAX_HITS, searchTerm: MOCK_SEARCH_TERM, start: MOCK_START }]
          }
        },
        '({ searchTerm, maxHits, start })': {
          method: 'post',
          params: {
            axios: ['/', {
              excludePropertyTypes: true,
              kw: MOCK_SEARCH_TERM,
              maxHits: MOCK_MAX_HITS,
              start: MOCK_START,
            }],
            valid: [{
              maxHits: MOCK_MAX_HITS,
              searchTerm: MOCK_SEARCH_TERM,
              start: MOCK_START,
            }],
          },
        },
        '({ entityTypeId, searchTerm, maxHits, start })': {
          method: 'post',
          params: {
            axios: ['/', {
              entityTypeId: MOCK_ETID,
              excludePropertyTypes: true,
              kw: MOCK_SEARCH_TERM,
              maxHits: MOCK_MAX_HITS,
              start: MOCK_START,
            }],
            valid: [{
              entityTypeId: MOCK_ETID,
              maxHits: MOCK_MAX_HITS,
              searchTerm: MOCK_SEARCH_TERM,
              start: MOCK_START,
            }],
          },
        },
        '({ propertyTypeIds, searchTerm, maxHits, start })': {
          method: 'post',
          params: {
            axios: ['/', {
              kw: MOCK_SEARCH_TERM,
              maxHits: MOCK_MAX_HITS,
              pid: [MOCK_PTID_1, MOCK_PTID_2],
              start: MOCK_START,
            }],
            valid: [{
              maxHits: MOCK_MAX_HITS,
              propertyTypeIds: [MOCK_PTID_1, MOCK_PTID_2],
              searchTerm: MOCK_SEARCH_TERM,
              start: MOCK_START,
            }],
          },
        },
        '({ entityTypeId, maxHits, start })': {
          method: 'post',
          params: {
            axios: ['/', {
              entityTypeId: MOCK_ETID,
              excludePropertyTypes: true,
              maxHits: MOCK_MAX_HITS,
              start: MOCK_START,
            }],
            valid: [{
              entityTypeId: MOCK_ETID,
              maxHits: MOCK_MAX_HITS,
              start: MOCK_START,
            }],
          },
        },
        '({ propertyTypeIds, maxHits, start })': {
          method: 'post',
          params: {
            axios: ['/', {
              maxHits: MOCK_MAX_HITS,
              pid: [MOCK_PTID_1, MOCK_PTID_2],
              start: MOCK_START,
            }],
            valid: [{
              maxHits: MOCK_MAX_HITS,
              propertyTypeIds: [MOCK_PTID_1, MOCK_PTID_2],
              start: MOCK_START,
            }],
          },
        },
      },
    },
  );
});
