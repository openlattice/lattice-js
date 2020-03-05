/*
 * @flow
 */

type EntitySetFlagTypesEnum = {|
  ASSOCIATION :'ASSOCIATION';
  AUDIT :'AUDIT';
  EXTERNAL :'EXTERNAL';
  LINKING :'LINKING';
|};

const EntitySetFlagTypes :{| ...EntitySetFlagTypesEnum |} = Object.freeze({
  ASSOCIATION: 'ASSOCIATION',
  AUDIT: 'AUDIT',
  EXTERNAL: 'EXTERNAL',
  LINKING: 'LINKING',
});

type EntitySetFlagType = $Values<typeof EntitySetFlagTypes>;

export default EntitySetFlagTypes;
export type { EntitySetFlagType };
