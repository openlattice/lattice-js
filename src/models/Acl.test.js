import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ACL,
  MOCK_ACL_OBJECT,
  Acl,
  AclBuilder,
  genRandomAcl,
  isValidAcl as isValid,
} from './Acl';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';
import {
  testBuilderConstructor,
  testBuilderSetter,
} from '../utils/testing/ModelTestUtils';

describe('Acl', () => {

  describe('AclBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Acl, AclBuilder, MOCK_ACL);
    });

    describe('setAclKey()', () => {
      const validParams = [MOCK_ACL.aclKey];
      testBuilderSetter(AclBuilder, 'setAclKey', validParams);
    });

    describe('setAces()', () => {
      const validParams = [MOCK_ACL.aces];
      testBuilderSetter(AclBuilder, 'setAces', validParams, true);
    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {
        expect(() => {
          (new AclBuilder()).build();
        }).toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const acl = (new AclBuilder())
          .setAclKey(MOCK_ACL.aclKey)
          .build();

        expect(acl.aces).toEqual([]);
      });

      test('should return a valid instance', () => {

        const acl = (new AclBuilder())
          .setAclKey(MOCK_ACL.aclKey)
          .setAces(MOCK_ACL.aces)
          .build();

        expectValidInstance(acl);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ACL)).toEqual(true);
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
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL_OBJECT, aclKey: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACL_OBJECT, aclKey: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "aces" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL_OBJECT, aces: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACL_OBJECT, aces: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Acl({
              aces: MOCK_ACL.aces,
              aclKey: invalidInput,
            })
          )).toEqual(false);
          expect(isValid(
            new Acl({
              aces: MOCK_ACL.aces,
              aclKey: [invalidInput],
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aces" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Acl({
              aces: invalidInput,
              aclKey: MOCK_ACL.aclKey,
            })
          )).toEqual(false);
          expect(isValid(
            new Acl({
              aces: [invalidInput],
              aclKey: MOCK_ACL.aclKey,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ACL.valueOf()).toEqual(
        fromJS({
          aces: MOCK_ACL.aces.map((a) => a.toObject()),
          aclKey: MOCK_ACL.aclKey,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAcl = genRandomAcl();
      const acl0 = (new AclBuilder(MOCK_ACL)).build();
      const acl1 = (new AclBuilder(MOCK_ACL)).build();

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
      const acl0 = (new AclBuilder(MOCK_ACL)).build();
      const acl1 = (new AclBuilder(MOCK_ACL)).build();

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
