import { Map } from 'immutable';

import PermissionTypes from './PermissionTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  DISCOVER: 'DISCOVER',
  LINK: 'LINK',
  OWNER: 'OWNER',
  READ: 'READ',
  WRITE: 'WRITE',
}).sort();

describe('PermissionTypes', () => {

  testEnumIntegrity(PermissionTypes, EXPECTED_ENUM);

});
