/*
 * @flow
 */

type IndexTypesEnum = {|
  BTREE :'BTREE';
  GIN :'GIN';
  HASH :'HASH';
  NONE :'NONE';
|};

const IndexTypes :{| ...IndexTypesEnum |} = Object.freeze({
  BTREE: 'BTREE',
  GIN: 'GIN',
  HASH: 'HASH',
  NONE: 'NONE',
});

type IndexType = $Values<typeof IndexTypes>;

export default IndexTypes;
export type { IndexType };
