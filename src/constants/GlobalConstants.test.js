import { Map, OrderedMap } from 'immutable';

import * as GlobalConstants from './GlobalConstants';

/* eslint-disable key-spacing */
const EXPECTED = Map({
  AT_CLASS           : '@class',
  AT_ID              : '@id',
  DESTINATION        : 'dst',
  DESTINATION_ES_IDS : 'destinationEntitySetIds',
  EDGE               : 'edge',
  EDGE_ES_IDS        : 'edgeEntitySetIds',
  ENTITY_KEY_IDS     : 'entityKeyIds',
  ENTITY_TYPE_ID     : 'entityTypeId',
  FUZZY              : 'fuzzy',
  KEYWORD            : 'kw',
  MAX_HITS           : 'maxHits',
  NAME               : 'name',
  NAMESPACE          : 'namespace',
  OPENLATTICE_ID_FQN : 'openlattice.@id',
  PROPERTY_TYPE_IDS  : 'pid',
  ROLE_PKG           : 'com.openlattice.organization.roles.Role',
  SEARCH_FIELDS      : 'searchFields',
  SEARCH_TERM        : 'searchTerm',
  SOURCE             : 'src',
  SOURCE_ES_IDS      : 'sourceEntitySetIds',
  START              : 'start',
}).sortBy((value, key) => key);
/* eslint-enable */

describe('GlobalConstants', () => {

  test('should only export expected constants', () => {
    expect(OrderedMap(GlobalConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(GlobalConstants).toHaveProperty(key);
      expect(GlobalConstants[key]).toEqual(value);
    });
  });

});
