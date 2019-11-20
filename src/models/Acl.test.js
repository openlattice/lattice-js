import { Map, Set, fromJS } from 'immutable';

import Acl, { AclBuilder, isValidAcl as isValid } from './Acl';
import { MOCK_ACL, genRandomAcl } from '../utils/testing/MockData';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
} from '../utils/testing/Invalid';

describe('Acl', () => {

  describe('AclBuilder', () => {

    describe('setAclKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AclBuilder()).setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            (new AclBuilder()).setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AclBuilder()).setAclKey([...MOCK_ACL.aclKey, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AclBuilder()).setAclKey();
        }).not.toThrow();
        expect(() => {
          (new AclBuilder()).setAclKey(MOCK_ACL.aclKey);
        }).not.toThrow();
      });

    });

    describe('setAces()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AclBuilder()).setAces(invalidInput);
          }).toThrow();
          expect(() => {
            (new AclBuilder()).setAces([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AclBuilder()).setAces([...MOCK_ACL.aces, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AclBuilder()).setAces();
        }).not.toThrow();
        expect(() => {
          (new AclBuilder()).setAces(MOCK_ACL.aces);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should set required properties that are allowed to be empty', () => {

        const org = (new AclBuilder()).build();

        expect(org.aclKey).toEqual([]);
        expect(org.aces).toEqual([]);
      });

      test('should return a valid instance', () => {

        const acl = (new AclBuilder())
          .setAclKey(MOCK_ACL.aclKey)
          .setAces(MOCK_ACL.aces)
          .build();

        expect(acl).toBeInstanceOf(Acl);

        expect(acl.aces).toBeDefined();
        expect(acl.aclKey).toBeDefined();

        expect(acl.aces).toEqual(MOCK_ACL.aces);
        expect(acl.aclKey).toEqual(MOCK_ACL.aclKey);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new Acl(
            MOCK_ACL.aclKey,
            MOCK_ACL.aces,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclBuilder())
          .setAclKey(MOCK_ACL.aclKey)
          .setAces(MOCK_ACL.aces)
          .build();

        expect(isValid(acl)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "aclKey" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL, aclKey: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACL, aclKey: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "aces" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL, aces: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACL, aces: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Acl(
              invalidInput,
              MOCK_ACL.aces,
            )
          )).toEqual(false);
          expect(isValid(
            new Acl(
              [invalidInput],
              MOCK_ACL.aces,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aces" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Acl(
              MOCK_ACL.aclKey, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Acl(
              MOCK_ACL.aclKey, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const ace = new Acl(
        MOCK_ACL.aclKey,
        MOCK_ACL.aces,
      );
      expect(ace.valueOf()).toEqual(
        fromJS({
          aces: MOCK_ACL.aces.map((a) => a.toObject()),
          aclKey: MOCK_ACL.aclKey,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAcl = genRandomAcl();
      const acl0 = new Acl(
        MOCK_ACL.aclKey,
        MOCK_ACL.aces,
      );
      const acl1 = new Acl(
        MOCK_ACL.aclKey,
        MOCK_ACL.aces,
      );

      const testSet = Set()
        .add(acl0)
        .add(randomAcl)
        .add(acl1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().aces).toEqual(MOCK_ACL.aces);
      expect(testSet.first().aclKey).toEqual(MOCK_ACL.aclKey);

      expect(testSet.last().aces).toEqual(randomAcl.aces);
      expect(testSet.last().aclKey).toEqual(randomAcl.aclKey);
    });

    test('Immutable.Map', () => {

      const randomAcl = genRandomAcl();
      const acl0 = new Acl(
        MOCK_ACL.aclKey,
        MOCK_ACL.aces,
      );
      const acl1 = new Acl(
        MOCK_ACL.aclKey,
        MOCK_ACL.aces,
      );

      const testMap = Map()
        .set(acl0, 'test_value_1')
        .set(randomAcl, 'test_value_2')
        .set(acl1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(acl0)).toEqual('test_value_3');
      expect(testMap.get(randomAcl)).toEqual('test_value_2');
      expect(testMap.get(acl1)).toEqual('test_value_3');
    });

  });

});
