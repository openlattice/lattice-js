/*
 * @flow
 */

/**
 * OrganizationsApi ...
 *
 * @module OrganizationsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.OrganizationsApi.get...
 *
 * @example
 * import { OrganizationsApi } from 'lattice';
 * // OrganizationsApi.get...
 */

import isString from 'lodash/isString';
import { Set } from 'immutable';

import * as PermissionsApi from './PermissionsApi';

import Logger from '../utils/Logger';
import { ORGANIZATIONS_API } from '../constants/ApiNames';
import {
  CONNECTIONS_PATH,
  DESCRIPTION_PATH,
  EMAIL_DOMAINS_PATH,
  ENTITY_SETS_PATH,
  GRANT_PATH,
  INTEGRATION_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  ROLES_PATH,
  TITLE_PATH,
} from '../constants/UrlConstants';
import {
  ActionTypes,
  PermissionTypes,
  PrincipalTypes,
} from '../constants/types';
import { Ace, AceBuilder } from '../models/Ace';
import { Acl, AclBuilder } from '../models/Acl';
import { AclData, AclDataBuilder } from '../models/AclData';
import { Grant, isValidGrant } from '../models/Grant';
import { Organization, isValidOrganization } from '../models/Organization';
import { Principal, PrincipalBuilder } from '../models/Principal';
import { Role, isValidRole } from '../models/Role';
import {
  isDefined,
  isEmptyArray,
  isNonEmptyString,
  isNonEmptyStringArray,
} from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { ActionType } from '../constants/types';

const LOG = new Logger('OrganizationsApi');

/**
 * `GET /organizations/{orgId}`
 *
 * Gets the information for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Organization>}
 *
 * @example
 * OrganizationsApi.getOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganization(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations`
 *
 * Gets all Organization information.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @returns {Promise<Organization[]>}
 *
 * @example
 * OrganizationsApi.getAllOrganizations();
 */
function getAllOrganizations() :Promise<*> {

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations`
 *
 * Creates a new Organization, if it does not already exist.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {Organization} organization
 * @returns {Promise<UUID>}
 *
 * @example
 * OrganizationsApi.createOrganization(
 *   {
 *     id: "",
 *     title: "MyOrganization",
 *     description: "what an organization",
 *     members: [
 *       { type: "USER", id: "principalId_0" }
 *     ],
 *     roles: [
 *       { type: "ROLE", id: "principalId_1" }
 *     ]
 *   }
 * );
 */
function createOrganization(organization :Organization) :Promise<*> {

  let errorMsg = '';

  if (!isValidOrganization(organization)) {
    errorMsg = 'invalid parameter: organization must be a valid Organization';
    LOG.error(errorMsg, organization);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post('/', organization)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organization/{uuid}`
 *
 * Deletes the Organization for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.deleteOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deleteOrganization(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/title`
 *
 * Updates the title for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} title
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.updateOrganizationTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "New Title"
 * );
 */
function updateOrganizationTitle(organizationId :UUID, title :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, title);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${TITLE_PATH}`, title, axiosConfig)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/description`
 *
 * Updates the description for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} description
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.updateOrganizationDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "new description"
 * );
 */
function updateOrganizationDescription(organizationId :UUID, description :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isString(description)) {
    errorMsg = 'invalid parameter: description must be a string';
    LOG.error(errorMsg, description);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${DESCRIPTION_PATH}`, description, axiosConfig)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/email-domains`
 *
 * Gets the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<string[]>}
 *
 * @example
 * OrganizationsApi.getAutoApprovedEmailDomains("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getAutoApprovedEmailDomains(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${EMAIL_DOMAINS_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/email-domains/{domain}`
 *
 * Adds the given email domain to the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} emailDomain
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.addAutoApprovedEmailDomain(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "openlattice.com"
 * );
 */
function addAutoApprovedEmailDomain(organizationId :UUID, emailDomain :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(emailDomain)) {
    errorMsg = 'invalid parameter: emailDomain must be a non-empty string';
    LOG.error(errorMsg);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${EMAIL_DOMAINS_PATH}/${emailDomain}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{orgId}/email-domains`
 *
 * Adds the given email domains to the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.addAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "openlattice.com"
 *   ]
 * );
 */
function addAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, emailDomainSet)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/email-domains`
 *
 * Sets the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.setAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "openlattice.com"
 *   ]
 * );
 */
function setAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, emailDomainSet)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/email-domains/{domain}`
 *
 * Removes the given email domain from the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} emailDomain
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.removeAutoApprovedEmailDomain(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "openlattice.com"
 * );
 */
function removeAutoApprovedEmailDomain(organizationId :UUID, emailDomain :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(emailDomain)) {
    errorMsg = 'invalid parameter: emailDomain must be a non-empty string';
    LOG.error(errorMsg, emailDomain);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${EMAIL_DOMAINS_PATH}/${emailDomain}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/email-domains`
 *
 * Removes the given email domains from the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.removeAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "openlattice.com"
 *   ]
 * );
 */
function removeAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .request({
      url: `/${organizationId}/${EMAIL_DOMAINS_PATH}`,
      method: 'delete',
      data: emailDomainSet
    })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/roles/{roleId}`
 *
 * Gets the Role for the given Organization UUID corresponding to the given Role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @return {Promise}
 *
 * @example
 * OrganizationsApi.getRole("ec6865e6-e60e-424b-a071-6a9c1603d735", "fae6af98-2675-45bd-9a5b-1619a87235a8");
 */
function getRole(organizationId :UUID, roleId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/roles`
 *
 * Gets all Roles for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getAllRoles("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getAllRoles(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/roles`
 *
 * Creates a new role, if it does not already exist.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @return {Promise}
 *
 * @example
 * OrganizationsApi.createRole(
 *   {
 *     "id": "",
 *     "organizationId": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "title": "Admin",
 *     "description": "The Administrator",
 *   }
 * );
 */
function createRole(role :Role) :Promise<*> {

  let errorMsg = '';

  if (!isValidRole(role)) {
    errorMsg = 'invalid parameter: role must be a valid Role';
    LOG.error(errorMsg, role);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${ROLES_PATH}`, role)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/principals/roles/{roleId}`
 *
 * Deletes the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.deleteRole("ec6865e6-e60e-424b-a071-6a9c1603d735", "fae6af98-2675-45bd-9a5b-1619a87235a8");
 */
function deleteRole(organizationId :UUID, roleId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/title`
 *
 * Updates the title of the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} title
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "ADMIN"
 * );
 */
function updateRoleTitle(organizationId :UUID, roleId :UUID, title :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, title);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${TITLE_PATH}`, title, axiosConfig)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/description`
 *
 * Updates the description of the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} description
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "The Administrator"
 * );
 */
function updateRoleDescription(organizationId :UUID, roleId :UUID, description :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, description);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${DESCRIPTION_PATH}`, description, axiosConfig)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/members/{memberId}`
 *
 * Assigns the role identified by the given org UUID and role UUID to the member of the organization identified by
 * the given member UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addRoleToMember(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "memberId"
 * );
 */
function addRoleToMember(organizationId :UUID, roleId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${MEMBERS_PATH}/${memberId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/principals/roles/{roleId}/members/{memberId}`
 *
 * Removes the role identified by the given org UUID and role UUID from the member of the organization identified by
 * the given member UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeRoleFromMember(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "memberId"
 * );
 */
function removeRoleFromMember(organizationId :UUID, roleId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${MEMBERS_PATH}/${memberId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/members`
 *
 * Gets all Roles for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getAllMembers("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getAllMembers(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/roles/{roleId}/members`
 *
 * Gets all members with a given Role for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @returns {Promise<Member[]>} - a Promise that resolves with an array of member objects
 *
 * @example
 * OrganizationsApi.getAllUsersOfRole(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8"
 * );
 */
function getAllUsersOfRole(organizationId :UUID, roleId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${MEMBERS_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/members/{memberId}`
 *
 * Adds the member identified by the given member UUID to the organization identified by the given org UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addMemberToOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "memberId"
 * );
 */
function addMemberToOrganization(organizationId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${memberId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/principals/members/{memberId}`
 *
 * Removes the member identified by the given member UUID from the organization identified by the given org UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeMemberFromOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "memberId"
 * );
 */
function removeMemberFromOrganization(organizationId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${memberId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/entity-sets`
 *
 * Retrieves all the organization entity sets without filtering.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @return {Promise} - a Promise that resolves with a map from entity set ids to OrganizationEntitySetFlags
 *
 * @example
 * OrganizationsApi.getOrganizationEntitySets("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationEntitySets(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${ENTITY_SETS_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/integration`
 *
 * Returns integration credentials for organization owners.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @return {Promise} - a Promise that resolves with an OrganizationIntegrationAccount
 *
 * @example
 * OrganizationsApi.getOrganizationIntegrationAccount("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationIntegrationAccount(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${INTEGRATION_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

function updateTrustForOrganization(organizationId :UUID, principalId :string, action :ActionType) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(principalId)) {
    errorMsg = 'invalid parameter: principalId must be a non-empty string';
    LOG.error(errorMsg, principalId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(action) || !ActionTypes[action]) {
    errorMsg = 'invalid parameter: action must be a valid ActionType';
    LOG.error(errorMsg, action);
    return Promise.reject(errorMsg);
  }

  const principal :Principal = (new PrincipalBuilder())
    .setId(principalId)
    .setType(PrincipalTypes.ORGANIZATION)
    .build();

  const ace :Ace = (new AceBuilder())
    .setPermissions([PermissionTypes.READ])
    .setPrincipal(principal)
    .build();

  const acl :Acl = (new AclBuilder())
    .setAclKey([organizationId])
    .setAces([ace])
    .build();

  const acldata :AclData = (new AclDataBuilder())
    .setAction(action)
    .setAcl(acl)
    .build();

  return PermissionsApi.updateAcl(acldata);
}

/**
 * `PATCH /permissions`
 *
 * Grants trust between organizations by adding READ permission on the organization Principal.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} trustedPrincipalId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.grantTrustToOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "trustedPrincipalId"
 * );
 */
function grantTrustToOrganization(organizationId :UUID, trustedPrincipalId :string) :Promise<*> {

  return updateTrustForOrganization(organizationId, trustedPrincipalId, ActionTypes.ADD);
}

/**
 * `PATCH /permissions`
 *
 * Revokes trust between organizations by removing READ permission on the organization Principal.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} trustedPrincipalId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.revokeTrustFromOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "trustedPrincipalId"
 * );
 */
function revokeTrustFromOrganization(organizationId :UUID, trustedPrincipalId :string) :Promise<*> {

  return updateTrustForOrganization(organizationId, trustedPrincipalId, ActionTypes.REMOVE);
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/grant`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {Grant} grant
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleGrant(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   {
 *     "grantType": "Auto",
 *     "mappings": ["mapping1"]
 *   }
 * );
 */
function updateRoleGrant(organizationId :UUID, roleId :UUID, grant :Grant) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isValidGrant(grant)) {
    errorMsg = 'invalid parameter: grant must be a valid Grant';
    LOG.error(errorMsg, grant);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${GRANT_PATH}`, grant)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{orgId}/connections`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} connections
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addConnections(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["connection1", "connection2"]
 * );
 */
function addConnections(organizationId :UUID, connections :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let connectionsSet :string[];
  if (!isDefined(connections) || isEmptyArray(connections)) {
    connectionsSet = [];
  }
  else if (!isNonEmptyStringArray(connections)) {
    errorMsg = 'invalid parameter: connections must be an array of strings';
    LOG.error(errorMsg, connections);
    return Promise.reject(errorMsg);
  }
  else {
    connectionsSet = Set().withMutations((set :Set<UUID>) => (
      connections.forEach((connection :string) => set.add(connection))
    )).toJS();
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${CONNECTIONS_PATH}`, connectionsSet)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/connections`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} connections
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.setConnections(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["connection1", "connection2"]
 * );
 */
function setConnections(organizationId :UUID, connections :?string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let connectionsSet :string[];
  if (!isDefined(connections) || isEmptyArray(connections)) {
    connectionsSet = [];
  }
  else if (!isNonEmptyStringArray(connections)) {
    errorMsg = 'invalid parameter: connections must be an array of strings';
    LOG.error(errorMsg, connections);
    return Promise.reject(errorMsg);
  }
  else {
    connectionsSet = Set().withMutations((set :Set<UUID>) => (
      // $FlowFixMe
      connections.forEach((connection :string) => set.add(connection))
    )).toJS();
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${CONNECTIONS_PATH}`, connectionsSet)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/connections`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} connections
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeConnections(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["connection1", "connection2"]
 * );
 */
function removeConnections(organizationId :UUID, connections :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let data :string[];
  if (!isDefined(connections) || isEmptyArray(connections)) {
    data = [];
  }
  else if (!isNonEmptyStringArray(connections)) {
    errorMsg = 'invalid parameter: connections must be an array of strings';
    LOG.error(errorMsg, connections);
    return Promise.reject(errorMsg);
  }
  else {
    data = Set().withMutations((set :Set<UUID>) => (
      connections.forEach((connection :string) => set.add(connection))
    )).toJS();
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${CONNECTIONS_PATH}`, { data })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  addAutoApprovedEmailDomain,
  addAutoApprovedEmailDomains,
  addConnections,
  addMemberToOrganization,
  addRoleToMember,
  createOrganization,
  createRole,
  deleteOrganization,
  deleteRole,
  getAllMembers,
  getAllOrganizations,
  getAllRoles,
  getAllUsersOfRole,
  getAutoApprovedEmailDomains,
  getOrganization,
  getOrganizationEntitySets,
  getOrganizationIntegrationAccount,
  getRole,
  grantTrustToOrganization,
  removeAutoApprovedEmailDomain,
  removeAutoApprovedEmailDomains,
  removeConnections,
  removeMemberFromOrganization,
  removeRoleFromMember,
  revokeTrustFromOrganization,
  setAutoApprovedEmailDomains,
  setConnections,
  updateOrganizationDescription,
  updateOrganizationTitle,
  updateRoleDescription,
  updateRoleGrant,
  updateRoleTitle,
};
