/*
 * @flow
 */

type UpdateTypesEnum = {|
  MERGE :'Merge';
  Merge :'Merge';
  PARTIAL_REPLACE :'PartialReplace';
  PartialReplace :'PartialReplace';
  REPLACE :'Replace';
  Replace :'Replace';
|};

type UpdateType = $Values<UpdateTypesEnum>;

const UpdateTypes :{| ...UpdateTypesEnum |} = Object.freeze({
  MERGE: 'Merge',
  Merge: 'Merge',
  PARTIAL_REPLACE: 'PartialReplace',
  PartialReplace: 'PartialReplace',
  REPLACE: 'Replace',
  Replace: 'Replace',
});

export default UpdateTypes;
export type { UpdateType };
