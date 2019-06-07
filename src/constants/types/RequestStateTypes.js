/*
 * @flow
 */

type RequestStateTypesEnum = {|
  APPROVED :'APPROVED';
  DECLINED :'DECLINED';
  SUBMITTED :'SUBMITTED';
|};

type RequestStateType = $Values<RequestStateTypesEnum>;

const RequestStateTypes :{| ...RequestStateTypesEnum |} = Object.freeze({
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  SUBMITTED: 'SUBMITTED',
});

export default RequestStateTypes;
export type { RequestStateType };
