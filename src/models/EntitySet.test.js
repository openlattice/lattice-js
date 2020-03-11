import { Map, Set, fromJS } from 'immutable';

import {
  EntitySet,
  EntitySetBuilder,
  MOCK_ENTITY_SET,
  MOCK_ENTITY_SET_OBJECT,
  genRandomEntitySet,
  isValidEntitySet as isValid,
} from './EntitySet';

import { EntitySetFlagTypes } from '../constants/types';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';
import {
  testBuilderConstructor,
  testBuilderSetter,
  testBuilderSetterOfTypes,
} from '../utils/testing/ModelTestUtils';

describe('EntitySet', () => {

  describe('EntitySetBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(EntitySet, EntitySetBuilder, MOCK_ENTITY_SET);
    });

    describe('setContacts()', () => {
      const validParams = [MOCK_ENTITY_SET.contacts];
      testBuilderSetter(EntitySetBuilder, 'setContacts', validParams, true);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_ENTITY_SET.description];
      testBuilderSetter(EntitySetBuilder, 'setDescription', validParams, true);
    });

    describe('setEntityTypeId()', () => {
      const validParams = [MOCK_ENTITY_SET.entityTypeId];
      testBuilderSetter(EntitySetBuilder, 'setEntityTypeId', validParams);
    });

    describe('setFlags()', () => {
      testBuilderSetterOfTypes(EntitySetBuilder, 'setFlags', EntitySetFlagTypes, true);
    });

    describe('setId()', () => {
      const validParams = [MOCK_ENTITY_SET.id];
      testBuilderSetter(EntitySetBuilder, 'setId', validParams, true);
    });

    describe('setLinkedEntitySets()', () => {
      const validParams = [MOCK_ENTITY_SET.linkedEntitySets];
      testBuilderSetter(EntitySetBuilder, 'setLinkedEntitySets', validParams, true);
    });

    describe('setName()', () => {
      const validParams = [MOCK_ENTITY_SET.name];
      testBuilderSetter(EntitySetBuilder, 'setName', validParams);
    });

    describe('setOrganizationId()', () => {
      const validParams = [MOCK_ENTITY_SET.organizationId];
      testBuilderSetter(EntitySetBuilder, 'setOrganizationId', validParams, true);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_ENTITY_SET.title];
      testBuilderSetter(EntitySetBuilder, 'setTitle', validParams);
    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setEntityTypeId()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setName()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setTitle()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setContacts()
          (new EntitySetBuilder())
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setDescription()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setFlags()
          (new EntitySetBuilder())
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setId()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setLinkedEntitySets()
          (new EntitySetBuilder())
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setName(MOCK_ENTITY_SET.name)
            .setOrganizationId(MOCK_ENTITY_SET.organizationId)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setOrganizationId()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setFlags(MOCK_ENTITY_SET.flags)
            .setId(MOCK_ENTITY_SET.id)
            .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
            .setName(MOCK_ENTITY_SET.name)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        // omitting setContacts()
        const entitySet = (new EntitySetBuilder())
          .setDescription(MOCK_ENTITY_SET.description)
          .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
          .setFlags(MOCK_ENTITY_SET.flags)
          .setId(MOCK_ENTITY_SET.id)
          .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
          .setName(MOCK_ENTITY_SET.name)
          .setOrganizationId(MOCK_ENTITY_SET.organizationId)
          .setTitle(MOCK_ENTITY_SET.title)
          .build();

        expect(entitySet.contacts).toEqual([]);
      });

      test('should return a valid instance', () => {

        const entitySet = (new EntitySetBuilder())
          .setContacts(MOCK_ENTITY_SET.contacts)
          .setDescription(MOCK_ENTITY_SET.description)
          .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
          .setFlags(MOCK_ENTITY_SET.flags)
          .setId(MOCK_ENTITY_SET.id)
          .setLinkedEntitySets(MOCK_ENTITY_SET.linkedEntitySets)
          .setName(MOCK_ENTITY_SET.name)
          .setOrganizationId(MOCK_ENTITY_SET.organizationId)
          .setTitle(MOCK_ENTITY_SET.title)
          .build();

        expectValidInstance(entitySet);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_SET_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ENTITY_SET)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "contacts" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, contacts: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, contacts: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, entityTypeId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "flags" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, flags: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, flags: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "linkedEntitySets" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, linkedEntitySets: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, linkedEntitySets: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, name: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "organizationId" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, organizationId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET_OBJECT, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "contacts" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: invalidInput,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
          expect(isValid(
            new EntitySet({
              contacts: [invalidInput],
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: invalidInput,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: invalidInput,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "flags" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: invalidInput,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: [invalidInput],
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: invalidInput,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "linkedEntitySets" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: invalidInput,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: [invalidInput],
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: invalidInput,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "organizationId" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: invalidInput,
              title: MOCK_ENTITY_SET.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet({
              contacts: MOCK_ENTITY_SET.contacts,
              description: MOCK_ENTITY_SET.description,
              entityTypeId: MOCK_ENTITY_SET.entityTypeId,
              flags: MOCK_ENTITY_SET.flags,
              id: MOCK_ENTITY_SET.id,
              linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
              name: MOCK_ENTITY_SET.name,
              organizationId: MOCK_ENTITY_SET.organizationId,
              title: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ENTITY_SET.valueOf()).toEqual(
        fromJS({
          contacts: MOCK_ENTITY_SET.contacts,
          description: MOCK_ENTITY_SET.description,
          entityTypeId: MOCK_ENTITY_SET.entityTypeId,
          flags: MOCK_ENTITY_SET.flags,
          id: MOCK_ENTITY_SET.id,
          linkedEntitySets: MOCK_ENTITY_SET.linkedEntitySets,
          name: MOCK_ENTITY_SET.name,
          organizationId: MOCK_ENTITY_SET.organizationId,
          title: MOCK_ENTITY_SET.title,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomEntitySet = genRandomEntitySet();
      const entitySet0 = (new EntitySetBuilder(MOCK_ENTITY_SET)).build();
      const entitySet1 = (new EntitySetBuilder(MOCK_ENTITY_SET)).build();

      const testSet = Set()
        .add(entitySet0)
        .add(randomEntitySet)
        .add(entitySet1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().contacts).toEqual(MOCK_ENTITY_SET.contacts);
      expect(testSet.first().description).toEqual(MOCK_ENTITY_SET.description);
      expect(testSet.first().entityTypeId).toEqual(MOCK_ENTITY_SET.entityTypeId);
      expect(testSet.first().flags).toEqual(MOCK_ENTITY_SET.flags);
      expect(testSet.first().id).toEqual(MOCK_ENTITY_SET.id);
      expect(testSet.first().linkedEntitySets).toEqual(MOCK_ENTITY_SET.linkedEntitySets);
      expect(testSet.first().name).toEqual(MOCK_ENTITY_SET.name);
      expect(testSet.first().organizationId).toEqual(MOCK_ENTITY_SET.organizationId);
      expect(testSet.first().title).toEqual(MOCK_ENTITY_SET.title);

      expect(testSet.last().contacts).toEqual(randomEntitySet.contacts);
      expect(testSet.last().description).toEqual(randomEntitySet.description);
      expect(testSet.last().entityTypeId).toEqual(randomEntitySet.entityTypeId);
      expect(testSet.last().flags).toEqual(randomEntitySet.flags);
      expect(testSet.last().id).toEqual(randomEntitySet.id);
      expect(testSet.last().linkedEntitySets).toEqual(randomEntitySet.linkedEntitySets);
      expect(testSet.last().name).toEqual(randomEntitySet.name);
      expect(testSet.last().organizationId).toEqual(randomEntitySet.organizationId);
      expect(testSet.last().title).toEqual(randomEntitySet.title);
    });

    test('Immutable.Map', () => {

      const randomEntitySet = genRandomEntitySet();
      const entitySet0 = (new EntitySetBuilder(MOCK_ENTITY_SET)).build();
      const entitySet1 = (new EntitySetBuilder(MOCK_ENTITY_SET)).build();

      const testMap = Map()
        .set(entitySet0, 'test_value_1')
        .set(randomEntitySet, 'test_value_2')
        .set(entitySet1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(entitySet0)).toEqual('test_value_3');
      expect(testMap.get(randomEntitySet)).toEqual('test_value_2');
      expect(testMap.get(entitySet1)).toEqual('test_value_3');
    });

  });

});
