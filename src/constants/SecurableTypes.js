/*
 * @flow
 */

const SecurableTypes = {
  EntitySet: 'EntitySet',
  EntityType: 'EntityType',
  PropertyTypeInEntitySet: 'PropertyTypeInEntitySet',
  DataSource: 'Datasource',
  Organization: 'Organization'
};

export type SecurableType = $Keys<typeof SecurableTypes>;

export {
  SecurableTypes as default
};
