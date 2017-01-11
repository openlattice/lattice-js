/*
 * @flow
 */

const SecurableObjectTypes = {
  EntityType: 'EntityType',
  EntitySet: 'EntitySet',
  PropertyTypeInEntitySet: 'PropertyTypeInEntitySet',
  DataSource: 'Datasource',
  Organization: 'Organization'
};

export type SecurableObjectType = $Keys<typeof SecurableObjectTypes>;

export {
  SecurableObjectTypes as default
};
