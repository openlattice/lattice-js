/*
 * @flow
 */

const RequestStateTypes = {
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  SUBMITTED: 'SUBMITTED'
};

export type RequestState = $Keys<typeof RequestStateTypes>;

export {
  RequestStateTypes as default
};
