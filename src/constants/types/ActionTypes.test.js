import { Map } from 'immutable';

import ActionTypes from './ActionTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

/* eslint-disable key-spacing */
const EXPECTED_ENUM = Map({
  ADD     : 'ADD',
  REMOVE  : 'REMOVE',
  REQUEST : 'REQUEST',
  SET     : 'SET',
}).sortBy((value, key) => key);
/* eslint-enable */

describe('ActionTypes', () => {

  testEnumIntegrity(ActionTypes, EXPECTED_ENUM);

});
