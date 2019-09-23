/*
 * @flow
 */

type EntitySetFlagTypesEnum = {|
  ASSOCIATION :'ASSOCIATION';
  AUDIT :'AUDIT';
  EXTERNAL :'EXTERNAL';
  LINKING :'LINKING';
|};

type EntitySetFlagType = $Values<EntitySetFlagTypesEnum>;

const EntitySetFlagTypes :{| ...EntitySetFlagTypesEnum |} = Object.freeze({
  ASSOCIATION: 'ASSOCIATION',
  AUDIT: 'AUDIT',
  EXTERNAL: 'EXTERNAL',
  LINKING: 'LINKING',
});

export default EntitySetFlagTypes;
export type { EntitySetFlagType };
