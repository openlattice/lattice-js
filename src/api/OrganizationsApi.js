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

import Immutable from 'immutable';

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

/**
 * `PUT /organizations/{uuid}/title`
 *
 * Updates the title for the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
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

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  if (!isNonEmptyString(title)) {
    return Promise.reject('invalid parameter: title must be a non-empty string');
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${TITLE_PATH}`, title)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /organizations/{uuid}/description`
 *
 * Updates the description for the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
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

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  if (!isNonEmptyString(description)) {
    return Promise.reject('invalid parameter: description must be a non-empty string');
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${DESCRIPTION_PATH}`, description)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /organizations/{uuid}/email-domains`
 *
 * Gets the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<string[]>}
 *
 * @example
 * OrganizationsApi.getAutoApprovedEmailDomains("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAutoApprovedEmailDomains(organizationId :UUID) :Promise<> {

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${EMAIL_DOMAINS_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /organizations/{uuid}/email-domains`
 *
 * Sets the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise<string[]>}
 *
 * @example
 * OrganizationsApi.setAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "kryptnostic.com"
 *   ]
 * );
 */
export function setAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<> {

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    return Promise.reject('invalid parameter: emailDomains must be a non-empty array of strings');
  }

  const data = Immutable.Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /organizations/{uuid}/email-domains`
 *
 * Adds the given auto-approved email domains to the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise<string[]>}
 *
 * @example
 * OrganizationsApi.addAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "kryptnostic.com"
 *   ]
 * );
 */
export function addAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<> {

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    return Promise.reject('invalid parameter: emailDomains must be a non-empty array of strings');
  }

  const data = Immutable.Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /organizations/{uuid}/email-domains`
 *
 * REmoves the given auto-approved email domains to the given Organization UUID.
 *
 * @static
 * @memberof loom-data.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise<string[]>}
 *
 * @example
 * OrganizationsApi.removeAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "kryptnostic.com"
 *   ]
 * );
 */
export function removeAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<> {

  if (!isValidUuid(organizationId)) {
    return Promise.reject('invalid parameter: organizationId must be a valid UUID');
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    return Promise.reject('invalid parameter: emailDomains must be a non-empty array of strings');
  }

  const data = Immutable.Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
