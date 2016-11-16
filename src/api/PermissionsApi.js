/*
 * @flow
 */

/**
 * PermissionsApi gives access to Loom's REST API for managing ACLs on existing EntityDataModel schemas.
 *
 * @module PermissionsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.PermissionsApi.update...
 *
 * @example
 * import { PermissionsApi } from 'loom-data';
 * // PermissionsApi.update...
 */

import FullyQualifiedName from '../types/FullyQualifiedName';
import Logger from '../utils/Logger';

import {
  PERMISSIONS_API
} from '../constants/ApiNames';

import {
  ALL_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  OWNER_PATH,
  REQUESTS_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /entity/type`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} updateRequests
 * @returns {Promise}
 */
export function updateAclsForEntityTypes(updateRequests :Object[]) :Promise<> {

  if (!isNonEmptyArray(updateRequests)) {
    return Promise.reject('invalid parameter: updateRequests must be a non-empty array');
  }

  const allValid = updateRequests.reduce((isValid, request) => {
    return isValid && isNonEmptyObject(request);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: updateRequests must be an array of valid object literals');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_TYPE_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} entityTypeFqns
 * @returns {Promise}
 */
export function removeAclsForEntityTypes(entityTypeFqns :Object[]) :Promise<> {

  if (!isNonEmptyArray(entityTypeFqns)) {
    return Promise.reject('invalid parameter: entityTypeFqns must be a non-empty array');
  }

  const allValid = entityTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: entityTypeFqns must be an array of valid FQN object literals');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_TYPE_PATH}`, {
      data: entityTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} updateRequests
 * @returns {Promise}
 */
export function updateAclsForEntitySets(updateRequests :Object[]) :Promise<> {

  if (!isNonEmptyArray(updateRequests)) {
    return Promise.reject('invalid parameter: updateRequests must be a non-empty array');
  }

  const allValid = updateRequests.reduce((isValid, request) => {
    return isValid && isNonEmptyObject(request);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: updateRequests must be an array of valid object literals');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_SET_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/set`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string[]} entitySetNames
 * @returns {Promise}
 */
export function removeAclsForEntitySets(entitySetNames :string[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}`, {
      data: entitySetNames
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/type/property/type`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} updateRequests
 * @returns {Promise}
 */
export function updateAclsForPropertyTypesInEntityTypes(updateRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type/property/type`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} removeRequests
 * @returns {Promise}
 */
export function removeAclsForPropertyTypesInEntityTypes(removeRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`, {
      data: removeRequests
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set/property/type`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} updateRequests
 * @returns {Promise}
 */
export function updateAclsForPropertyTypesInEntitySets(updateRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/set/property/type`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} removeRequests
 * @returns {Promise}
 */
export function removeAclsForPropertyTypesInEntitySets(removeRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`, {
      data: removeRequests
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type/property/type/all`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} entityTypeFqns
 * @returns {Promise}
 */
export function removeAllAclsForPropertyTypesInEntityTypes(entityTypeFqns :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`, {
      data: entityTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/set/property/type/all`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string[]} entitySetNames
 * @returns {Promise}
 */
export function removeAllAclsForPropertyTypesInEntitySets(entitySetNames :string[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`, {
      data: entitySetNames
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/type?namespace=entityTypeNamespace&name=entityTypeName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise}
 */
export function getAclsForEntityType(entityTypeFqn :Object) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_TYPE_PATH}?namespace=${namespace}&name=${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/set?name=entitySetName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} entitySetName
 * @returns {Promise}
 */
export function getAclsForEntitySet(entitySetName :string) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_SET_PATH}?name=${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/type/property/type?namespace=entityTypeNamespace&name=entityTypeName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise}
 */
export function getAclsForPropertyTypesInEntityType(entityTypeFqn :Object) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}?namespace=${namespace}&name=${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/set/property/type?name=entitySetName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} entitySetName
 * @returns {Promise}
 */
export function getAclsForPropertyTypesInEntitySet(entitySetName :string) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}?name=${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/set/owner?name=entitySetName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} entitySetName
 * @returns {Promise}
 */
export function getOwnerAclsForEntitySet(entitySetName :string) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_SET_PATH}/${OWNER_PATH}?name=${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set/owner?name=entitySetName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} entitySetName
 * @param {Object} principal - an object literal representing com.kryptnostic.datastore.Principal
 * @returns {Promise}
 */
export function getOwnerAclsForPropertyTypesInEntitySet(entitySetName :string, principal :string) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_SET_PATH}/${OWNER_PATH}?name=${entitySetName}`, principal)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/set/owner/requests?name=entitySetName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} entitySetName - (optional)
 * @returns {Promise}
 */
export function getAllReceivedRequestsForPermissions(entitySetName :?string) :Promise<> {

  const queryString = (isNonEmptyString(entitySetName))
    ? `?name=${entitySetName}`
    : '';

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_SET_PATH}/${OWNER_PATH}/${REQUESTS_PATH}${queryString}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/set/requests?name=entitySetName`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} entitySetName - (optional)
 * @returns {Promise}
 */
export function getAllSentRequestsForPermissions(entitySetName :?string) :Promise<> {

  let queryString = '';
  if (isNonEmptyString(entitySetName)) {
    queryString = `?name=${entitySetName}`;
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .get(`/${ENTITY_SET_PATH}/${REQUESTS_PATH}${queryString}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set/requests`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} permissionsRequests
 * @returns {Promise}
 */
export function addPermissionsRequestForPropertyTypesInEntitySet(permissionsRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_SET_PATH}/${REQUESTS_PATH}`, permissionsRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/set/requests?id=requestId`
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {string} requestId - UUID
 * @returns {Promise}
 */
export function removePermissionsRequestForEntitySet(requestId :string) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}/${REQUESTS_PATH}?id=${requestId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
