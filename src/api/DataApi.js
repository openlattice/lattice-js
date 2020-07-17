/*
 * @flow
 */

/**
 * DataApi gives access to OpenLattice's REST API for reading, writing data against an existing EntityDataModel schema.
 *
 * @module DataApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.DataApi.get...
 *
 * @example
 * import { DataApi } from 'lattice';
 * // DataApi.get...
 */

import isUndefined from 'lodash/isUndefined';
import { Set } from 'immutable';

import Logger from '../utils/Logger';
import { DATA_API } from '../constants/ApiNames';
import {
  DESTINATION,
  DESTINATION_ES_IDS,
  ENTITY_KEY_IDS,
  SOURCE,
  SOURCE_ES_IDS,
} from '../constants/SerializationConstants';
import {
  ALL_PATH,
  ASSOCIATION_PATH,
  COUNT_PATH,
  DETAILED_PATH,
  NEIGHBORS_PATH,
  SET_ID,
  SET_PATH,
  TYPE_PATH,
} from '../constants/UrlConstants';
import { DeleteTypes, UpdateTypes } from '../constants/types';
import { DataGraph, isValidDataGraph } from '../models/DataGraph';
import {
  isDefined,
  isEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
} from '../utils/LangUtils';
import {
  isValidMultimap,
  isValidMultimapArray,
  isValidUUID,
  isValidUUIDArray,
} from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { DeleteType, UpdateType } from '../constants/types';
import type { UUID } from '../types';

const LOG = new Logger('DataApi');

/**
 * `POST /data/association`
 *
 * Creates associations (edges) from the given data.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {Object} associations
 * @returns {Promise<number>} - a Promise that resolves with the count of associations (edges) that were created
 *
 * @example
 * DataApi.createAssociations({
 *   "a680a1d8-73fb-423c-abd2-fd71965693d2": [{
 *     "data": {
 *       "6a74d45c-9451-4f88-b8c8-a0e27c08b2a2": ["value_1", "value_2"],
 *     },
 *     "dst": {
 *       "entitySetId": "69682f1e-6039-44da-8342-522395b43738",
 *       "entityKeyId": "cf72e97f-109c-46a1-bb89-93a8753fd7ac"
 *     },
 *     "src": {
 *       "entitySetId": "5e4a579a-ad72-4902-991c-027d80dcd590",
 *       "entityKeyId": "d66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea"
 *     },
 *   }]
 * });
 */
function createAssociations(associations :Object) :Promise<number> {

  let errorMsg = '';

  // TODO: DataEdge model, ListMultiMap validation

  if (!isNonEmptyObject(associations)) {
    errorMsg = 'invalid parameter: "associations" must be a non-empty object';
    LOG.error(errorMsg, associations);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${ASSOCIATION_PATH}`, associations)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data`
 *
 * Creates entities for the given entity and association data, and returns the corresponding entity UUIDs.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {DataGraph} data
 * @returns {Promise<Object>} - a Promise that resolves with the ids of the entities and associations that were created
 *
 * @example
 * DataApi.createEntityAndAssociationData({
 *   associations: {
 *     'a680a1d8-73fb-423c-abd2-fd71965693d2': [{
 *       dstEntityIndex: 2,
 *       dstEntityKeyId: 'cf72e97f-109c-46a1-bb89-93a8753fd7ac',
 *       dstEntitySetId: '69682f1e-6039-44da-8342-522395b43738',
 *       srcEntityIndex: 4,
 *       srcEntityKeyId: '5e4a579a-ad72-4902-991c-027d80dcd590',
 *       srcEntitySetId: 'd66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea',
 *     }]
 *   },
 *   entities: {
 *     'c92f4318-9f93-4f88-94c1-0ca5b3b278ab': [{
 *       '6a74d45c-9451-4f88-b8c8-a0e27c08b2a2': ['value_1', 'value_2'],
 *     }]
 *   },
 * });
 */
function createEntityAndAssociationData(data :DataGraph) :Promise<Object> {

  let errorMsg = '';

  if (!isValidDataGraph(data)) {
    errorMsg = 'invalid parameter: "data" must be a valid DataGraph';
    LOG.error(errorMsg, data);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post('/', data)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/set/?setId={entitySetId}`
 *
 * Creates or updates entities for the given entity data, and returns the corresponding entity ids.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {Object} entities
 * @returns {Promise<UUID[]>} - a Promise that resolves with a list of ids
 *
 * @example
 * DataApi.createOrMergeEntityData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [{
 *     "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e": ["value_1", "value_2"],
 *     "fae6af98-2675-45bd-9a5b-1619a87235a8": ["value_3", "value_4"]
 *   }]
 * );
 */
function createOrMergeEntityData(entitySetId :UUID, entities :Object[]) :Promise<UUID[]> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate SetMultimap
  if (!isValidMultimapArray(entities, isValidUUID)) {
    errorMsg = 'invalid parameter: entities must be a non-empty multimap array';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/?${SET_ID}=${entitySetId}`, entities)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/set/{entitySetId}/neighbors?type=Hard`
 *
 * Deletes the entity data for the given entityKeyIds, and all neighbor entity data matching the given filter.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {Object} filter
 * @param {DeleteType} deleteType
 * @returns {Promise<number>} - a Promise that resolves with the count of entities that were deleted
 *
 * @example
 * DataApi.deleteEntityAndNeighborData(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "entityKeyIds": ["3bf2a30d-fda0-4389-a1e6-8546b230efad", "ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *     "destinationEntitySetIds": ["11442cb3-99dc-4842-8736-6c76e6fcc7c4"],
 *     "sourceEntitySetIds": ["6317fab5-905d-42f4-8d67-2b78b3c56c77"],
 *   },
 *   "Hard"
 * );
 */
function deleteEntityAndNeighborData(
  entitySetId :UUID,
  filter :Object,
  deleteType ?:DeleteType = DeleteTypes.SOFT,
) :Promise<number> {

  // TODO: EntityFilter model

  let errorMsg = '';
  const data :Object = {};

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(filter)) {
    errorMsg = 'invalid parameter: filter must be a non-empty object';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUIDArray(filter[ENTITY_KEY_IDS])) {
    errorMsg = `invalid parameter: filter.${ENTITY_KEY_IDS} must be a non-empty set of valid UUIDs`;
    LOG.error(errorMsg, filter[ENTITY_KEY_IDS]);
    return Promise.reject(errorMsg);
  }

  const entityKeyIds :UUID[] = Set().withMutations((set :Set<UUID>) => (
    filter[ENTITY_KEY_IDS].forEach((id :UUID) => set.add(id))
  )).toJS();
  data[ENTITY_KEY_IDS] = entityKeyIds;

  let destinationEntitySetIds :?UUID[];
  if (isEmptyArray(filter[DESTINATION_ES_IDS]) || isValidUUIDArray(filter[DESTINATION_ES_IDS])) {
    destinationEntitySetIds = Set().withMutations((set :Set<UUID>) => (
      filter[DESTINATION_ES_IDS].forEach((id :UUID) => set.add(id))
    )).toJS();
    data[DESTINATION] = destinationEntitySetIds;
  }
  else if (isDefined(filter[DESTINATION_ES_IDS])) {
    errorMsg = `invalid parameter: filter.${DESTINATION_ES_IDS} must be a set of valid UUIDs`;
    LOG.error(errorMsg, filter[DESTINATION_ES_IDS]);
    return Promise.reject(errorMsg);
  }

  let sourceEntitySetIds :?UUID[];
  if (isEmptyArray(filter[SOURCE_ES_IDS]) || isValidUUIDArray(filter[SOURCE_ES_IDS])) {
    sourceEntitySetIds = Set().withMutations((set :Set<UUID>) => (
      filter[SOURCE_ES_IDS].forEach((id :UUID) => set.add(id))
    )).toJS();
    data[SOURCE] = sourceEntitySetIds;
  }
  else if (isDefined(filter[SOURCE_ES_IDS])) {
    errorMsg = `invalid parameter: filter.${SOURCE_ES_IDS} must be a set of valid UUIDs`;
    LOG.error(errorMsg, filter[SOURCE_ES_IDS]);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(deleteType) || !DeleteTypes[deleteType]) {
    errorMsg = 'invalid parameter: deleteType must be a valid DeleteType';
    LOG.error(errorMsg, deleteType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/${entitySetId}/${NEIGHBORS_PATH}?${TYPE_PATH}=${deleteType}`, data)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /data/set/{entitySetId}?type=Soft`
 *
 * Deletes entities with the given entityKeyIds from the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID || UUID[]} entityKeyIds
 * @param {DeleteType} deleteType
 * @returns {Promise<number>} - a Promise that resolves with the count of entities that were deleted
 *
 * @example
 * DataApi.deleteEntityData(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "01af0000-0000-0000-8000-000000000004",
 *   "Soft"
 * );
 *
 * @example
 * DataApi.deleteEntityData(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   ["01af0000-0000-0000-8000-000000000004", "00230000-0000-0000-8000-000000000004"],
 *   "Soft"
 * );
 */
function deleteEntityData(
  entitySetId :UUID,
  entityKeyIds :UUID | UUID[],
  deleteType ?:DeleteType = DeleteTypes.SOFT,
) :Promise<number> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  // $FlowFixMe
  if (!isValidUUID(entityKeyIds) && !isValidUUIDArray(entityKeyIds)) {
    errorMsg = 'invalid parameter: entityKeyIds must be a valid UUID or array of UUIDs';
    LOG.error(errorMsg, entityKeyIds);
    return Promise.reject(errorMsg);
  }

  if (!DeleteTypes[deleteType]) {
    errorMsg = 'invalid parameter: deleteType must be a valid DeleteType';
    LOG.error(errorMsg, deleteType);
    return Promise.reject(errorMsg);
  }

  let data = entityKeyIds;
  if (typeof entityKeyIds === 'string') {
    data = [entityKeyIds];
  }

  return getApiAxiosInstance(DATA_API)
    .delete(`/${SET_PATH}/${entitySetId}?${TYPE_PATH}=${deleteType}`, { data })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /data/set/{entitySetId}/all?type=Soft`
 *
 * Deletes all data from the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {DeleteType} deleteType
 * @returns {Promise<number>} - a Promise that resolves with the count of entities that were deleted
 *
 * @example
 * DataApi.deleteEntitySetData("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e", "Soft");
 */
function deleteEntitySetData(entitySetId :UUID, deleteType ?:DeleteType = DeleteTypes.SOFT) :Promise<number> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: "entitySetId" must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!DeleteTypes[deleteType]) {
    errorMsg = 'invalid parameter: "deleteType" must be a valid DeleteType';
    LOG.error(errorMsg, deleteType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .delete(`/${SET_PATH}/${entitySetId}/${ALL_PATH}?${TYPE_PATH}=${deleteType}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /data/{entitySetId}/{entityKeyId}`
 *
 * Returns the entity data with the given entityKeyId in the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} entityKeyId
 * @returns {Promise<Object>} - a Promise that resolves with the requested entity data
 *
 * @example
 * DataApi.getEntityData("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e", "ec6865e6-e60e-424b-a071-6a9c1603d735")
 */
function getEntityData(entitySetId :UUID, entityKeyId :UUID) :Promise<Object> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: "entitySetId" must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entityKeyId)) {
    errorMsg = 'invalid parameter: "entityKeyId" must be a valid UUID';
    LOG.error(errorMsg, entityKeyId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .get(`/${entitySetId}/${entityKeyId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/set/{entitySetId}`
 *
 * Gets all data for the given EntitySet UUID with respect to the given filters.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID[]} propertyTypeIds
 * @param {UUID[]} entityKeyIds
 * @returns {Promise<Object[]>} - a Promise that resolves with the EntitySet data as its fulfillment value
 *
 * @example
 * DataApi.getEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["8f79e123-3411-4099-a41f-88e5d22d0e8d"],
 *   ["8b470000-0000-0000-8000-000000000007"]
 * );
 */
function getEntitySetData(entitySetId :UUID, propertyTypeIds ?:UUID[], entityKeyIds ?:UUID[]) :Promise<Object[]> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  const entitySetSelection = {};

  if (isValidUUIDArray(propertyTypeIds)) {
    entitySetSelection.properties = Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();
  }
  else if (!isUndefined(propertyTypeIds) && !isEmptyArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  if (isValidUUIDArray(entityKeyIds)) {
    entitySetSelection.ids = Set().withMutations((set :Set<UUID>) => {
      entityKeyIds.forEach((entityKeyId :UUID) => {
        set.add(entityKeyId);
      });
    }).toJS();
  }
  else if (!isUndefined(entityKeyIds) && !isEmptyArray(entityKeyIds)) {
    errorMsg = 'invalid parameter: entityKeyIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, entityKeyIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/${entitySetId}`, entitySetSelection)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /data/{entitySetId}/count`
 *
 * Returns the number of entities in the specified entity set
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @returns {Promise<number>} - a Promise that resolves with the entity count
 *
 * @example
 * DataApi.getEntitySetSize("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e")
 */
function getEntitySetSize(entitySetId :UUID) :Promise<number> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .get(`/${entitySetId}/${COUNT_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /data/set/{entitySetId}/detailed`
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID[]} propertyTypeIds
 * @param {UUID[]} entityKeyIds
 * @returns {Promise}
 *
 * @example
 * EntitySetsApi.getLinkedEntitySetBreakdown(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["8f79e123-3411-4099-a41f-88e5d22d0e8d"],
 *   ["8b470000-0000-0000-8000-000000000007"]
 * );
 */
function getLinkedEntitySetBreakdown(entitySetId :UUID, propertyTypeIds ?:UUID[], entityKeyIds ?:UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  const entitySetSelection = {};

  if (isValidUUIDArray(propertyTypeIds)) {
    entitySetSelection.properties = Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();
  }
  else if (!isUndefined(propertyTypeIds) && !isEmptyArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  if (isValidUUIDArray(entityKeyIds)) {
    entitySetSelection.ids = Set().withMutations((set :Set<UUID>) => {
      entityKeyIds.forEach((entityKeyId :UUID) => {
        set.add(entityKeyId);
      });
    }).toJS();
  }
  else if (!isUndefined(entityKeyIds) && !isEmptyArray(entityKeyIds)) {
    errorMsg = 'invalid parameter: entityKeyIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, entityKeyIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/${entitySetId}/${DETAILED_PATH}`, entitySetSelection)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /data/set/{entitySetId}`
 *
 * // TODO: description
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {Object} entityData
 * @param {UpdateType} updateType
 * @returns {Promise<number>} - a Promise that resolves with the count of entities that were updated
 *
 * @example
 * DataApi.updateEntityData(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "219f0000-0000-0000-8000-000000000000": {
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d": ["value_1", "value_2"],
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8": ["value_3", "value_4"]
 *     }
 *   },
 *   'PartialReplace'
 * );
 */
function updateEntityData(
  entitySetId :UUID,
  entityData :Object,
  updateType ?:UpdateType = UpdateTypes.PARTIAL_REPLACE,
) :Promise<number> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: "entitySetId" must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(entityData)) {
    errorMsg = 'invalid parameter: "entityData" must be a non-empty object';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  const ids :any[] = Object.keys(entityData);

  // validate all keys are UUIDs
  for (let index1 = 0; index1 < ids.length; index1 += 1) {
    const id :any = ids[index1];
    if (!isValidUUID(id)) {
      errorMsg = 'invalid parameter: "entityData" must be a non-empty object where all keys are UUIDs';
      LOG.error(errorMsg, id);
      return Promise.reject(errorMsg);
    }
  }

  // validate all values are multimaps
  // TODO: validate SetMultimap
  for (let index2 = 0; index2 < ids.length; index2 += 1) {
    const value :any = entityData[ids[index2]];
    if (!isValidMultimap(value, isValidUUID)) {
      errorMsg = 'invalid parameter: "entityData" must be a non-empty object where all values are multimaps';
      LOG.error(errorMsg, value);
      return Promise.reject(errorMsg);
    }
  }

  if (!UpdateTypes[updateType]) {
    errorMsg = 'invalid parameter: "updateType" must be a valid UpdateType';
    LOG.error(errorMsg, updateType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .put(`/${SET_PATH}/${entitySetId}?${TYPE_PATH}=${updateType}`, entityData)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  createAssociations,
  createEntityAndAssociationData,
  createOrMergeEntityData,
  deleteEntityAndNeighborData,
  deleteEntityData,
  deleteEntitySetData,
  getEntityData,
  getEntitySetData,
  getEntitySetSize,
  getLinkedEntitySetBreakdown,
  updateEntityData,
};
