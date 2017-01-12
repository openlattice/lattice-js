/*
 * @flow
 */

const PermissionTypes = {
  ALTER: 'ALTER',
  DISCOVER: 'DISCOVER',
  LINK: 'LINK',
  OWNER: 'OWNER',
  READ: 'READ',
  WRITE: 'WRITE'
};

export type Permission = $Keys<typeof PermissionTypes>;

export {
  PermissionTypes as default
};
