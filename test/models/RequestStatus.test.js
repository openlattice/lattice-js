import RequestStateTypes from '../../src/constants/types/RequestStateTypes';

import RequestStatus, {
  RequestStatusBuilder,
  isValid
} from '../../src/models/RequestStatus';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_REQUEST = {
  aclKey: [
    'ec6865e6-e60e-424b-a071-6a9c1603d735'
  ],
  permissions: [
    'READ'
  ],
  reason: 'reason'
};

const MOCK_STATE = RequestStateTypes.SUBMITTED;

const MOCK_PRINCIPAL = {
  type: 'USER',
  id: 'principalId'
};

const MOCK_REQUEST_STATUS_OBJ = {
  request: MOCK_REQUEST,
  state: MOCK_STATE,
  principal: MOCK_PRINCIPAL
};

const INVALID_REQUEST_STATE_TYPES = INVALID_PARAMS.slice(0);
INVALID_REQUEST_STATE_TYPES.push('invalid');

describe('RequestStatus', () => {

  describe('RequestStatusBuilder', () => {

    let builder :RequestStatusBuilder = null;

    beforeEach(() => {
      builder = new RequestStatusBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setRequest()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setRequest(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setRequest();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setRequest(MOCK_REQUEST);
        }).not.toThrow();
      });

    });

    describe('setRequestState()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_REQUEST_STATE_TYPES.forEach((invalidInput) => {
          expect(() => {
            builder.setRequestState(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setRequestState();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        Object.values(RequestStateTypes).forEach((type) => {
          expect(() => {
            builder.setRequestState(type);
          }).not.toThrow();
        });
      });

    });

    describe('setPrincipal()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_PRINCIPAL);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new RequestStatusBuilder())
            .setRequestState(MOCK_STATE)
            .setPrincipal(MOCK_PRINCIPAL)
            .build();
        }).toThrow();

        expect(() => {
          (new RequestStatusBuilder())
            .setRequest(MOCK_REQUEST)
            .setPrincipal(MOCK_PRINCIPAL)
            .build();
        }).toThrow();

        expect(() => {
          (new RequestStatusBuilder())
            .setRequest(MOCK_REQUEST)
            .setRequestState(MOCK_STATE)
            .build();
        }).toThrow();
      });

      it('should return a valid instance', () => {

        const requestStatus = builder
          .setRequest(MOCK_REQUEST)
          .setRequestState(MOCK_STATE)
          .setPrincipal(MOCK_PRINCIPAL)
          .build();

        expect(requestStatus).toEqual(jasmine.any(RequestStatus));

        expect(requestStatus.request).toBeDefined();
        expect(requestStatus.request).toEqual(MOCK_REQUEST);

        expect(requestStatus.state).toBeDefined();
        expect(requestStatus.state).toEqual(MOCK_STATE);

        expect(requestStatus.principal).toBeDefined();
        expect(requestStatus.principal).toEqual(MOCK_PRINCIPAL);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_REQUEST_STATUS_OBJ)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new RequestStatus(
            MOCK_REQUEST, MOCK_STATE, MOCK_PRINCIPAL
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const requestStatus = (new RequestStatusBuilder())
          .setRequest(MOCK_REQUEST)
          .setRequestState(MOCK_STATE)
          .setPrincipal(MOCK_PRINCIPAL)
          .build();

        expect(isValid(requestStatus)).toEqual(true);
      });

    });

    describe('invalid', () => {

      it('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      it('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "request" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_STATUS_OBJ, { request: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "state" property', () => {
        INVALID_REQUEST_STATE_TYPES.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_STATUS_OBJ, { state: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_STATUS_OBJ, { principal: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "request" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new RequestStatus(
              invalidInput, MOCK_STATE, MOCK_PRINCIPAL
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "state" property', () => {
        INVALID_REQUEST_STATE_TYPES.forEach((invalidInput) => {
          expect(isValid(
            new RequestStatus(
              MOCK_REQUEST, invalidInput, MOCK_PRINCIPAL
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new RequestStatus(
              MOCK_REQUEST, MOCK_STATE, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
