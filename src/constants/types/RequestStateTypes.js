/*
 * @flow
 */

// TODO: use either Immutable.Map() or Object.freeze(), or look into possible "enum" libraries
const RequestStateTypes = {
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  SUBMITTED: 'SUBMITTED'
};

export type RequestState = $Keys<typeof RequestStateTypes>;

export { RequestStateTypes as default };
