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

type SecurableType = $Values<SecurableTypesEnum>;

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

export default SecurableTypes;
export type { SecurableType };
