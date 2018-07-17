import { Map } from 'immutable';

import RequestStateTypes from './RequestStateTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  SUBMITTED: 'SUBMITTED',
}).sort();

describe('RequestStateTypes', () => {

  testEnumIntegrity(RequestStateTypes, EXPECTED_ENUM);

});
