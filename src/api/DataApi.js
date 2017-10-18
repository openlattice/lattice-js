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

import Immutable from 'immutable';

import isUndefined from 'lodash/isUndefined';

import Logger from '../utils/Logger';

import {
  DATA_API
} from '../constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  TICKET_PATH
} from '../constants/ApiPaths';

import {
  getApiBaseUrl,
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isEmptyArray,
  isEmptyString,
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('DataApi');

/**
 * `POST /data/entitydata/{entitySetId}`
 *
 * Gets all data for the given EntitySet UUID with respect to the given filters.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} syncId
 * @param {UUID[]} propertyTypeIds
 * @returns {Promise<Object[]>} - a Promise that will resolve with the EntitySet data as its fulfillment value
 *
 * @example
 * DataApi.getSelectedEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   ["8f79e123-3411-4099-a41f-88e5d22d0e8d"]
 * );
 */
export function getEntitySetData(entitySetId :UUID, syncId :UUID, propertyTypeIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  const data = {};

  if (isValidUuid(syncId)) {
    data.syncId = syncId;
  }
  else if (!isUndefined(syncId) && !isEmptyString(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  if (isValidUuidArray(propertyTypeIds)) {
    data.properties = Immutable.Set().withMutations((set :Set<UUID>) => {
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

  return getApiAxiosInstance(DATA_API)
    .post(`/${ENTITY_DATA_PATH}/${entitySetId}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * Returns the URL to be used for a direct file download for all data for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {string} fileType
 * @returns {string} - the direct file download URL
 *
 * @example
 * DataApi.getAllEntitiesOfTypeFileUrl("ec6865e6-e60e-424b-a071-6a9c1603d735", "json");
 */
export function getEntitySetDataFileUrl(entitySetId :UUID, fileType :string) :?string {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return null;
  }

  // TODO: create an allowed file type constants map, and validate fileType against it

  if (!isNonEmptyString(fileType)) {
    errorMsg = 'invalid parameter: fileType must be a non-empty string';
    LOG.error(errorMsg, fileType);
    return null;
  }

  // eslint-disable-next-line
  return `${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${entitySetId}?fileType=${fileType.toLowerCase()}`;
}

/**
 * `PUT /data/entitydata/{entitySetId}/{syncId}`
 *
 * Creates an entry for the given entity data.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} syncId
 * @param {Object} entities
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.createEntityData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "id_1": [
 *       {
 *         "uuid_1": ["value_1", "value_2"],
 *         "uuid_2": ["value_3", "value_4"]
 *       }
 *     ]
 *   }
 * );
 */
export function createEntityData(entitySetId :UUID, syncId :UUID, entities :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  let url :string = `/${ENTITY_DATA_PATH}/${entitySetId}`;

  if (isValidUuid(syncId)) {
    url = `${url}/${syncId}`;
  }
  else if (!isUndefined(syncId) && !isEmptyString(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate entities as Map<String, SetMultimap<UUID, Object>>

  if (!isNonEmptyObject(entities)) {
    errorMsg = 'invalid parameter: entities must be a non-empty object';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .put(url, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /data/entitydata`
 *
 * Creates entities linked by associations for the given entity data.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {Object} bulkDataCreation
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.createEntityAndAssociationData(
 *   syncTickets: ["ec6865e6-e60e-424b-a071-6a9c1603d735", "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"],
 *   entities: [
 *     {
 *       "key": {
 *         "entitySetId": "entity_set_id_1",
 *         "entityId": "entity_id_1",
 *         "syncId": "sync_id_1"
 *       },
 *       "details": [
 *         {
 *           "uuid_1a": ["value_1a", "value_1b"],
 *           "uuid_1b": ["value_1c", "value_1d"]
 *         }
 *       ]
 *     },
 *     {
 *       "key": {
 *         "entitySetId": "entity_set_id_2",
 *         "entityId": "entity_id_2",
 *         "syncId": "sync_id_2"
 *       },
 *       "details": [
 *         {
 *           "uuid_2a": ["value_2a", "value_2b"],
 *           "uuid_2b": ["value_2c", "value_2d"]
 *         }
 *       ]
 *     }
 *   ],
 *   associations: [
 *     {
 *       "key": {
 *         "entitySetId": "entity_set_id_3",
 *         "entityId": "entity_id_3",
 *         "syncId": "sync_id_3"
 *       },
 *       "src": {
 *         "entitySetId": "entity_set_id_1",
 *         "entityId": "entity_id_1",
 *         "syncId": "sync_id_1"
 *       },
 *       "dst": {
 *         "entitySetId": "entity_set_id_2",
 *         "entityId": "entity_id_2",
 *         "syncId": "sync_id_2"
 *       },
 *       "details": [
 *         {
 *           "uuid_3a": ["value_3a", "value_3b"],
 *           "uuid_3b": ["value_3c", "value_3d"]
 *         }
 *       ]
 *     }
 *   ]
 * );
 */
export function createEntityAndAssociationData(bulkDataCreation :Object) :Promise<*> {

  const url :string = `/${ENTITY_DATA_PATH}`;

  return getApiAxiosInstance(DATA_API)
    .patch(url, bulkDataCreation)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /data/entitydata/{ticketId}/{syncId}`
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} ticketId
 * @param {UUID} syncId
 * @param {Object} entities
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.storeEntityData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "id_1": [
 *       {
 *         "uuid_1": ["value_1", "value_2"],
 *         "uuid_2": ["value_3", "value_4"]
 *       }
 *     ]
 *   }
 * );
 */
export function storeEntityData(ticketId :UUID, syncId :UUID, entities :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(ticketId)) {
    errorMsg = 'invalid parameter: ticketId must be a valid UUID';
    LOG.error(errorMsg, ticketId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate entities as Map<String, SetMultimap<UUID, Object>>

  if (!isNonEmptyObject(entities)) {
    errorMsg = 'invalid parameter: entities must be a non-empty object';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .patch(`/${ENTITY_DATA_PATH}/${TICKET_PATH}/${ticketId}/${syncId}`, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/ticket/{entitySetId}/{syncId}`
 *
 * Acquires a sync ticket UUID for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} syncId
 * @return {Promise<UUID>} - a Promise that will resolve with the acquired sync ticket UUID as its fulfillment value
 *
 * @example
 * DataApi.acquireSyncTicket(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
 * );
 */
export function acquireSyncTicket(entitySetId :UUID, syncId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${TICKET_PATH}/${entitySetId}/${syncId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /data/ticket/{ticketId}`
 *
 * Releases the given sync ticket UUID.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} syncId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.acquireSyncTicket("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function releaseSyncTicket(ticketId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(ticketId)) {
    errorMsg = 'invalid parameter: ticketId must be a valid UUID';
    LOG.error(errorMsg, ticketId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .delete(`/${TICKET_PATH}/${ticketId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

// TODO: createAssociationData()
// TODO: storeAssociationData()
