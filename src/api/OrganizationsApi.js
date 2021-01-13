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

import { Set } from 'immutable';

import * as PermissionsApi from './PermissionsApi';

import Logger from '../utils/Logger';
import { ORGANIZATIONS_API } from '../constants/ApiNames';
import {
  CONNECTIONS_PATH,
  DATABASE_PATH,
  DATASOURCE_PATH,
  DESCRIPTION_PATH,
  DESTROY_PATH,
  EMAIL_DOMAINS_PATH,
  ENTITY_SETS_PATH,
  GRANT_PATH,
  INTEGRATION_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  PROMOTE_PATH,
  ROLES_PATH,
  TITLE_PATH,
  TRANSPORT_PATH,
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
  isEmptyString,
  isNonEmptyObject,
  isNonEmptyString,
  isNonEmptyStringArray,
} from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { ActionType } from '../constants/types';
import type { UUID } from '../types';

const LOG = new Logger('OrganizationsApi');

const AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

/*
 *
 * internal
 *
 */

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

/*
 *
 * external
 *
 */

/**
 * `POST /organizations/{orgId}/connections`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} connections
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addConnectionsToOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["connection1", "connection2"]
 * );
 */
function addConnectionsToOrganization(organizationId :UUID, connections ?:string[]) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let connectionsSet :string[];
  if (!isDefined(connections) || isEmptyArray(connections)) {
    connectionsSet = [];
  }
  else if (!isNonEmptyStringArray(connections)) {
    errorMsg = 'invalid parameter: "connections" must be an array of strings';
    LOG.error(errorMsg, connections);
    return Promise.reject(errorMsg);
  }
  else {
    connectionsSet = Set(connections).toJS();
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
 * `PUT /organizations/{orgId}/email-domains/{domain}`
 *
 * Adds the given email domain to the auto-approved email domains for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} domains
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addDomainsToOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "openlattice.com"
 * );
 */
function addDomainsToOrganization(organizationId :UUID, domains ?:string[]) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let domainsSet :string[];
  if (!isDefined(domains) || isEmptyArray(domains)) {
    domainsSet = [];
  }
  else if (!isNonEmptyStringArray(domains)) {
    errorMsg = 'invalid parameter: "domains" must be an array of strings';
    LOG.error(errorMsg, domains);
    return Promise.reject(errorMsg);
  }
  else {
    domainsSet = Set(domains).toJS();
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, domainsSet)
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
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addMemberToOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "memberId"
 * );
 */
function addMemberToOrganization(organizationId :UUID, memberId :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: "memberId" must be a non-empty string';
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
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addRoleToMember(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "memberId"
 * );
 */
function addRoleToMember(organizationId :UUID, roleId :UUID, memberId :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: "roleId" must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: "memberId" must be a non-empty string';
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
function createOrganization(organization :Organization) :Promise<UUID> {

  let errorMsg = '';

  if (!isValidOrganization(organization)) {
    errorMsg = 'invalid parameter: "organization" must be a valid Organization';
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
 * `POST /organizations/roles`
 *
 * Creates a new role, if it does not already exist.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @returns {Promise}
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
    errorMsg = 'invalid parameter: "role" must be a valid Role';
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
 * `DELETE /organization/{uuid}`
 *
 * Deletes the Organization for the given Organization id.
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
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
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
 * `DELETE /organizations/{orgId}/principals/roles/{roleId}`
 *
 * Deletes the Role identified by the given Organization id and Role id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.deleteRole(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8"
 * );
 */
function deleteRole(organizationId :UUID, roleId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: "roleId" must be a valid UUID';
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
 * `GET /organizations/{orgId}/{entitySetId}/destroy`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} entitySetId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.destroyTransportedOrganizationEntitySet(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "d66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea"
 * );
 */
function destroyTransportedOrganizationEntitySet(organizationId :UUID, entitySetId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: "entitySetId" must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${entitySetId}/${DESTROY_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations`
 *
 * Gets all Organizations.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @returns {Promise<Organization[]>}
 *
 * @example
 * OrganizationsApi.getAllOrganizations();
 */
function getAllOrganizations() :Promise<Organization[]> {

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}`
 *
 * Gets the information for the given Organization id.
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
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
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
 * `GET /organizations/{orgId}/database`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<string>}
 *
 * @example
 * OrganizationsApi.getOrganizationDatabaseName("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationDatabaseName(organizationId :UUID) :Promise<string> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${DATABASE_PATH}`)
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
 * @returns {Promise<Object>} - a Promise that resolves with a map from entity set ids to OrganizationEntitySetFlags
 *
 * @example
 * OrganizationsApi.getOrganizationEntitySets("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationEntitySets(organizationId :UUID) :Promise<Object> {

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
 * @returns {Promise} - a Promise that resolves with an OrganizationIntegrationAccount
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

/**
 * `GET /organizations/{orgId}/principals/members`
 *
 * Gets all Roles for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getOrganizationMembers("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationMembers(organizationId :UUID) :Promise<Principal[]> {

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
 * `GET /organizations/{orgId}/principals/roles`
 *
 * Gets all Roles for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getOrganizationRoles("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationRoles(organizationId :UUID) :Promise<Principal[]> {

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
 * `GET /organizations/{orgId}/principals/roles/{roleId}`
 *
 * Gets the Role for the given Organization id corresponding to the given Role id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @returns {Promise<Role>}
 *
 * @example
 * OrganizationsApi.getRole("ec6865e6-e60e-424b-a071-6a9c1603d735", "fae6af98-2675-45bd-9a5b-1619a87235a8");
 */
function getRole(organizationId :UUID, roleId :UUID) :Promise<Role> {

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
 * `GET /organizations/{orgId}/principals/roles/{roleId}/members`
 *
 * Gets users with the given Role for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @returns {Promise<Member[]>} - a Promise that resolves with an array of member objects
 *
 * @example
 * OrganizationsApi.getUsersWithRole(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8"
 * );
 */
function getUsersWithRole(organizationId :UUID, roleId :UUID) :Promise<*> {

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
 * `PATCH /permissions`
 *
 * Grants trust between organizations by adding READ permission on the Organization Principal.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} trustedPrincipalId
 * @returns {Promise} - a Promise that resolves without a value
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
 * `POST /organizations/{orgId}/datasource`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {Object} dataSource
 * @returns {Promise<UUID>} - a Promise that resolves with the newly-created datasource id
 *
 * @example
 * OrganizationsApi.registerOrganizationDataSource(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "name": "name",
 *     "url": "url",
 *     "driver": "driver",
 *     "database": "database",
 *     "username": "username",
 *     "password": "password"
 *   }
 * );
 */
function registerOrganizationDataSource(organizationId :UUID, dataSource :Object) :Promise<UUID> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(dataSource)) {
    errorMsg = 'invalid parameter: "dataSource" must be a non-empty object';
    LOG.error(errorMsg, dataSource);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${DATASOURCE_PATH}`, dataSource)
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
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeConnectionsFromOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["connection1", "connection2"]
 * );
 */
function removeConnectionsFromOrganization(organizationId :UUID, connections ?:string[]) :Promise<void> {

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
    data = Set(connections).toJS();
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${CONNECTIONS_PATH}`, { data })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/email-domains/{domain}`
 *
 * Removes the given email domain from the email domains for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} emailDomain
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeDomainsFromOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "openlattice.com"
 * );
 */
function removeDomainsFromOrganization(organizationId :UUID, domains ?:string[]) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let data :string[];
  if (!isDefined(domains) || isEmptyArray(domains)) {
    data = [];
  }
  else if (!isNonEmptyStringArray(domains)) {
    errorMsg = 'invalid parameter: "domains" must be an array of strings';
    LOG.error(errorMsg, domains);
    return Promise.reject(errorMsg);
  }
  else {
    data = Set(domains).toJS();
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, { data })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/promote/{organizationId}`
 *
 * Moves the specified table from the staging schema to the openlattice schema in the organization's external database
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} tableName
 * @returns {Promise<void>}
 *
 * @example
 * OrganiationsApi.promoteStagingTable(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735"
 *   "tableName"
 * );
 */
function promoteStagingTable(organizationId :UUID, tableName :string) :Promise<void> {
  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(tableName)) {
    errorMsg = 'invalid parameter: "tableName" must be a non-empty string';
    LOG.error(errorMsg, tableName);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${PROMOTE_PATH}/${organizationId}`, tableName, AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN)
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
 * @returns {Promise} - a Promise that resolves without a value
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
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: "memberId" must be a non-empty string';
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
 * `DELETE /organizations/{orgId}/principals/roles/{roleId}/members/{memberId}`
 *
 * Removes the Role identified by the given Organization id and Role id from the member of the organization identified
 * by the given member Principal id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeRoleFromMember(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "memberId"
 * );
 */
function removeRoleFromMember(organizationId :UUID, roleId :UUID, memberId :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: "roleId" must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: "memberId" must be a non-empty string';
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
 * `GET /organizations/{orgId}/database`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} databaseName
 * @returns {Promise<void>}
 *
 * @example
 * OrganizationsApi.renameOrganizationDatabase("ec6865e6-e60e-424b-a071-6a9c1603d735", "openlattice");
 */
function renameOrganizationDatabase(organizationId :UUID, databaseName :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(databaseName)) {
    errorMsg = 'invalid parameter: "databaseName" must be a non-empty string';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .patch(`/${organizationId}/${DATABASE_PATH}`, databaseName, AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /permissions`
 *
 * Revokes trust between organizations by removing READ permission on the Organization Principal.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} trustedPrincipalId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.revokeTrustFromOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "trustedPrincipalId"
 * );
 */
function revokeTrustFromOrganization(organizationId :UUID, trustedPrincipalId :string) :Promise<void> {

  return updateTrustForOrganization(organizationId, trustedPrincipalId, ActionTypes.REMOVE);
}

/**
 * `GET /organizations/{orgId}/{entitySetId}/transport`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} entitySetId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.transportOrganizationEntitySet(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "d66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea"
 * );
 */
function transportOrganizationEntitySet(organizationId :UUID, entitySetId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: "entitySetId" must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${entitySetId}/${TRANSPORT_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/datasource/{dataSourceId}`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} dataSourceId
 * @param {Object} dataSource
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateOrganizationDataSource(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "adec59a3-0c25-4ad4-a407-9c510acbf0d0",
 *   {
 *     "name": "name",
 *     "url": "url",
 *     "driver": "driver",
 *     "database": "database",
 *     "username": "username",
 *     "password": "password"
 *   }
 * );
 */
function updateOrganizationDataSource(organizationId :UUID, dataSourceId :UUID, dataSource :Object) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(dataSourceId)) {
    errorMsg = 'invalid parameter: "dataSourceId" must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(dataSource)) {
    errorMsg = 'invalid parameter: "dataSource" must be a non-empty object';
    LOG.error(errorMsg, dataSource);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${DATASOURCE_PATH}/${dataSourceId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/description`
 *
 * Updates the description for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} description
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateOrganizationDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "new description"
 * );
 */
function updateOrganizationDescription(organizationId :UUID, description ?:string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  let newDescription :string;
  if (!isDefined(description) || isEmptyString(description)) {
    newDescription = '';
  }
  else if (!isNonEmptyString(description)) {
    errorMsg = 'invalid parameter: "description" must be a non-empty string';
    LOG.error(errorMsg, description);
    return Promise.reject(errorMsg);
  }
  else {
    newDescription = description;
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${DESCRIPTION_PATH}`, newDescription, AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/title`
 *
 * Updates the title for the given Organization id.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} title
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateOrganizationTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "New Title"
 * );
 */
function updateOrganizationTitle(organizationId :UUID, title :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(title)) {
    errorMsg = 'invalid parameter: "title" must be a non-empty string';
    LOG.error(errorMsg, title);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${TITLE_PATH}`, title, AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN)
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
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "The Administrator"
 * );
 */
function updateRoleDescription(organizationId :UUID, roleId :UUID, description ?:string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: "roleId" must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  // if (!isNonEmptyString(description)) {
  //   errorMsg = 'invalid parameter: "description" must be a non-empty string';
  //   LOG.error(errorMsg, description);
  //   return Promise.reject(errorMsg);
  // }

  let newDescription :string;
  if (!isDefined(description) || isEmptyString(description)) {
    newDescription = '';
  }
  else if (!isNonEmptyString(description)) {
    errorMsg = 'invalid parameter: "description" must be a non-empty string';
    LOG.error(errorMsg, description);
    return Promise.reject(errorMsg);
  }
  else {
    newDescription = description;
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(
      `/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${DESCRIPTION_PATH}`,
      newDescription,
      AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
    )
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/grant`
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {Grant} grant
 * @returns {Promise<void>} - a Promise that resolves without a value
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
function updateRoleGrant(organizationId :UUID, roleId :UUID, grant :Grant) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: "roleId" must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isValidGrant(grant)) {
    errorMsg = 'invalid parameter: "grant" must be a valid Grant';
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
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/title`
 *
 * Updates the title of the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} title
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "ADMIN"
 * );
 */
function updateRoleTitle(organizationId :UUID, roleId :UUID, title :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(roleId)) {
    errorMsg = 'invalid parameter: "roleId" must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(title)) {
    errorMsg = 'invalid parameter: "title" must be a non-empty string';
    LOG.error(errorMsg, title);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(
      `/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${TITLE_PATH}`,
      title,
      AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
    )
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  addConnectionsToOrganization,
  addDomainsToOrganization,
  addMemberToOrganization,
  addRoleToMember,
  createOrganization,
  createRole,
  deleteOrganization,
  deleteRole,
  destroyTransportedOrganizationEntitySet,
  getAllOrganizations,
  getOrganization,
  getOrganizationDatabaseName,
  getOrganizationEntitySets,
  getOrganizationIntegrationAccount,
  getOrganizationMembers,
  getOrganizationRoles,
  getRole,
  getUsersWithRole,
  grantTrustToOrganization,
  promoteStagingTable,
  registerOrganizationDataSource,
  removeConnectionsFromOrganization,
  removeDomainsFromOrganization,
  removeMemberFromOrganization,
  removeRoleFromMember,
  renameOrganizationDatabase,
  revokeTrustFromOrganization,
  transportOrganizationEntitySet,
  updateOrganizationDataSource,
  updateOrganizationDescription,
  updateOrganizationTitle,
  updateRoleDescription,
  updateRoleGrant,
  updateRoleTitle,
};
