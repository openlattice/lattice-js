/*
 * @flow
 */

type PrincipalTypesEnum = {|
  APP :'APP';
  ORGANIZATION :'ORGANIZATION';
  ROLE :'ROLE';
  USER :'USER';
|};

type PrincipalType = $Values<PrincipalTypesEnum>;

const PrincipalTypes :{| ...PrincipalTypesEnum |} = Object.freeze({
  APP: 'APP',
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER',
});

export default PrincipalTypes;
export type { PrincipalType };
