import { Map, Set, fromJS } from 'immutable';
import EntitySet, { EntitySetBuilder, isValidEntitySet as isValid } from './EntitySet';
import { MOCK_ENTITY_SET, genRandomEntitySet } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

describe('EntitySet', () => {

  describe('EntitySetBuilder', () => {

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new EntitySetBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new EntitySetBuilder()).setId(MOCK_ENTITY_SET.id);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeId()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setEntityTypeId();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setEntityTypeId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setEntityTypeId(MOCK_ENTITY_SET.entityTypeId);
        }).not.toThrow();
      });

    });

    describe('setName()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setName();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setName(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setName(MOCK_ENTITY_SET.name);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setTitle(MOCK_ENTITY_SET.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new EntitySetBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new EntitySetBuilder()).setDescription(MOCK_ENTITY_SET.description);
        }).not.toThrow();
      });

    });

    describe('setContacts()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setContacts(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntitySetBuilder()).setContacts([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntitySetBuilder()).setContacts(Object.values(MOCK_ENTITY_SET.contacts).push(invalidInput));
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntitySetBuilder()).setContacts();
        }).not.toThrow();
        expect(() => {
          (new EntitySetBuilder()).setContacts([]);
        }).not.toThrow();
        expect(() => {
          (new EntitySetBuilder()).setContacts(MOCK_ENTITY_SET.contacts);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setEntityTypeId()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setId(MOCK_ENTITY_SET.id)
            .setName(MOCK_ENTITY_SET.name)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setName()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setId(MOCK_ENTITY_SET.id)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setTitle()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setId(MOCK_ENTITY_SET.id)
            .setName(MOCK_ENTITY_SET.name)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setContacts()
          (new EntitySetBuilder())
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setId(MOCK_ENTITY_SET.id)
            .setName(MOCK_ENTITY_SET.name)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setDescription()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
            .setId(MOCK_ENTITY_SET.id)
            .setName(MOCK_ENTITY_SET.name)
            .setTitle(MOCK_ENTITY_SET.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setId()
          (new EntitySetBuilder())
            .setContacts(MOCK_ENTITY_SET.contacts)
            .setDescription(MOCK_ENTITY_SET.description)
            .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
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
          .setId(MOCK_ENTITY_SET.id)
          .setName(MOCK_ENTITY_SET.name)
          .setTitle(MOCK_ENTITY_SET.title)
          .build();

        expect(entitySet.contacts).toEqual([]);
      });

      test('should return a valid instance', () => {

        const entitySet = (new EntitySetBuilder())
          .setContacts(MOCK_ENTITY_SET.contacts)
          .setDescription(MOCK_ENTITY_SET.description)
          .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
          .setId(MOCK_ENTITY_SET.id)
          .setName(MOCK_ENTITY_SET.name)
          .setTitle(MOCK_ENTITY_SET.title)
          .build();

        expect(entitySet).toBeInstanceOf(EntitySet);

        expect(entitySet.contacts).toBeDefined();
        expect(entitySet.description).toBeDefined();
        expect(entitySet.entityTypeId).toBeDefined();
        expect(entitySet.id).toBeDefined();
        expect(entitySet.name).toBeDefined();
        expect(entitySet.title).toBeDefined();

        expect(entitySet.contacts).toEqual(MOCK_ENTITY_SET.contacts);
        expect(entitySet.description).toEqual(MOCK_ENTITY_SET.description);
        expect(entitySet.entityTypeId).toEqual(MOCK_ENTITY_SET.entityTypeId);
        expect(entitySet.id).toEqual(MOCK_ENTITY_SET.id);
        expect(entitySet.name).toEqual(MOCK_ENTITY_SET.name);
        expect(entitySet.title).toEqual(MOCK_ENTITY_SET.title);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_SET)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new EntitySet(
            MOCK_ENTITY_SET.id,
            MOCK_ENTITY_SET.entityTypeId,
            MOCK_ENTITY_SET.name,
            MOCK_ENTITY_SET.title,
            MOCK_ENTITY_SET.description,
            MOCK_ENTITY_SET.contacts,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const entitySet = (new EntitySetBuilder())
          .setContacts(MOCK_ENTITY_SET.contacts)
          .setDescription(MOCK_ENTITY_SET.description)
          .setEntityTypeId(MOCK_ENTITY_SET.entityTypeId)
          .setId(MOCK_ENTITY_SET.id)
          .setName(MOCK_ENTITY_SET.name)
          .setTitle(MOCK_ENTITY_SET.title)
          .build();

        expect(isValid(entitySet)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET, entityTypeId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET, name: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "contacts" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_SET, contacts: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ENTITY_SET, contacts: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              invalidInput,
              MOCK_ENTITY_SET.entityTypeId,
              MOCK_ENTITY_SET.name,
              MOCK_ENTITY_SET.title,
              MOCK_ENTITY_SET.description,
              MOCK_ENTITY_SET.contacts,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET.id,
              invalidInput,
              MOCK_ENTITY_SET.name,
              MOCK_ENTITY_SET.title,
              MOCK_ENTITY_SET.description,
              MOCK_ENTITY_SET.contacts,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET.id,
              MOCK_ENTITY_SET.entityTypeId,
              invalidInput,
              MOCK_ENTITY_SET.title,
              MOCK_ENTITY_SET.description,
              MOCK_ENTITY_SET.contacts,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET.id,
              MOCK_ENTITY_SET.entityTypeId,
              MOCK_ENTITY_SET.name,
              invalidInput,
              MOCK_ENTITY_SET.description,
              MOCK_ENTITY_SET.contacts,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET.id,
              MOCK_ENTITY_SET.entityTypeId,
              MOCK_ENTITY_SET.name,
              MOCK_ENTITY_SET.title,
              invalidInput,
              MOCK_ENTITY_SET.contacts,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "contacts" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET.id,
              MOCK_ENTITY_SET.entityTypeId,
              MOCK_ENTITY_SET.name,
              MOCK_ENTITY_SET.title,
              MOCK_ENTITY_SET.description,
              invalidInput,
            )
          )).toEqual(false);
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET.id,
              MOCK_ENTITY_SET.entityTypeId,
              MOCK_ENTITY_SET.name,
              MOCK_ENTITY_SET.title,
              MOCK_ENTITY_SET.description,
              [invalidInput],
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const entitySet = new EntitySet(
        MOCK_ENTITY_SET.id,
        MOCK_ENTITY_SET.entityTypeId,
        MOCK_ENTITY_SET.name,
        MOCK_ENTITY_SET.title,
        MOCK_ENTITY_SET.description,
        MOCK_ENTITY_SET.contacts,
      );
      expect(entitySet.valueOf()).toEqual(
        fromJS({
          contacts: MOCK_ENTITY_SET.contacts,
          description: MOCK_ENTITY_SET.description,
          entityTypeId: MOCK_ENTITY_SET.entityTypeId,
          id: MOCK_ENTITY_SET.id,
          name: MOCK_ENTITY_SET.name,
          title: MOCK_ENTITY_SET.title,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomEntitySet = genRandomEntitySet();
      const entitySet0 = new EntitySet(
        MOCK_ENTITY_SET.id,
        MOCK_ENTITY_SET.entityTypeId,
        MOCK_ENTITY_SET.name,
        MOCK_ENTITY_SET.title,
        MOCK_ENTITY_SET.description,
        MOCK_ENTITY_SET.contacts,
      );
      const entitySet1 = new EntitySet(
        MOCK_ENTITY_SET.id,
        MOCK_ENTITY_SET.entityTypeId,
        MOCK_ENTITY_SET.name,
        MOCK_ENTITY_SET.title,
        MOCK_ENTITY_SET.description,
        MOCK_ENTITY_SET.contacts,
      );

      const testSet = Set()
        .add(entitySet0)
        .add(randomEntitySet)
        .add(entitySet1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().contacts).toEqual(MOCK_ENTITY_SET.contacts);
      expect(testSet.first().description).toEqual(MOCK_ENTITY_SET.description);
      expect(testSet.first().entityTypeId).toEqual(MOCK_ENTITY_SET.entityTypeId);
      expect(testSet.first().id).toEqual(MOCK_ENTITY_SET.id);
      expect(testSet.first().name).toEqual(MOCK_ENTITY_SET.name);
      expect(testSet.first().title).toEqual(MOCK_ENTITY_SET.title);

      expect(testSet.last().contacts).toEqual(randomEntitySet.contacts);
      expect(testSet.last().description).toEqual(randomEntitySet.description);
      expect(testSet.last().entityTypeId).toEqual(randomEntitySet.entityTypeId);
      expect(testSet.last().id).toEqual(randomEntitySet.id);
      expect(testSet.last().name).toEqual(randomEntitySet.name);
      expect(testSet.last().title).toEqual(randomEntitySet.title);
    });

    test('Immutable.Map', () => {

      const randomEntitySet = genRandomEntitySet();
      const entitySet0 = new EntitySet(
        MOCK_ENTITY_SET.id,
        MOCK_ENTITY_SET.entityTypeId,
        MOCK_ENTITY_SET.name,
        MOCK_ENTITY_SET.title,
        MOCK_ENTITY_SET.description,
        MOCK_ENTITY_SET.contacts,
      );
      const entitySet1 = new EntitySet(
        MOCK_ENTITY_SET.id,
        MOCK_ENTITY_SET.entityTypeId,
        MOCK_ENTITY_SET.name,
        MOCK_ENTITY_SET.title,
        MOCK_ENTITY_SET.description,
        MOCK_ENTITY_SET.contacts,
      );

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
