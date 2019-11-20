import { Map, Set, fromJS } from 'immutable';

import Ace, { AceBuilder, isValidAce as isValid } from './Ace';
import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY } from '../utils/testing/Invalid';
import { MOCK_ACE, genRandomAce } from '../utils/testing/MockData';

describe('Ace', () => {

  describe('AceBuilder', () => {

    describe('setPrincipal()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AceBuilder()).setPrincipal();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AceBuilder()).setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AceBuilder()).setPrincipal(MOCK_ACE.principal);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AceBuilder()).setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            (new AceBuilder()).setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AceBuilder()).setPermissions(Object.values(PermissionTypes).push(invalidInput));
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AceBuilder()).setPermissions();
        }).not.toThrow();
        expect(() => {
          (new AceBuilder()).setPermissions([]);
        }).not.toThrow();
        Object.values(PermissionTypes).forEach((type) => {
          expect(() => {
            (new AceBuilder()).setPermissions([type]);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AceBuilder()).build();
        }).toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const ace = (new AceBuilder()).setPrincipal(MOCK_ACE.principal).build();
        expect(ace.permissions).toEqual([]);
      });

      test('should return a valid instance', () => {

        const ace = (new AceBuilder())
          .setPrincipal(MOCK_ACE.principal)
          .setPermissions(MOCK_ACE.permissions)
          .build();

        expect(ace).toBeInstanceOf(Ace);

        expect(ace.permissions).toBeDefined();
        expect(ace.principal).toBeDefined();

        expect(ace.permissions).toEqual(MOCK_ACE.permissions);
        expect(ace.principal).toEqual(MOCK_ACE.principal);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACE)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Ace(
            MOCK_ACE.principal,
            MOCK_ACE.permissions,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const ace = (new AceBuilder())
          .setPrincipal(MOCK_ACE.principal)
          .setPermissions(MOCK_ACE.permissions)
          .build();

        expect(isValid(ace)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACE, principal: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACE, permissions: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACE, permissions: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              invalidInput,
              MOCK_ACE.permissions,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              MOCK_ACE.principal,
              invalidInput,
            )
          )).toEqual(false);
          expect(isValid(
            new Ace(
              MOCK_ACE.principal,
              [invalidInput],
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const ace = new Ace(
        MOCK_ACE.principal,
        MOCK_ACE.permissions,
      );
      expect(ace.valueOf()).toEqual(
        fromJS({
          permissions: MOCK_ACE.permissions,
          principal: MOCK_ACE.principal.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAce = genRandomAce();
      const ace0 = new Ace(
        MOCK_ACE.principal,
        MOCK_ACE.permissions,
      );
      const ace1 = new Ace(
        MOCK_ACE.principal,
        MOCK_ACE.permissions,
      );

      const testSet = Set()
        .add(ace0)
        .add(randomAce)
        .add(ace1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().permissions).toEqual(MOCK_ACE.permissions);
      expect(testSet.first().principal).toEqual(MOCK_ACE.principal);

      expect(testSet.last().permissions).toEqual(randomAce.permissions);
      expect(testSet.last().principal).toEqual(randomAce.principal);
    });

    test('Immutable.Map', () => {

      const randomAce = genRandomAce();
      const ace0 = new Ace(
        MOCK_ACE.principal,
        MOCK_ACE.permissions,
      );
      const ace1 = new Ace(
        MOCK_ACE.principal,
        MOCK_ACE.permissions,
      );

      const testMap = Map()
        .set(ace0, 'test_value_1')
        .set(randomAce, 'test_value_2')
        .set(ace1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(ace0)).toEqual('test_value_3');
      expect(testMap.get(randomAce)).toEqual('test_value_2');
      expect(testMap.get(ace1)).toEqual('test_value_3');
    });

  });

});
