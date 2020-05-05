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

import Logger from '../utils/Logger';
import { DATA_INTEGRATION_API } from '../constants/ApiNames';
import { ENTITY_KEY_IDS_PATH } from '../constants/UrlConstants';
import {
  isDefined,
  isEmptyObject,
  isEmptyString,
  isNonEmptyArray,
} from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';

type EntityKey = {|
  entityId :string;
  entitySetId :UUID;
|};

const LOG = new Logger('DataIntegrationApi');

/**
 * `POST /integration/entityKeyIds`
 *
 * @static
 * @memberof lattice.DataIntegrationApi
 * @param {Object} entityKeys
 * @returns {Promise<UUID[]>} - a Promise that resolves with a set of the entity key ids
 *
 * @example
 *
 * entityKey_1 = { entitySetId: "entitySetId_1", entityId: "entityId_1" };
 * entityKey_2 = { entitySetId: "entitySetId_2", entityId: "entityId_2" };
 *
 * DataIntegrationApi.getEntityKeyIds([entityKey_1, entityKey_2, ...]);
 */
function getEntityKeyIds(entityKeys :EntityKey[]) :Promise<UUID[]> {

  let errorMsg = '';

  if (!isNonEmptyArray(entityKeys)) {
    errorMsg = 'invalid parameter: "entityKeys" must be a non-empty set of EntityKeys';
  }
  else {
    entityKeys.forEach((entityKey) => {
      if (!isDefined(entityKey) || isEmptyObject(entityKey)) {
        errorMsg = 'invalid parameter: "entityKeys" must be non-empty objects';
      }
      else {
        const { entitySetId, entityId } = entityKey;
        if (!isValidUUID(entitySetId)) {
          errorMsg = 'invalid parameter: "entitySetId" must be a valid UUID';
        }
        if (isEmptyString(entityId)) {
          errorMsg = 'invalid parameter: "entityId" must be a non-empty String';
        }
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

export {
  getEntityKeyIds,
};
