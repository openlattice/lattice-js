/*
 * @flow
 */

/**
 * PermissionsRequestsApi ...
 *
 * @module PermissionsRequestsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.PermissionsRequestsApi.get...
 *
 * @example
 * import { PermissionsRequestsApi } from 'loom-data';
 * // PermissionsRequestsApi.get...
 */

import RequestStatusTypes from '../constants/types/RequestStatusTypes';
import Logger from '../utils/Logger';

import Principal, {
  isValid as isValidPrincipal
} from '../models/Principal';

import {
  PERMISSIONS_REQUESTS_API
} from '../constants/ApiNames';

import {
  ADMIN_PATH,
  RESOLVED_PATH,
  UNRESOLVED_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuidArray
} from '../utils/ValidationUtils';

import type {
  Permission
} from '../constants/types/PermissionTypes';

import type {
  RequestStatus
} from '../constants/types/RequestStatusTypes';

const LOG = new Logger('PermissionsRequestsApi');

/**
 * `POST /requests/resolved`
 *
 * TODO: add documentation
 * TODO: add unit tests
 */
export function getAllResolvedRequestsForUser(aclRoot :UUID[]) :Promise<> {

  if (!isValidUuidArray(aclRoot)) {
    return Promise.reject('invalid parameter: aclRoot must be a non-empty array of valid UUIDs');
  }

  return getApiAxiosInstance(PERMISSIONS_REQUESTS_API)
    .post(`/${RESOLVED_PATH}`, aclRoot)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /requests/unresolved`
 *
 * TODO: add documentation
 * TODO: add unit tests
 */
export function getUnresolvedRequestForUser(aclRoot :UUID[]) :Promise<> {

  if (!isValidUuidArray(aclRoot)) {
    return Promise.reject('invalid parameter: aclRoot must be a non-empty array of valid UUIDs');
  }

  return getApiAxiosInstance(PERMISSIONS_REQUESTS_API)
    .post(`/${UNRESOLVED_PATH}`, aclRoot)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /requests/admin/unresolved`
 *
 * TODO: add documentation
 * TODO: add unit tests
 */
export function getAllUnresolvedRequestForAdmin(aclRoot :UUID[]) :Promise<> {

  if (!isValidUuidArray(aclRoot)) {
    return Promise.reject('invalid parameter: aclRoot must be a non-empty array of valid UUIDs');
  }

  return getApiAxiosInstance(PERMISSIONS_REQUESTS_API)
    .post(`/${ADMIN_PATH}/${UNRESOLVED_PATH}`, aclRoot)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /requests/admin`
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function updateUnresolvedRequestStatus(
    aclRoot :UUID[], userPrincipal :Principal, permissions :Map<UUID, Permission[]>, status :RequestStatus) :Promise<> {

  if (!isValidUuidArray(aclRoot)) {
    return Promise.reject('invalid parameter: aclRoot must be a non-empty array of valid UUIDs');
  }

  if (!isValidPrincipal(userPrincipal)) {
    return Promise.reject('invalid parameter: userPrincipal must be a valid Principal');
  }

  // TODO: validate permissions Map

  if (!isNonEmptyString(status) && !RequestStatusTypes[status]) {
    return Promise.reject('invalid parameter: status must be a valid RequestStatus');
  }

  const data = {
    aclRoot,
    requestingUser: userPrincipal,
    details: {
      permissions,
      status
    }
  };

  return getApiAxiosInstance(PERMISSIONS_REQUESTS_API)
    .post(`/${ADMIN_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /requests`
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function upsertPermissionsRequest(
    aclRoot :UUID[], permissions :Map<UUID, Permission[]>, status :RequestStatus) :Promise<> {

  if (!isValidUuidArray(aclRoot)) {
    return Promise.reject('invalid parameter: aclRoot must be a non-empty array of valid UUIDs');
  }

  // TODO: validate permissions Map

  if (!isNonEmptyString(status) && !RequestStatusTypes[status]) {
    return Promise.reject('invalid parameter: status must be a valid RequestStatus');
  }

  const data = {
    aclRoot,
    details: {
      permissions,
      status
    }
  };

  return getApiAxiosInstance(PERMISSIONS_REQUESTS_API)
    .put('/', data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
