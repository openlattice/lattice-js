/*
 * @flow
 */

type GrantTypesEnum = {|
  ATTRIBUTES :'Attributes';
  AUTOMATIC :'Automatic';
  CLAIM :'Claim';
  EMAIL_DOMAIN :'EmailDomain';
  GROUPS :'Groups';
  MANUAL :'Manual';
  ROLES :'Roles';
|};

type GrantType = $Values<GrantTypesEnum>;

const GrantTypes :{| ...GrantTypesEnum |} = Object.freeze({
  ATTRIBUTES: 'Attributes',
  AUTOMATIC: 'Automatic',
  CLAIM: 'Claim',
  EMAIL_DOMAIN: 'EmailDomain',
  GROUPS: 'Groups',
  MANUAL: 'Manual',
  ROLES: 'Roles',
});

export default GrantTypes;
export type { GrantType };
