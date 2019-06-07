/*
 * @flow
 */

type IndexTypesEnum = {|
  BTREE :'BTREE';
  GIN :'GIN';
  HASH :'HASH';
  NONE :'NONE';
|};

type IndexType = $Values<IndexTypesEnum>;

const IndexTypes :{| ...IndexTypesEnum |} = Object.freeze({
  BTREE: 'BTREE',
  GIN: 'GIN',
  HASH: 'HASH',
  NONE: 'NONE',
});

export default IndexTypes;
export type { IndexType };
