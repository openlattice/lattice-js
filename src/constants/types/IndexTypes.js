/*
 * @flow
 */

type IndexTypeEnum = {|
  BTREE :'BTREE';
  GIN :'GIN';
  HASH :'HASH';
  NONE :'NONE';
|};

type IndexType = $Values<IndexTypeEnum>;

const IndexTypes :IndexTypeEnum = Object.freeze({
  BTREE: 'BTREE',
  GIN: 'GIN',
  HASH: 'HASH',
  NONE: 'NONE',
});

export { IndexTypes as default };
export type { IndexType };
