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

import Immutable from 'immutable';

import PrincipalTypes from '../constants/types/PrincipalTypes';
import Principal from '../models/Principal';
import Logger from '../utils/Logger';

import Organization, {
  isValid as isValidOrganization
} from '../models/Organization';

import {
  ORGANIZATIONS_API
} from '../constants/ApiNames';

import {
  DESCRIPTION_PATH,
  EMAIL_DOMAINS_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  ROLES_PATH,
  TITLE_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidPrincipalArray
} from '../utils/ValidationUtils';

import type {
  PrincipalType
} from '../constants/types/PrincipalTypes';

const LOG = new Logger('OrganizationsApi');

/**
 * `GET /organizations/{uuid}`
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
export function getOrganization(organizationId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
export function getAllOrganizations() {

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get('/')
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
export function createOrganization(organization :Organization) :Promise<> {

  let errorMsg = '';

  if (!isValidOrganization(organization)) {
    errorMsg = 'invalid parameter: organization must be a valid Organization';
    LOG.error(errorMsg, organization);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post('/', organization)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
export function deleteOrganization(organizationId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/title`
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
 * OrganizationsApi.updateTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "New Title"
 * );
 */
export function updateTitle(organizationId :UUID, title :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/description`
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
 * OrganizationsApi.updateDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "new description"
 * );
 */
export function updateDescription(organizationId :UUID, description :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
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
    .put(`/${organizationId}/${DESCRIPTION_PATH}`, description, axiosConfig)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{uuid}/email-domains`
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
export function getAutoApprovedEmailDomains(organizationId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${EMAIL_DOMAINS_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/email-domains/{domain}`
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
export function addAutoApprovedEmailDomain(organizationId :UUID, emailDomain :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{uuid}/email-domains`
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
export function addAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Immutable.Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, emailDomainSet)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/email-domains`
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
export function setAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Immutable.Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, emailDomainSet)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{uuid}/email-domains/{domain}`
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
export function removeAutoApprovedEmailDomain(organizationId :UUID, emailDomain :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{uuid}/email-domains`
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
export function removeAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Immutable.Set().withMutations((set :Set<string>) => {
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{uuid}/principals`
 *
 * Gets all Principals for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getAllPrincipals("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAllPrincipals(organizationId :UUID) {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /organizations/{uuid}/principals/{type}/{id}`
 *
 * Adds the given Principal to the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {PrincipalType} principalType
 * @param {string} principalId
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.addPrincipal(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "USER",
 *   "principalId"
 * );
 */
export function addPrincipal(organizationId :UUID, principalType :PrincipalType, principalId :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(principalType) || !PrincipalTypes[principalType]) {
    errorMsg = 'invalid parameter: principalType must be a valid PrincipalType';
    LOG.error(errorMsg, principalType);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(principalId)) {
    errorMsg = 'invalid parameter: principalId must be a non-empty string';
    LOG.error(errorMsg, principalId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${principalType}/${principalId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{uuid}/principals`
 *
 * Adds the given Principals to the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {Principal[]} principals
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.addPrincipals(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     { type: "USER", id: "principalId" }
 *   ]
 * );
 */
export function addPrincipals(organizationId :UUID, principals :Principal[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidPrincipalArray(principals)) {
    errorMsg = 'invalid parameter: principals must be a non-empty array of valid Principals';
    LOG.error(errorMsg, principals);
    return Promise.reject(errorMsg);
  }

  // TODO: alternative way to dedupe
  const data = Immutable.Set().withMutations((set :Set<Principal>) => {
    principals.forEach((principal :Principal) => {
      set.add(new Principal(principal.type, principal.id));
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${PRINCIPALS_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/principals`
 *
 * Sets the given Principals for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {Principal[]} principals
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.setPrincipals(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     { type: "USER", id: "principalId" }
 *   ]
 * );
 */
export function setPrincipals(organizationId :UUID, principals :Principal[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidPrincipalArray(principals)) {
    errorMsg = 'invalid parameter: principals must be a non-empty array of valid Principals';
    LOG.error(errorMsg, principals);
    return Promise.reject(errorMsg);
  }

  const data = Immutable.Set().withMutations((set :Set<Principal>) => {
    principals.forEach((principal :Principal) => {
      set.add(new Principal(principal.type, principal.id));
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{uuid}/principals/{type}/{id}`
 *
 * Removes the given Principal from the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {PrincipalType} principalType
 * @param {string} principalId
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.removePrincipal(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "USER",
 *   "principalId"
 * );
 */
export function removePrincipal(organizationId :UUID, principalType :PrincipalType, principalId :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(principalType) || !PrincipalTypes[principalType]) {
    errorMsg = 'invalid parameter: principalType must be a valid PrincipalType';
    LOG.error(errorMsg, principalType);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(principalId)) {
    errorMsg = 'invalid parameter: principalId must be a non-empty string';
    LOG.error(errorMsg, principalId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${principalType}/${principalId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{uuid}/principals`
 *
 * Removes the given Principals from the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {Principal[]} principals
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.removePrincipals(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     { type: "USER", id: "principalId" }
 *   ]
 * );
 */
export function removePrincipals(organizationId :UUID, principals :Principal[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidPrincipalArray(principals)) {
    errorMsg = 'invalid parameter: principals must be a non-empty array of valid Principals';
    LOG.error(errorMsg, principals);
    return Promise.reject(errorMsg);
  }

  const data = Immutable.Set().withMutations((set :Set<Principal>) => {
    principals.forEach((principal :Principal) => {
      set.add(new Principal(principal.type, principal.id));
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .request({
      url: `/${organizationId}/${PRINCIPALS_PATH}`,
      method: 'delete',
      data
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{uuid}/principals/roles`
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
export function getAllRoles(organizationId :UUID) {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{uuid}/principals/members`
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
export function getAllMembers(organizationId :UUID) {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
