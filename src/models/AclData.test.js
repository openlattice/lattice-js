import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ACL_DATA,
  MOCK_ACL_DATA_OBJECT,
  AclData,
  AclDataBuilder,
  genRandomAclData,
  isValidAclData as isValid,
} from './AclData';

import { ActionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(AclData);

  expect(value.acl).toBeDefined();
  expect(value.action).toBeDefined();

  expect(value.acl).toEqual(MOCK_ACL_DATA.acl);
  expect(value.action).toEqual(MOCK_ACL_DATA.action);
}

describe('AclData', () => {

  describe('AclDataBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new AclDataBuilder(MOCK_ACL_DATA)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new AclDataBuilder({ ...MOCK_ACL_DATA })).build()
        );
        expectValidInstance(
          (new AclDataBuilder(MOCK_ACL_DATA_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new AclDataBuilder(MOCK_ACL_DATA.toImmutable())).build()
        );
        expectValidInstance(
          (new AclDataBuilder(fromJS({ ...MOCK_ACL_DATA }))).build()
        );
        expectValidInstance(
          (new AclDataBuilder(fromJS(MOCK_ACL_DATA_OBJECT))).build()
        );
      });

    });

    describe('setAcl()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AclDataBuilder()).setAcl();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AclDataBuilder()).setAcl(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AclDataBuilder()).setAcl(MOCK_ACL_DATA.acl);
        }).not.toThrow();
      });

    });

    describe('setAction()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AclDataBuilder()).setAction();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AclDataBuilder()).setAction(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        Object.values(ActionTypes).forEach((type) => {
          expect(() => {
            (new AclDataBuilder()).setAction(type);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setAction()
          (new AclDataBuilder())
            .setAcl(MOCK_ACL_DATA.acl)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setAcl()
          (new AclDataBuilder())
            .setAction(MOCK_ACL_DATA.action)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const aclData = (new AclDataBuilder())
          .setAcl(MOCK_ACL_DATA.acl)
          .setAction(MOCK_ACL_DATA.action)
          .build();

        expectValidInstance(aclData);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_DATA_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ACL_DATA)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL_DATA_OBJECT, acl: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "action" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL_DATA_OBJECT, action: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AclData({
              acl: invalidInput,
              action: MOCK_ACL_DATA.action,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "action" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new AclData({
              acl: MOCK_ACL_DATA.acl,
              action: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ACL_DATA.valueOf()).toEqual(
        fromJS({
          acl: MOCK_ACL_DATA.acl.toObject(),
          action: MOCK_ACL_DATA.action,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAclData = genRandomAclData();
      const aclData0 = (new AclDataBuilder(MOCK_ACL_DATA)).build();
      const aclData1 = (new AclDataBuilder(MOCK_ACL_DATA)).build();

      const testSet = Set()
        .add(aclData0)
        .add(randomAclData)
        .add(aclData1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().acl).toEqual(MOCK_ACL_DATA.acl);
      expect(testSet.first().action).toEqual(MOCK_ACL_DATA.action);

      expect(testSet.last().acl).toEqual(randomAclData.acl);
      expect(testSet.last().action).toEqual(randomAclData.action);
    });

    test('Immutable.Map', () => {

      const randomAclData = genRandomAclData();
      const aclData0 = (new AclDataBuilder(MOCK_ACL_DATA)).build();
      const aclData1 = (new AclDataBuilder(MOCK_ACL_DATA)).build();

      const testMap = Map()
        .set(aclData0, 'test_value_1')
        .set(randomAclData, 'test_value_2')
        .set(aclData1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(aclData0)).toEqual('test_value_3');
      expect(testMap.get(randomAclData)).toEqual('test_value_2');
      expect(testMap.get(aclData1)).toEqual('test_value_3');
    });

  });

});
