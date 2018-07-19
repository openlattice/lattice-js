/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const SecurableTypes = {
  AssociationType: 'AssociationType',
  ComplexType: 'ComplexType',
  EdgeType: 'EdgeType',
  EntitySet: 'EntitySet',
  EntityType: 'EntityType',
  LinkingEntityType: 'LinkingEntityType',
  Organization: 'Organization',
  OrganizationRole: 'OrganizationRole',
  PropertyTypeInEntitySet: 'PropertyTypeInEntitySet',
};

export type SecurableType = $Keys<typeof SecurableTypes>;

export { SecurableTypes as default };
