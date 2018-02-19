/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const PermissionTypes = {
  DISCOVER: 'DISCOVER',
  LINK: 'LINK',
  OWNER: 'OWNER',
  READ: 'READ',
  WRITE: 'WRITE'
};

export type Permission = $Keys<typeof PermissionTypes>;

export { PermissionTypes as default };
