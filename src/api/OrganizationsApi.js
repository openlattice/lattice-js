/*
 * @flow
 */

/**
 * PermissionsApi gives access to Loom's REST API for managing ACLs on existing EntityDataModel schemas.
 *
 * @module OrganizationsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.OrganizationsApi.get...
 *
 * @example
 * import { OrganizationsApi } from 'loom-data';
 * // OrganizationsApi.get...
 */

import Logger from '../utils/Logger';

import Organization, {
  isValid as isValidOrganization
} from '../models/Organization';

import {
  ORGANIZATIONS_API
} from '../constants/ApiNames';

import {

} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('OrganizationsApi');

/**
 * `GET /organizations/{uuid}`
 *
 * Gets the information for the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Organization>}
 *
 * @example
 * OrganizationsApi.getOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getOrganization(organizationId :UUID) :Promise<> {

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /organizations`
 *
 * Gets all Organization information.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @returns {Promise<Organization[]>}
 *
 * @example
 * OrganizationsApi.getAllOrganizations();
 */
export function getAllOrganizations() {

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get('/')
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /organizations`
 *
 * Creates a new Organization, it it does not already exist.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {Organization} organization
 * @returns {Promise<UUID>}
 *
 * @example
 * OrganizationsApi.createOrganization(
 *   {
 *   }
 * );
 */
export function createOrganization(organization :Organization) :Promise<> {

  if (!isValidOrganization(organization)) {
    return Promise.reject('invalid parameter: organization must be a valid Organization');
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post('/', organization)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /organization/{uuid}`
 *
 * Deletes the information for the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.deleteOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteOrganization(organizationId :UUID) :Promise<> {

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
