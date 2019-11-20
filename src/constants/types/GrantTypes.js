/*
 * @flow
 */

type GrantTypesEnum = {|
  ATTRIBUTE :'Attribute';
  CLAIM :'Claim';
  CONNECTION :'Connection';
  GROUP :'Group';
  MANUAL :'Manual';
|};

type GrantType = $Values<GrantTypesEnum>;

const GrantTypes :{| ...GrantTypesEnum |} = Object.freeze({
  ATTRIBUTE: 'Attribute',
  CLAIM: 'Claim',
  CONNECTION: 'Connection',
  GROUP: 'Group',
  MANUAL: 'Manual',
});

export default GrantTypes;
export type { GrantType };
