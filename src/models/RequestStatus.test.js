import RequestStatus, { RequestStatusBuilder, isValid } from './RequestStatus';
import { RequestStateTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_REQUEST_STATUS_DM } from '../utils/testing/MockDataModels';

describe('RequestStatus', () => {

  describe('RequestStatusBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new RequestStatusBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setRequest()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setRequest(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setRequest();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setRequest(MOCK_REQUEST_STATUS_DM.request);
        }).not.toThrow();
      });

    });

    describe('setRequestState()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setRequestState(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setRequestState();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        Object.values(RequestStateTypes).forEach((type) => {
          expect(() => {
            builder.setRequestState(type);
          }).not.toThrow();
        });
      });

    });

    describe('setPrincipal()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_REQUEST_STATUS_DM.principal);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new RequestStatusBuilder())
            .setRequestState(MOCK_REQUEST_STATUS_DM.state)
            .setPrincipal(MOCK_REQUEST_STATUS_DM.principal)
            .build();
        }).toThrow();

        expect(() => {
          (new RequestStatusBuilder())
            .setRequest(MOCK_REQUEST_STATUS_DM.request)
            .setPrincipal(MOCK_REQUEST_STATUS_DM.principal)
            .build();
        }).toThrow();

        expect(() => {
          (new RequestStatusBuilder())
            .setRequest(MOCK_REQUEST_STATUS_DM.request)
            .setRequestState(MOCK_REQUEST_STATUS_DM.state)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const requestStatus = builder
          .setRequest(MOCK_REQUEST_STATUS_DM.request)
          .setRequestState(MOCK_REQUEST_STATUS_DM.state)
          .setPrincipal(MOCK_REQUEST_STATUS_DM.principal)
          .build();

        expect(requestStatus).toBeInstanceOf(RequestStatus);

        expect(requestStatus.request).toBeDefined();
        expect(requestStatus.request).toEqual(MOCK_REQUEST_STATUS_DM.request);

        expect(requestStatus.state).toBeDefined();
        expect(requestStatus.state).toEqual(MOCK_REQUEST_STATUS_DM.state);

        expect(requestStatus.principal).toBeDefined();
        expect(requestStatus.principal).toEqual(MOCK_REQUEST_STATUS_DM.principal);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_REQUEST_STATUS_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new RequestStatus(
            MOCK_REQUEST_STATUS_DM.request, MOCK_REQUEST_STATUS_DM.state, MOCK_REQUEST_STATUS_DM.principal
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const requestStatus = (new RequestStatusBuilder())
          .setRequest(MOCK_REQUEST_STATUS_DM.request)
          .setRequestState(MOCK_REQUEST_STATUS_DM.state)
          .setPrincipal(MOCK_REQUEST_STATUS_DM.principal)
          .build();

        expect(isValid(requestStatus)).toEqual(true);
      });

    });

    describe('invalid', () => {

      test('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      test('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "request" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_STATUS_DM, { request: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "state" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_STATUS_DM, { state: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_STATUS_DM, { principal: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "request" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new RequestStatus(
              invalidInput, MOCK_REQUEST_STATUS_DM.state, MOCK_REQUEST_STATUS_DM.principal
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "state" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new RequestStatus(
              MOCK_REQUEST_STATUS_DM.request, invalidInput, MOCK_REQUEST_STATUS_DM.principal
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new RequestStatus(
              MOCK_REQUEST_STATUS_DM.request, MOCK_REQUEST_STATUS_DM.state, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
