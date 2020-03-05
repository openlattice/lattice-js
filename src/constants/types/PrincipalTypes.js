/*
 * @flow
 */

type PrincipalTypesEnum = {|
  APP :'APP';
  ORGANIZATION :'ORGANIZATION';
  ROLE :'ROLE';
  USER :'USER';
|};

const PrincipalTypes :{| ...PrincipalTypesEnum |} = Object.freeze({
  APP: 'APP',
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER',
});

type PrincipalType = $Values<typeof PrincipalTypes>;

export default PrincipalTypes;
export type { PrincipalType };
