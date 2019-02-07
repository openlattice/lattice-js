import { Map } from 'immutable';

import PermissionTypes from './PermissionTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  DISCOVER: 'DISCOVER',
  LINK: 'LINK',
  MATERIALIZE: 'MATERIALIZE',
  OWNER: 'OWNER',
  READ: 'READ',
  WRITE: 'WRITE',
}).sortBy((value, key) => key);

describe('PermissionTypes', () => {

  testEnumIntegrity(PermissionTypes, EXPECTED_ENUM);

});
