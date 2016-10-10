/*
 * @flow
 */

import * as _ from 'lodash';

export function isNonEmptyString(value :any) :boolean { // eslint-disable-line

  return _.isString(value) && !_.isEmpty(value);
}
