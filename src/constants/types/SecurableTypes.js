/*
 * @flow
 */

type SecurableTypeEnum = {|
  AssociationType :'AssociationType';
  ComplexType :'ComplexType';
  EdgeType :'EdgeType';
  EntitySet :'EntitySet';
  EntityType :'EntityType';
  LinkingEntityType :'LinkingEntityType';
  Organization :'Organization';
  OrganizationRole :'OrganizationRole';
  PropertyTypeInEntitySet :'PropertyTypeInEntitySet';
|};

type SecurableType = $Values<SecurableTypeEnum>;

const SecurableTypes :SecurableTypeEnum = Object.freeze({
  AssociationType: 'AssociationType',
  ComplexType: 'ComplexType',
  EdgeType: 'EdgeType',
  EntitySet: 'EntitySet',
  EntityType: 'EntityType',
  LinkingEntityType: 'LinkingEntityType',
  Organization: 'Organization',
  OrganizationRole: 'OrganizationRole',
  PropertyTypeInEntitySet: 'PropertyTypeInEntitySet',
});

export { SecurableTypes as default };
export type { SecurableType };
