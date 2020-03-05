/*
 * @flow
 */

type RequestStateTypesEnum = {|
  APPROVED :'APPROVED';
  DECLINED :'DECLINED';
  SUBMITTED :'SUBMITTED';
|};

const RequestStateTypes :{| ...RequestStateTypesEnum |} = Object.freeze({
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  SUBMITTED: 'SUBMITTED',
});

type RequestStateType = $Values<typeof RequestStateTypes>;

export default RequestStateTypes;
export type { RequestStateType };
