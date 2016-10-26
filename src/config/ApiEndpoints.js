/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

import {
  DATA_API,
  EDM_API
} from '../constants/ApiNames';

import {
  getBaseUrl,
  BACKEND_URLS
} from './Configuration';

const DATA_PATH :string = 'data';
const ONTOLOGY_PATH :string = 'ontology';

function getDataStoreUrl() :string {

  const baseUrl = getBaseUrl();

  if (BACKEND_URLS.get('DEV').includes(baseUrl)) {
    return baseUrl;
  }

  return `${baseUrl}/datastore`;
}

function getApiBaseUrl(api :string) :string {

  switch (api) {
    case DATA_API:
      return `${getDataStoreUrl()}/${ONTOLOGY_PATH}/${DATA_PATH}`;
    case EDM_API:
      return `${getDataStoreUrl()}/${ONTOLOGY_PATH}`;
    default:
      return getBaseUrl();
  }
}

export {
  getApiBaseUrl
};
