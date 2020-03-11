/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_PROPERTY_TYPE,
  MOCK_PROPERTY_TYPE_OBJECT,
  PropertyType,
  PropertyTypeBuilder,
  genRandomPropertyType,
  isValidPropertyType as isValid,
} from './PropertyType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
  testBuilderSetType,
} from '../utils/testing/ModelTestUtils';
import { AnalyzerTypes, IndexTypes } from '../constants/types';

describe('PropertyType', () => {

  describe('PropertyTypeBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(PropertyType, PropertyTypeBuilder, MOCK_PROPERTY_TYPE);
    });

    describe('setAnalyzer()', () => {
      testBuilderSetType(PropertyTypeBuilder, 'setAnalyzer', AnalyzerTypes, true);
    });

    describe('setDataType()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.datatype];
      testBuilderSet(PropertyTypeBuilder, 'setDataType', validParams);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.description];
      testBuilderSet(PropertyTypeBuilder, 'setDescription', validParams, true);
    });

    describe('setEnumValues()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.enumValues];
      testBuilderSet(PropertyTypeBuilder, 'setEnumValues', validParams, true);
    });

    describe('setId()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.id];
      testBuilderSet(PropertyTypeBuilder, 'setId', validParams, true);
    });

    describe('setIndexType()', () => {
      testBuilderSetType(PropertyTypeBuilder, 'setIndexType', IndexTypes, true);
    });

    describe('setMultiValued()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.multiValued];
      testBuilderSet(PropertyTypeBuilder, 'setMultiValued', validParams, true);
    });

    describe('setPII()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.pii];
      testBuilderSet(PropertyTypeBuilder, 'setPII', validParams, true);
    });

    describe('setSchemas()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.schemas];
      testBuilderSet(PropertyTypeBuilder, 'setSchemas', validParams, true);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.title];
      testBuilderSet(PropertyTypeBuilder, 'setTitle', validParams);
    });

    describe('setType()', () => {
      const validParams = [MOCK_PROPERTY_TYPE.type];
      testBuilderSet(PropertyTypeBuilder, 'setType', validParams);
    });

    describe('build()', () => {

      test('should set required properties that are allowed to be empty', () => {

        const org = (new PropertyTypeBuilder())
          .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
          .setDataType(MOCK_PROPERTY_TYPE.datatype)
          .setDescription(MOCK_PROPERTY_TYPE.description)
          .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
          .setId(MOCK_PROPERTY_TYPE.id)
          .setIndexType(MOCK_PROPERTY_TYPE.indexType)
          .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
          .setPII(MOCK_PROPERTY_TYPE.pii)
          .setTitle(MOCK_PROPERTY_TYPE.title)
          .setType(MOCK_PROPERTY_TYPE.type)
          .build();

        expect(org.schemas).toEqual([]);
      });

      testBuilderBuild(PropertyType, PropertyTypeBuilder, MOCK_PROPERTY_TYPE, {
        optional: {
          setAnalyzer: MOCK_PROPERTY_TYPE.analyzer,
          setDescription: MOCK_PROPERTY_TYPE.description,
          setEnumValues: MOCK_PROPERTY_TYPE.enumValues,
          setId: MOCK_PROPERTY_TYPE.id,
          setIndexType: MOCK_PROPERTY_TYPE.indexType,
          setMultiValued: MOCK_PROPERTY_TYPE.multiValued,
          setPII: MOCK_PROPERTY_TYPE.pii,
          setSchemas: MOCK_PROPERTY_TYPE.schemas,
        },
        required: {
          setDataType: MOCK_PROPERTY_TYPE.datatype,
          setTitle: MOCK_PROPERTY_TYPE.title,
          setType: MOCK_PROPERTY_TYPE.type,
        },
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PROPERTY_TYPE.toObject())).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_PROPERTY_TYPE)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "analyzer" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, analyzer: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, datatype: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "enumValues" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, enumValues: invalidInput })).toEqual(false);
        });
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, enumValues: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "indexType" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, indexType: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "multiValued" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, multiValued: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "pii" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, pii: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, schemas: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, schemas: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PROPERTY_TYPE_OBJECT, type: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "analyzer" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: invalidInput,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: invalidInput,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: invalidInput,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "enumValues" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: invalidInput,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: invalidInput,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "indexType" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: invalidInput,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "multiValued" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: invalidInput,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "pii" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: invalidInput,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: invalidInput,
              title: MOCK_PROPERTY_TYPE.title,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: invalidInput,
              type: MOCK_PROPERTY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType({
              analyzer: MOCK_PROPERTY_TYPE.analyzer,
              datatype: MOCK_PROPERTY_TYPE.datatype,
              description: MOCK_PROPERTY_TYPE.description,
              enumValues: MOCK_PROPERTY_TYPE.enumValues,
              id: MOCK_PROPERTY_TYPE.id,
              indexType: MOCK_PROPERTY_TYPE.indexType,
              multiValued: MOCK_PROPERTY_TYPE.multiValued,
              pii: MOCK_PROPERTY_TYPE.pii,
              schemas: MOCK_PROPERTY_TYPE.schemas,
              title: MOCK_PROPERTY_TYPE.title,
              type: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_PROPERTY_TYPE.valueOf()).toEqual(
        fromJS({
          analyzer: MOCK_PROPERTY_TYPE.analyzer,
          datatype: MOCK_PROPERTY_TYPE.datatype,
          description: MOCK_PROPERTY_TYPE.description,
          enumValues: MOCK_PROPERTY_TYPE.enumValues,
          id: MOCK_PROPERTY_TYPE.id,
          indexType: MOCK_PROPERTY_TYPE.indexType,
          multiValued: MOCK_PROPERTY_TYPE.multiValued,
          pii: MOCK_PROPERTY_TYPE.pii,
          schemas: MOCK_PROPERTY_TYPE.schemas.map((fqn) => fqn.toObject()),
          title: MOCK_PROPERTY_TYPE.title,
          type: MOCK_PROPERTY_TYPE.type.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomPropertyType = genRandomPropertyType();
      const propertyType0 = new PropertyType({ ...MOCK_PROPERTY_TYPE });
      const propertyType1 = new PropertyType({ ...MOCK_PROPERTY_TYPE });

      const testSet = Set()
        .add(propertyType0)
        .add(randomPropertyType)
        .add(propertyType1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().analyzer).toEqual(MOCK_PROPERTY_TYPE.analyzer);
      expect(testSet.first().datatype).toEqual(MOCK_PROPERTY_TYPE.datatype);
      expect(testSet.first().description).toEqual(MOCK_PROPERTY_TYPE.description);
      expect(testSet.first().enumValues).toEqual(MOCK_PROPERTY_TYPE.enumValues);
      expect(testSet.first().id).toEqual(MOCK_PROPERTY_TYPE.id);
      expect(testSet.first().indexType).toEqual(MOCK_PROPERTY_TYPE.indexType);
      expect(testSet.first().multiValued).toEqual(MOCK_PROPERTY_TYPE.multiValued);
      expect(testSet.first().pii).toEqual(MOCK_PROPERTY_TYPE.pii);
      expect(testSet.first().schemas).toEqual(MOCK_PROPERTY_TYPE.schemas);
      expect(testSet.first().title).toEqual(MOCK_PROPERTY_TYPE.title);
      expect(testSet.first().type).toEqual(MOCK_PROPERTY_TYPE.type);

      expect(testSet.last().analyzer).toEqual(randomPropertyType.analyzer);
      expect(testSet.last().datatype).toEqual(randomPropertyType.datatype);
      expect(testSet.last().description).toEqual(randomPropertyType.description);
      expect(testSet.last().enumValues).toEqual(randomPropertyType.enumValues);
      expect(testSet.last().id).toEqual(randomPropertyType.id);
      expect(testSet.last().indexType).toEqual(randomPropertyType.indexType);
      expect(testSet.last().multiValued).toEqual(randomPropertyType.multiValued);
      expect(testSet.last().pii).toEqual(randomPropertyType.pii);
      expect(testSet.last().schemas).toEqual(randomPropertyType.schemas);
      expect(testSet.last().title).toEqual(randomPropertyType.title);
      expect(testSet.last().type).toEqual(randomPropertyType.type);
    });

    test('Immutable.Map', () => {

      const randomPropertyType = genRandomPropertyType();
      const propertyType0 = new PropertyType({ ...MOCK_PROPERTY_TYPE });
      const propertyType1 = new PropertyType({ ...MOCK_PROPERTY_TYPE });

      const testMap = Map()
        .set(propertyType0, 'test_value_1')
        .set(randomPropertyType, 'test_value_2')
        .set(propertyType1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(propertyType0)).toEqual('test_value_3');
      expect(testMap.get(randomPropertyType)).toEqual('test_value_2');
      expect(testMap.get(propertyType1)).toEqual('test_value_3');
    });

  });

});
