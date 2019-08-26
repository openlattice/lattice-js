import { Map, Set, fromJS } from 'immutable';

import AclData, { AclDataBuilder, isValidAclData as isValid } from './AclData';
import { ActionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ACL_DATA, genRandomAclData } from '../utils/testing/MockDataModels';

describe('AclData', () => {

  describe('AclDataBuilder', () => {

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
          (new AclDataBuilder())
            .setAcl(MOCK_ACL_DATA.acl)
            .build();
        }).toThrow();

        expect(() => {
          (new AclDataBuilder())
            .setAction(MOCK_ACL_DATA.action)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const acl = (new AclDataBuilder())
          .setAcl(MOCK_ACL_DATA.acl)
          .setAction(MOCK_ACL_DATA.action)
          .build();

        expect(acl).toBeInstanceOf(AclData);

        expect(acl.acl).toBeDefined();
        expect(acl.action).toBeDefined();

        expect(acl.acl).toEqual(MOCK_ACL_DATA.acl);
        expect(acl.action).toEqual(MOCK_ACL_DATA.action);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_DATA)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new AclData(
            MOCK_ACL_DATA.acl,
            MOCK_ACL_DATA.action,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclDataBuilder())
          .setAcl(MOCK_ACL_DATA.acl)
          .setAction(MOCK_ACL_DATA.action)
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

      test('should return false when given an object literal with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL_DATA, acl: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "action" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACL_DATA, action: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AclData(
              invalidInput,
              MOCK_ACL_DATA.action,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "action" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new AclData(
              MOCK_ACL_DATA.acl,
              invalidInput,
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const aclData = new AclData(
        MOCK_ACL_DATA.acl,
        MOCK_ACL_DATA.action,
      );
      expect(aclData.valueOf()).toEqual(
        fromJS({
          acl: MOCK_ACL_DATA.acl.toObject(),
          action: MOCK_ACL_DATA.action,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAclData = genRandomAclData();
      const aclData0 = new AclData(
        MOCK_ACL_DATA.acl,
        MOCK_ACL_DATA.action,
      );
      const aclData1 = new AclData(
        MOCK_ACL_DATA.acl,
        MOCK_ACL_DATA.action,
      );

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
      const aclData0 = new AclData(
        MOCK_ACL_DATA.acl,
        MOCK_ACL_DATA.action,
      );
      const aclData1 = new AclData(
        MOCK_ACL_DATA.acl,
        MOCK_ACL_DATA.action,
      );

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
