/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const SecurableTypes = {
  ComplexType: 'ComplexType',
  EdgeType: 'EdgeType',
  EntitySet: 'EntitySet',
  EntityType: 'EntityType',
  DataSource: 'Datasource',
  LinkingEntityType: 'LinkingEntityType',
  PropertyTypeInEntitySet: 'PropertyTypeInEntitySet',
  Organization: 'Organization',
  OrganizationRole: 'OrganizationRole'
};

export type SecurableType = $Keys<typeof SecurableTypes>;

export {
  SecurableTypes as default
};
