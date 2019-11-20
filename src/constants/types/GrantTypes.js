/*
 * @flow
 */

type GrantTypesEnum = {|
  ATTRIBUTE :'Attribute';
  AUTO :'Auto';
  CLAIM :'Claim';
  GROUP :'Group';
  MANUAL :'Manual';
|};

type GrantType = $Values<GrantTypesEnum>;

const GrantTypes :{| ...GrantTypesEnum |} = Object.freeze({
  ATTRIBUTE: 'Attribute',
  AUTO: 'Auto',
  CLAIM: 'Claim',
  GROUP: 'Group',
  MANUAL: 'Manual',
});

export default GrantTypes;
export type { GrantType };
