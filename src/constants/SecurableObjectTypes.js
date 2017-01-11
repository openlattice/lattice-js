/*
 * @flow
 */

const SecurableObjectTypes = {
  EntitySet: 'EntitySet',
  EntityType: 'EntityType',
  PropertyTypeInEntitySet: 'PropertyTypeInEntitySet',
  DataSource: 'Datasource',
  Organization: 'Organization'
};

export type SecurableObjectType = $Keys<typeof SecurableObjectTypes>;

export {
  SecurableObjectTypes as default
};
