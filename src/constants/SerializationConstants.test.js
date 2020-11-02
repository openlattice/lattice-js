import { OrderedMap } from 'immutable';

import * as SerializationConstants from './SerializationConstants';

const EXPECTED = OrderedMap({
  DESTINATION: 'dst',
  DESTINATION_ES_IDS: 'destinationEntitySetIds',
  EDGE: 'edge',
  EDGE_ES_IDS: 'edgeEntitySetIds',
  ENTITY_KEY_IDS: 'entityKeyIds',
  ENTITY_TYPE_ID: 'entityTypeId',
  EXCLUDE_PROPERTY_TYPES: 'excludePropertyTypes',
  FUZZY: 'fuzzy',
  KEYWORD: 'kw',
  MAX_HITS: 'maxHits',
  NAME: 'name',
  NAMESPACE: 'namespace',
  ORGANIZATION: 'organizationId',
  PROPERTY_TYPE_IDS: 'pid',
  SEARCH_FIELDS: 'searchFields',
  SEARCH_TERM: 'searchTerm',
  SOURCE: 'src',
  SOURCE_ES_IDS: 'sourceEntitySetIds',
  START: 'start',
});

describe('SerializationConstants', () => {

  test('should only export expected constants', () => {
    expect(OrderedMap(SerializationConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(SerializationConstants).toHaveProperty(key);
      expect(SerializationConstants[key]).toEqual(value);
    });
  });

});
