/*
 * @flow
 */

/**
 * DataIntegrationApi gives access to OpenLattice's REST API for integrating
 * data against an existing EntityDataModel schema.
 *
 * @module DataIntegrationApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.DataIntegrationApi.get...
 *
 * @example
 * import { DataIntegrationApi } from 'lattice';
 * // DataIntegrationApi.get...
 */

import isUndefined from 'lodash/isUndefined';

import Logger from '../utils/Logger';
import { DATA_INTEGRATION_API } from '../constants/ApiNames';
import { ENTITY_KEY_IDS_PATH } from '../constants/UrlConstants';
import { getApiAxiosInstance } from '../utils/axios';
import { isValidUUID } from '../utils/ValidationUtils';
import {
  isNonEmptyObject,
  isNonEmptyArray,
  isEmptyObject,
  isEmptyString
} from '../utils/LangUtils';

type EntityKey = {|
  entityId :string;
  entitySetId :UUID;
|};

const LOG = new Logger('DataIntegrationApi');

/**
 * `POST /integration`
 *
 * Creates entities linked by associations for the given entity data.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {Object} bulkDataCreation
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataIntegrationApi.createEntityAndAssociationData(
 *   entities: [
 *     {
 *       "key": {
 *         "entitySetId": "entity_set_id_1",
 *         "entityId": "entity_id_1"
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
 *         "entityId": "entity_id_2"
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
 *         "entityId": "entity_id_3"
 *       },
 *       "src": {
 *         "entitySetId": "entity_set_id_1",
 *         "entityId": "entity_id_1"
 *       },
 *       "dst": {
 *         "entitySetId": "entity_set_id_2",
 *         "entityId": "entity_id_2"
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

  let errorMsg = '';

  if (isUndefined(bulkDataCreation) || !isNonEmptyObject(bulkDataCreation)) {
    errorMsg = 'invalid parameter: bulkDataCreation must be a non-empty object';
    LOG.error(errorMsg);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_INTEGRATION_API)
    .post('/', bulkDataCreation)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
/**
 * `POST /integration/entityKeyIds`
 *
 * Creates entities linked by associations for the given entity data.
 *
 * @static
 * @memberof lattice.DataIntegrationApi
 * @param {Object} entityKeys
 * @return {Promise} - a Promise that resolves with a set of the entityKeyIds that were created for the given entityIds
 *
 * @example
 *
 * entityKey_1 = { entitySetId: "entitySetId_1", entityId: "entityId_1" };
 * entityKey_2 = { entitySetId: "entitySetId_2", entityId: "entityId_2" };
 *
 * DataIntegrationApi.getEntityKeyIds([entityKey_1, entityKey_2, ...]);
 */
export function getEntityKeyIds(entityKeys :EntityKey[]) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyArray(entityKeys)) {
    errorMsg = 'invalid parameter: entityIdsCreation must be a non-empty set of entityKeys';
  }
  else {
    entityKeys.forEach((entityKey) => {
      if (isEmptyObject(entityKey)) {
        errorMsg = 'invalid parameter: entityKeys must be non-empty objects';
      }
      const { entitySetId, entityId } = entityKey;
      if (!isValidUUID(entitySetId)) {
        errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
      }
      if (isEmptyString(entityId)) {
        errorMsg = 'invalid parameter: entityId must be a non-empty String';
      }
    });
  }

  if (errorMsg) {
    LOG.error(errorMsg);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_INTEGRATION_API)
    .post(`/${ENTITY_KEY_IDS_PATH}`, entityKeys)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
