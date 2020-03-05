/*
 * @flow
 */

type PermissionTypesEnum = {|
  DISCOVER :'DISCOVER';
  LINK :'LINK';
  MATERIALIZE :'MATERIALIZE';
  OWNER :'OWNER';
  READ :'READ';
  WRITE :'WRITE';
|};

const PermissionTypes :{| ...PermissionTypesEnum |} = Object.freeze({
  DISCOVER: 'DISCOVER',
  LINK: 'LINK',
  MATERIALIZE: 'MATERIALIZE',
  OWNER: 'OWNER',
  READ: 'READ',
  WRITE: 'WRITE',
});

type PermissionType = $Values<typeof PermissionTypes>;

export default PermissionTypes;
export type { PermissionType };
