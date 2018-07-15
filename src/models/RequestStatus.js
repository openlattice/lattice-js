/*
 * @flow
 */

import Logger from '../utils/Logger';
import RequestStateTypes from '../constants/types/RequestStateTypes';
import Principal, { isValidPrincipal } from './Principal';
import Request, { isValidRequest } from './Request';
import { isDefined, isNonEmptyString } from '../utils/LangUtils';
import { validateNonEmptyArray } from '../utils/ValidationUtils';

import type { RequestState } from '../constants/types/RequestStateTypes';

const LOG = new Logger('RequestStatus');

export default class RequestStatus {

  request :Request;
  state :RequestState;
  principal :Principal;

  constructor(request :Request, state :RequestState, principal :Principal) {

    this.request = request;
    this.state = state;
    this.principal = principal;
  }
}

export class RequestStatusBuilder {

  request :Request;
  state :RequestState;
  principal :Principal;

  setRequest(request :Request) :RequestStatusBuilder {

    if (!isValidRequest(request)) {
      throw new Error('invalid parameter: request must be a valid Request');
    }

    this.request = request;
    return this;
  }

  setRequestState(state :RequestState) :RequestStatusBuilder {

    if (!isNonEmptyString(state) || !RequestStateTypes[state]) {
      throw new Error('invalid parameter: state must be a valid RequestState');
    }

    this.state = state;
    return this;
  }

  setPrincipal(principal :Principal) :RequestStatusBuilder {

    if (!isValidPrincipal(principal)) {
      throw new Error('invalid parameter: principal must be a valid Principal');
    }

    this.principal = principal;
    return this;
  }

  build() :RequestStatus {

    if (!this.request) {
      throw new Error('missing property: request is a required property');
    }

    if (!this.state) {
      throw new Error('missing property: state is a required property');
    }

    if (!this.principal) {
      throw new Error('missing property: principal is a required property');
    }

    return new RequestStatus(this.request, this.state, this.principal);
  }
}

export function isValidRequestStatus(requestStatus :any) :boolean {

  if (!isDefined(requestStatus)) {

    LOG.error('invalid parameter: requestStatus must be defined', requestStatus);
    return false;
  }

  try {

    (new RequestStatusBuilder())
      .setRequest(requestStatus.request)
      .setRequestState(requestStatus.state)
      .setPrincipal(requestStatus.principal)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, requestStatus);
    return false;
  }
}

export function isValidRequestStatusArray(statuses :RequestStatus[]) :boolean {

  return validateNonEmptyArray(statuses, (requestStatus :RequestStatus) => isValidRequestStatus(requestStatus));
}
