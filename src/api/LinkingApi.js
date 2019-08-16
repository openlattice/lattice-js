/*
 * @flow
 */

/**
 * LinkingApi ...
 *
 * @module LinkingApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.LinkingApi.link...
 *
 * @example
 * import { LinkingApi } from 'lattice';
 * // LinkingApi.link...
 */

import Logger from '../utils/Logger';
import LinkingRequest, { isValidLinkingRequest } from '../models/LinkingRequest';
import LinkingEntityType, { isValidLinkingEntityType } from '../models/LinkingEntityType';
import { LINKING_API } from '../constants/ApiNames';
import { TYPE_PATH } from '../constants/UrlConstants';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('LinkingApi');

/**
 * `POST /linking/type`
 *
 * Creates a new EntityType definition which is the result of linking several EntityTypes definitions as specified by
 * the given LinkingEntityType parameter.
 *
 * @static
 * @memberof lattice.LinkingApi
 * @param {LinkingEntityType} linkingEntityType
 * @returns {Promise<UUID>} - a Promise that resolves with the UUID of the newly-created EntityType
 * as its fulfillment value
 *
 * @example
 * LinkingApi.createLinkingEntityType(
 *   {
 *     "entityType": { ... },
 *     "entityTypeIds": [
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085",
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ],
 *     "deidentified": false
 *   }
 * );
 */
export function createLinkingEntityType(linkingEntityType :LinkingEntityType) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidLinkingEntityType(linkingEntityType)) {
    errorMsg = 'invalid parameter: linkingEntityType must be a valid LinkingEntityType';
    LOG.error(errorMsg, linkingEntityType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .post(`/${TYPE_PATH}`, linkingEntityType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /linking/set`
 *
 * Performs a linking operation on the EntitySet specified by the given LinkingEntitySet parameter. Before this call,
 * a call to LinkingApi.createLinkingEntityType() must have been made for this EntitySet's EntityType.
 *
 * @static
 * @memberof lattice.LinkingApi
 * @param {LinkingEntitySet} linkingEntitySet
 * @returns {Promise<UUID>} - a Promise that resolves with the UUID of the newly-created EntitySet
 * as its fulfillment value
 *
 * @example
 * LinkingApi.linkEntitySets(
 *   {
 *     "entitySet": { ... },
 *     "linkingProperties": [
 *       {
 *         '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e': '4b08e1f9-4a00-4169-92ea-10e377070220',
 *         'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': 'ec6865e6-e60e-424b-a071-6a9c1603d735'
 *       },
 *       {
 *         'fae6af98-2675-45bd-9a5b-1619a87235a8': '8f79e123-3411-4099-a41f-88e5d22d0e8d'
 *       }
 *     ]
 *   }
 * );
 */
export function linkEntitySets(linkingRequest :LinkingRequest) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidLinkingRequest(linkingRequest)) {
    errorMsg = 'invalid parameter: linkingRequest must be a valid LinkingRequest';
    LOG.error(errorMsg, linkingRequest);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .post('/', linkingRequest)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

// /**
//  * `POST /linking/set/{syncId}/{entitySetId}/{entityId}`
//  *
//  * @static
//  * @memberof lattice.LinkingApi
//  * @returns {Promise<UUID>}
//  *
//  * TODO: add documentation
//  * TODO: add better validation
//  * TODO: add unit tests
//  * TODO: create data models
//  */
// export function linkEntities() :Promise<*> {
//
//   return Promise.reject('LinkingApi.linkEntities() is not implemented');
// }
//
// /**
//  * `PUT /linking/set/{syncId}/{entitySetId}/{entityId}`
//  *
//  * @static
//  * @memberof lattice.LinkingApi
//  * @returns {Promise}
//  *
//  * TODO: add documentation
//  * TODO: add better validation
//  * TODO: add unit tests
//  * TODO: create data models
//  */
// export function setLinkedEntities() :Promise<*> {
//
//   return Promise.reject('LinkingApi.setLinkedEntities() is not implemented');
// }
//
// /**
//  * `DELETE /linking/set/{syncId}/{entitySetId}/{entityId}`
//  *
//  * @static
//  * @memberof lattice.LinkingApi
//  * @returns {Promise}
//  *
//  * TODO: add documentation
//  * TODO: add better validation
//  * TODO: add unit tests
//  * TODO: create data models
//  */
// export function removeLinkedEntities() :Promise<*> {
//
//   return Promise.reject('LinkingApi.removeLinkedEntities() is not implemented');
// }
//
// /**
//  * `PUT /linking/set/{syncId}/{entitySetId}/{entityId}/{linkedEntityId}`
//  *
//  * @static
//  * @memberof lattice.LinkingApi
//  * @returns {Promise}
//  *
//  * TODO: add documentation
//  * TODO: add better validation
//  * TODO: add unit tests
//  * TODO: create data models
//  */
// export function addLinkedEntities() :Promise<*> {
//
//   return Promise.reject('LinkingApi.addLinkedEntities() is not implemented');
// }
//
// /**
//  * `DELETE /linking/set/{syncId}/{entitySetId}/{entityId}/{linkedEntityId}`
//  *
//  * @static
//  * @memberof lattice.LinkingApi
//  * @returns {Promise}
//  *
//  * TODO: add documentation
//  * TODO: add better validation
//  * TODO: add unit tests
//  * TODO: create data models
//  */
// export function removeLinkedEntity() :Promise<*> {
//
//   return Promise.reject('LinkingApi.removeLinkedEntity() is not implemented');
// }
