/*
 * @flow
 */

import {
  getBaseUrl,
  BACKEND_URLS
} from './Configuration';

const DATA_PATH = 'data';
const ONTOLOGY_PATH = 'ontology';

export const DATA_API :string = 'DataApi';
export const EDM_API :string = 'EntityDataModelApi';

function getDataStoreUrl() :string {

  const baseUrl = getBaseUrl();

  if (BACKEND_URLS.get('DEV').includes(baseUrl)) {
    return baseUrl;
  }

  return `${baseUrl}/datastore`;
}

export function getApiBaseUrl(api :string) :string {

  switch (api) {
    case DATA_API:
      return `${getDataStoreUrl()}/${ONTOLOGY_PATH}/${DATA_PATH}`;
    case EDM_API:
      return `${getDataStoreUrl()}/${ONTOLOGY_PATH}`;
    default:
      return getBaseUrl();
  }
}
