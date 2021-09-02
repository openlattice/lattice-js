// @flow

import qs from 'qs';

import Logger from '../utils/Logger';
import { COLLABORATIONS_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  DATABASE_PATH,
  DATA_SETS_PATH,
  ORGANIZATIONS_PATH,
  PROJECT_PATH,
} from '../constants/UrlConstants';
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
 * `GET /collaborations/all`
 *
 * Gets all [Collaboration] objects the caller has [Permission.READ] on.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @returns {Promise<Collaboration[]>} - a Promise that resolves with an array of collaboration objects
 *
 * @example
 * CollaborationsApi.getAllCollaborations();
 */
function getAllCollaborations() :Promise<Collaboration[]> {

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`/${ALL_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations`
 *
 * Gets [Collaboration] objects the caller has [Permission.READ] on for a provided list of collaboration ids.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @returns {Promise<Collaboration[]>} - a Promise that resolves with a map of
 * collaboration ids to collaboration objects
 *
 * @example
 * CollaborationsApi.getCollaborations();
 */
function getCollaborations(ids :UUID[]) :Promise<Map<UUID, Collaboration[]>> {

  const queryParams = qs.stringify({
    id: ids,
  }, { arrayFormat: 'repeat' });

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`?${queryParams}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations/{collaborationId}`
 *
 * Gets the [Collaboration] object with the given collaboration id. The caller must have [Permission.READ] on the
 * target [Collaboration] object.
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
 * Gets all [Collaboration] objects the caller has [Permission.READ] on that include the given organization id. The
 * caller must have [Permission.READ] on the target [Organization] object.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Collaboration[]>} - a Promise that resolves with a list of collaboration objects
 *
 * @example
 * CollaborationsApi.getCollaborationsWithOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getCollaborationsWithOrganization(organizationId :UUID) :Promise<Collaboration[]> {
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
 * `POST /collaborations/`
 *
 * Creates a new [Collaboration] object.
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
 * `DELETE /collaborations/{collaborationId}`
 *
 * Deletes the [Collaboration] object with the given collaboration id. The caller must have [Permission.OWNER] on
 * the target [Collaboration] object.
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
 * `PATCH /collaborations/{collaborationId}/organzations`
 *
 * Adds the given organization ids to the [Collaboration] object with the given collaboration id. The caller must
 * have [Permission.OWNER] on the target [Collaboration] object.
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
    .patch(`/${collaborationId}/organizations`, organizations)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /collaborations/{collaborationId}/organzations`
 *
 * Removes the given organization ids from the [Collaboration] object with the given collaboration id. The caller
 * must have [Permission.OWNER] on the target [Collaboration] object.
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
 * Gets the database info for the [Collaboration] object with the given collaboration id. The caller must have
 * [Permission.READ] on the target [Collaboration] object.
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
 * Renames the database belonging to the [Collaboration] object with the given collaboration id. The caller must
 * have [Permission.OWNER] on the target [Collaboration] object.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @param {string} name
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CollaborationsApi.renameCollaborationDatabase("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function renameCollaborationDatabase(collaborationId :UUID, name :string) :Promise<void> {
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

/**
 * `PATCH /collaborations/{collaborationId}/project/{organizationId}/{dataSetId}`
 *
 * Adds the given data set id to the [Collaboration] object with the given collaboration id. The target data set
 * object must belong to the [Organization] object with the given organization id. The caller must have:
 *   - [Permission.READ] on the target [Collaboration] object
 *   - [Permission.READ] on the target [Organization] object
 *   - [Permission.OWNER] on the target data set object.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @param {UUID} organizationId
 * @param {UUID} dataSetId
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CollaborationsApi.addDataSetToCollaboration(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "01af0000-0000-0000-8000-000000000004",
 *   "00230000-0000-0000-8000-000000000004",
 * );
 */
function addDataSetToCollaboration(collaborationId :UUID, organizationId :UUID, dataSetId :UUID) :Promise<void> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .patch(`/${collaborationId}/${PROJECT_PATH}/${organizationId}/${dataSetId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /collaborations/{collaborationId}/project/{organizationId}/{dataSetId}`
 *
 * Removes the given data set id from the [Collaboration] object with the given collaboration id. The target data
 * set object must belong to the [Organization] object with the given organization id. The caller must have:
 *   - [Permission.READ] on the target [Collaboration] object
 *   - [Permission.READ] on the target [Organization] object
 *   - [Permission.OWNER] on the target data set object.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @param {UUID} organizationId
 * @param {UUID} dataSetId
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CollaborationsApi.removeDataSetFromCollaboration(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "01af0000-0000-0000-8000-000000000004",
 *   "00230000-0000-0000-8000-000000000004",
 * );
 */
function removeDataSetFromCollaboration(
  collaborationId :UUID,
  organizationId :UUID,
  dataSetId :UUID,
) :Promise<void> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .delete(`/${collaborationId}/${PROJECT_PATH}/${organizationId}/${dataSetId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations/organizations/{organizationId}/datasets`
 *
 * Gets all data set ids that belong to the [Organization] object with the given organization id that are added
 * to any [Collaboration] objects that the caller has [Permission.READ] on. The caller must have [Permission.READ]
 * on the target [Organization] object.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Object>} - a Promise that resolves with a map from collaborationId
 * to all data set ids projected in that collaboration.
 *
 * @example
 * CollaborationsApi.getOrganizationCollaborationDataSets("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getOrganizationCollaborationDataSets(organizationId :UUID) :Promise<Object> {
  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`/${ORGANIZATIONS_PATH}/${organizationId}/${DATA_SETS_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /collaborations/{collaborationId}/datasets`
 *
 * Gets all data set ids that are added to the [Collaboration] object with the given collaboration id that belong
 * to any [Organization] objects that the caller has [Permission.READ] on. The caller must have [Permission.READ]
 * on the target [Collaboration] object.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID} collaborationId
 * @returns {Promise<Object>} - a Promise that resolves with a map from
 * organizationId to all data set ids projected to the requested collaboration from that organization.
 *
 * @example
 * CollaborationsApi.getCollaborationDataSets("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getCollaborationDataSets(collaborationId :UUID) :Promise<Object> {
  let errorMsg = '';

  if (!isValidUUID(collaborationId)) {
    errorMsg = 'invalid parameter: "collaborationId" must be a valid UUID';
    LOG.error(errorMsg, collaborationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .get(`/${collaborationId}/${DATA_SETS_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /collaborations/datasets`
 *
 * Gets all [Collaboration] ids that the caller has [Permission.READ] on that include the given data set ids that
 * the caller has [Permission.READ] on.
 *
 * @static
 * @memberof lattice.CollaborationsApi
 * @param {UUID || UUID[]} dataSetIds
 * @returns {Promise<Object>} - a Promise that resolves with a map from
 * organizationId to all data set ids projected to the requested collaboration from that organization.
 *
 * @example
 * CollaborationsApi.getCollaborationsWithDataSets("01af0000-0000-0000-8000-000000000004");
 *
 * @example
 * CollaborationsApi.getCollaborationsWithDataSets([
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "01af0000-0000-0000-8000-000000000004",
 * ]);
 */
function getCollaborationsWithDataSets(dataSetIds :UUID | UUID[]) :Promise<Object> {
  let errorMsg = '';

  if (!isValidUUID(dataSetIds) && !isValidUUIDArray(dataSetIds)) {
    errorMsg = 'invalid parameter: dataSetIds must be a valid UUID or array of UUIDs';
    LOG.error(errorMsg, dataSetIds);
    return Promise.reject(errorMsg);
  }

  let datasets = dataSetIds;
  if (typeof dataSetIds === 'string') {
    datasets = [dataSetIds];
  }

  return getApiAxiosInstance(COLLABORATIONS_API)
    .post(`/${DATA_SETS_PATH}`, datasets)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  addDataSetToCollaboration,
  addOrganizationsToCollaboration,
  createCollaboration,
  deleteCollaboration,
  getAllCollaborations,
  getCollaboration,
  getCollaborationDataSets,
  getCollaborationDatabaseInfo,
  getCollaborations,
  getCollaborationsWithDataSets,
  getCollaborationsWithOrganization,
  getOrganizationCollaborationDataSets,
  removeDataSetFromCollaboration,
  removeOrganizationsFromCollaboration,
  renameCollaborationDatabase,
};
