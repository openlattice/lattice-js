/*
 * @flow
 */

type EntitySetFlagTypesEnum = {|
  ASSOCIATION :'ASSOCIATION';
  AUDIT :'AUDIT';
  EXTERNAL :'EXTERNAL';
  LINKING :'LINKING';
  TRANSPORTED :'TRANSPORTED';
  UNVERSIONED :'UNVERSIONED';
|};

const EntitySetFlagTypes :{| ...EntitySetFlagTypesEnum |} = Object.freeze({
  ASSOCIATION: 'ASSOCIATION',
  AUDIT: 'AUDIT',
  EXTERNAL: 'EXTERNAL',
  LINKING: 'LINKING',
  TRANSPORTED: 'TRANSPORTED',
  UNVERSIONED: 'UNVERSIONED',
});

type EntitySetFlagType = $Values<typeof EntitySetFlagTypes>;

export default EntitySetFlagTypes;
export type { EntitySetFlagType };
