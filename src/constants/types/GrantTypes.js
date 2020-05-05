/*
 * @flow
 */

type GrantTypesEnum = {|
  ATTRIBUTES :'Attributes';
  Attributes :'Attributes';
  AUTOMATIC :'Automatic';
  Automatic :'Automatic';
  CLAIM :'Claim';
  Claim :'Claim';
  EMAIL_DOMAIN :'EmailDomain';
  EmailDomain :'EmailDomain';
  GROUPS :'Groups';
  Groups :'Groups';
  MANUAL :'Manual';
  Manual :'Manual';
  ROLES :'Roles';
  Roles :'Roles';
|};

const GrantTypes :{| ...GrantTypesEnum |} = Object.freeze({
  ATTRIBUTES: 'Attributes',
  Attributes: 'Attributes',
  AUTOMATIC: 'Automatic',
  Automatic: 'Automatic',
  CLAIM: 'Claim',
  Claim: 'Claim',
  EMAIL_DOMAIN: 'EmailDomain',
  EmailDomain: 'EmailDomain',
  GROUPS: 'Groups',
  Groups: 'Groups',
  MANUAL: 'Manual',
  Manual: 'Manual',
  ROLES: 'Roles',
  Roles: 'Roles',
});

type GrantType = $Values<typeof GrantTypes>;

export default GrantTypes;
export type { GrantType };
