/*
 * @flow
 */

import * as _ from 'lodash';

export function isNonEmptyString(value :any) :boolean {

  return _.isString(value) && !_.isEmpty(value);
}
