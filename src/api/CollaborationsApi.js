// @flow

import Logger from '../utils/Logger';
import { COLLABORATIONS_API } from '../constants/ApiNames';
import { DATABASE_PATH, ORGANIZATIONS_PATH } from '../constants/UrlConstants';
import { isNonEmptyObject, isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID, isValidUUIDArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { UUID } from '../types';

const LOG = new Logger('CollaborationsApi');

type Collaboration = {|
  description ?:string;
  id ?:UUID;
  name :string;
  organizationIds :UUID[];
  title :string;
|};

/**
 * `GET /collaborations/`
 *
 * Get collaborations
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @returns {Promise<Collaboration[]>} - a Promise that resolves with an array of collaboration objects
 *
 * @example
 * CollaborationsApi.getCollaborations();
 */
function getCollaborations() :Promise<Collaboration[]> {

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /collaborations/`
 *
 * Create a collaboration
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {Collaboration} collaboration
 * @returns {Promise<Collaboration>} - a Promise that resolves with the new collaboration id
 *
 * @example
 * CollaborationsApi.createCollaboration({
 *   name: "test_collaboration",
 *   organizationIds: ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *   title: "Test Collaboration",
 * });
 */
function createCollaboration(collaboration :Collaboration) :Promise<UUID> {
  let errorMsg = '';
  if (!isNonEmptyObject(collaboration)) {
    errorMsg = 'invalid parameter: "collaboration" must be a non-empty object';
    LOG.error(errorMsg, collaboration);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .post('/', collaboration)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations/{collaborationId}`
 *
 * Get collaboration by id
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @returns {Promise<Collaboration>} - a Promise that resolves with a collaboration object
 *
 * @example
 * CollaborationsApi.getCollaboration("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getCollaboration(collaborationId :UUID) :Promise<Collaboration> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`/${collaborationId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations/organizations/{organiationId}`
 *
 * Get collaborations that include a specified organization by id
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Collaboration[]>} - a Promise that resolves with a list of collaboration objects
 *
 * @example
 * CollaborationsApi.getCollaborationsIncludingOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getCollaborationsIncludingOrganization(organizationId :UUID) :Promise<Collaboration[]> {
  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`/${ORGANIZATIONS_PATH}/${organizationId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /collaborations/{collaborationId}`
 *
 * Delete collaboration by collaboration id
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @returns {Promise<Number>} - a Promise that resolves with the count of collaborations that were deleted
 *
 * @example
 * CollaborationsApi.deleteCollaboration("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deleteCollaboration(collaborationId :UUID) :Promise<Collaboration[]> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .delete(`/${collaborationId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /collaborations/{collaborationId}/organzations`
 *
 * Add organizations to a collaboration by organization ids
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @param {UUID || UUID[]} organizationIds
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CollaborationsApi.addOrganizationsToCollaboration([
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "01af0000-0000-0000-8000-000000000004",
 * ]);
 * @example
 * CollaborationsApi.addOrganizationsToCollaboration(ec6865e6-e60e-424b-a071-6a9c1603d735);
 */
function addOrganizationsToCollaboration(collaborationId :UUID, organizationIds :UUID | UUID[]) :Promise<void> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: collaborationId must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(organizationIds) && !isValidUUIDArray(organizationIds)) {
    errorMsg = 'invalid parameter: organizationIds must be a valid UUID or array of UUIDs';
    LOG.error(errorMsg, organizationIds);
    return Promise.reject(errorMsg);
  }

  let organizations = organizationIds;
  if (typeof organizationIds === 'string') {
    organizations = [organizationIds];
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .post(`/${collaborationId}/organizations`, organizations)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /collaborations/{collaborationId}/organzations`
 *
 * Remove organizations from a collaboration by organization ids
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @param {UUID || UUID[]} organizationIds
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CollaborationsApi.removeOrganizationsFromCollaboration([
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "01af0000-0000-0000-8000-000000000004",
 * ]);
 * @example
 * CollaborationsApi.removeOrganizationsFromCollaboration(ec6865e6-e60e-424b-a071-6a9c1603d735);
 */
function removeOrganizationsFromCollaboration(collaborationId :UUID, organizationIds :UUID | UUID[]) :Promise<void> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: collaborationId must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(organizationIds) && !isValidUUIDArray(organizationIds)) {
    errorMsg = 'invalid parameter: organizationIds must be a valid UUID or array of UUIDs';
    LOG.error(errorMsg, organizationIds);
    return Promise.reject(errorMsg);
  }

  let data = organizationIds;
  if (typeof organizationIds === 'string') {
    data = [organizationIds];
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .delete(`/${collaborationId}/organizations`, { data })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations/{collaborationId}/database`
 *
 * Delete collaboration by collaboration id
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @returns {Promise<Object>} - a Promise that resolves with an OrganizationDatabase object
 *
 * @example
 * CollaborationsApi.getCollaborationDatabaseInfo("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getCollaborationDatabaseInfo(collaborationId :UUID) :Promise<Collaboration[]> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`/${collaborationId}/${DATABASE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /collaborations/{collaborationId}/database`
 *
 * Rename collaboration database
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @param {UUID} name
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CollaborationsApi.renameDatabase("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function renameDatabase(collaborationId :UUID, name :string) :Promise<void> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(name)) {
    errorMsg = 'invalid parameter: "name" must be a non-empty string';
    LOG.error(errorMsg, name);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .patch(`/${collaborationId}/${DATABASE_PATH}`, name)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  addOrganizationsToCollaboration,
  createCollaboration,
  deleteCollaboration,
  getCollaboration,
  getCollaborations,
  getCollaborationsIncludingOrganization,
  removeOrganizationsFromCollaboration,
  getCollaborationDatabaseInfo,
  renameDatabase,
};
