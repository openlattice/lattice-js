/*
 * @flow
 */

const RequestStatusTypes = {
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  SUBMITTED: 'SUBMITTED'
};

export type RequestStatus = $Keys<typeof RequestStatusTypes>;

export {
  RequestStatusTypes as default
};
