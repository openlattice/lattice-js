/*
 * @flow
 */

type SortTypesEnum = {|
  FIELD :'field';
  Field :'field';
  GEO_DISTANCE :'geoDistance';
  GeoDistance :'geoDistance';
  SCORE :'score';
  Score :'score';
|};

const SortTypes :{| ...SortTypesEnum |} = Object.freeze({
  FIELD: 'field',
  Field: 'field',
  GEO_DISTANCE: 'geoDistance',
  GeoDistance: 'geoDistance',
  SCORE: 'score',
  Score: 'score',
});

type SortType = $Values<typeof SortTypes>;

export default SortTypes;
export type { SortType };
