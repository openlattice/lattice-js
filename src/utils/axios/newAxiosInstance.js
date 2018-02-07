/*
 * @flow
 */

import Axios from 'axios';
import isURL from 'validator/lib/isURL';

import { getConfig } from '../../config/Configuration';
import { isNonEmptyString } from '../../utils/LangUtils';

export default function newAxiosInstance(baseUrl :string) :Axios {

  if (!isURL(baseUrl, { require_tld: false })) {
    throw new Error('invalid parameter: baseUrl must be a valid URL');
  }

  const axiosConfigObj :Object = {
    baseURL: baseUrl,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  };

  const authToken :string = getConfig().get('authToken', '');
  if (isNonEmptyString(authToken)) {
    axiosConfigObj.headers.common.Authorization = `Bearer ${authToken}`;
  }

  return Axios.create(axiosConfigObj);
}
