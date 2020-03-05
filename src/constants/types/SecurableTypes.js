/*
 * @flow
 */

type SecurableTypesEnum = {|
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

const SecurableTypes :{| ...SecurableTypesEnum |} = Object.freeze({
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

type SecurableType = $Values<typeof SecurableTypes>;

export default SecurableTypes;
export type { SecurableType };
