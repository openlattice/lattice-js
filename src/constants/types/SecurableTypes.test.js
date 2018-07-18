import { Map } from 'immutable';

import SecurableTypes from './SecurableTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

/* eslint-disable key-spacing */
const EXPECTED_ENUM = Map({
  AssociationType         : 'AssociationType',
  ComplexType             : 'ComplexType',
  EdgeType                : 'EdgeType',
  EntitySet               : 'EntitySet',
  EntityType              : 'EntityType',
  LinkingEntityType       : 'LinkingEntityType',
  Organization            : 'Organization',
  OrganizationRole        : 'OrganizationRole',
  PropertyTypeInEntitySet : 'PropertyTypeInEntitySet',
}).sortBy((value, key) => key);
/* eslint-enable */

describe('SecurableTypes', () => {

  testEnumIntegrity(SecurableTypes, EXPECTED_ENUM);

});
