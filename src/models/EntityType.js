/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isInteger from 'lodash/isInteger';
import {
  Map,
  OrderedSet,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';
import type { FQN, FQNObject } from './FullyQualifiedName';

import Logger from '../utils/Logger';
import SecurableTypes from '../constants/types/SecurableTypes';
import {
  isDefined,
  isEmptyObject,
  isEmptyString,
  isNonEmptyString,
} from '../utils/LangUtils';
import {
  isValidMultimap,
  isValidUUID,
  validateNonEmptyArray,
} from '../utils/ValidationUtils';
import { genRandomString, genRandomUUID } from '../utils/testing/MockUtils';
import type { SecurableType } from '../constants/types/SecurableTypes';

const LOG = new Logger('EntityType');

type EntityTypeObject = {|
  baseType ?:UUID;
  category ?:SecurableType;
  description ?:string;
  id ?:UUID;
  key :UUID[];
  properties :UUID[];
  propertyTags ?:Object;
  schemas :FQNObject[];
  shards ?:number;
  title :string;
  type :FQNObject;
|};

class EntityType {

  baseType :?UUID;
  category :?SecurableType;
  description :?string;
  id :?UUID;
  key :UUID[];
  properties :UUID[];
  propertyTags :?Object;
  schemas :FQN[];
  shards :?number;
  title :string;
  type :FQN;

  constructor(entityType :{
    baseType :?UUID;
    category :?SecurableType;
    description :?string;
    id :?UUID;
    key :UUID[];
    properties :UUID[];
    propertyTags :?Object;
    schemas :FQN[];
    shards :?number;
    title :string;
    type :FQN;
  }) {

    // required properties
    this.key = entityType.key;
    this.properties = entityType.properties;
    this.schemas = entityType.schemas;
    this.title = entityType.title;
    this.type = entityType.type;

    // optional properties
    if (isDefined(entityType.baseType)) {
      this.baseType = entityType.baseType;
    }

    if (isDefined(entityType.category)) {
      this.category = entityType.category;
    }

    if (isDefined(entityType.description)) {
      this.description = entityType.description;
    }

    if (isDefined(entityType.id)) {
      this.id = entityType.id;
    }

    if (isDefined(entityType.propertyTags)) {
      this.propertyTags = entityType.propertyTags;
    }

    if (isDefined(entityType.shards)) {
      this.shards = entityType.shards;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :EntityTypeObject {

    // required properties
    const entityTypeObj :EntityTypeObject = {
      key: this.key,
      properties: this.properties,
      schemas: this.schemas.map((fqn :FQN) => fqn.toObject()),
      title: this.title,
      type: this.type.toObject(),
    };

    // optional properties
    if (isDefined(this.id)) {
      entityTypeObj.id = this.id;
    }

    if (isDefined(this.description)) {
      entityTypeObj.description = this.description;
    }

    if (isDefined(this.baseType)) {
      entityTypeObj.baseType = this.baseType;
    }

    if (isDefined(this.category)) {
      entityTypeObj.category = this.category;
    }

    if (isDefined(this.propertyTags)) {
      entityTypeObj.propertyTags = this.propertyTags;
    }

    if (isDefined(this.shards)) {
      entityTypeObj.shards = this.shards;
    }

    return entityTypeObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class EntityTypeBuilder {

  baseType :?UUID;
  category :?SecurableType;
  description :?string;
  id :?UUID;
  key :UUID[];
  properties :UUID[];
  propertyTags :?Object; // LinkedHashMultimap<UUID, String>
  schemas :FQN[];
  shards :?number;
  title :string;
  type :FQN;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setBaseType(value.get('baseType'));
      this.setCategory(value.get('category'));
      this.setDescription(value.get('description'));
      this.setId(value.get('id'));
      this.setKey(value.get('key'));
      this.setPropertyTags(value.get('propertyTags'));
      this.setPropertyTypes(value.get('properties'));
      this.setSchemas(value.get('schemas'));
      this.setShards(value.get('shards'));
      this.setTitle(value.get('title'));
      this.setType(value.get('type'));
    }
    else if (isDefined(value)) {
      this.setBaseType(value.baseType);
      this.setCategory(value.category);
      this.setDescription(value.description);
      this.setId(value.id);
      this.setKey(value.key);
      this.setPropertyTags(value.propertyTags);
      this.setPropertyTypes(value.properties);
      this.setSchemas(value.schemas);
      this.setShards(value.shards);
      this.setTitle(value.title);
      this.setType(value.type);
    }
  }

  setBaseType(baseType :?UUID) :EntityTypeBuilder {

    if (!isDefined(baseType) || isEmptyString(baseType)) {
      return this;
    }

    if (!isValidUUID(baseType)) {
      throw new Error('invalid parameter: "baseType" must be a valid UUID');
    }

    this.baseType = baseType;
    return this;
  }

  setCategory(category :?SecurableType) :EntityTypeBuilder {

    if (!isDefined(category) || isEmptyString(category)) {
      return this;
    }

    if (!SecurableTypes[category]) {
      throw new Error('invalid parameter: "category" must be a valid SecurableType');
    }

    this.category = category;
    return this;
  }

  setDescription(description :?string) :EntityTypeBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: "description" must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setId(entityTypeId :?UUID) :EntityTypeBuilder {

    if (!isDefined(entityTypeId) || isEmptyString(entityTypeId)) {
      return this;
    }

    if (!isValidUUID(entityTypeId)) {
      throw new Error('invalid parameter: "entityTypeId" must be a valid UUID');
    }

    this.id = entityTypeId;
    return this;
  }

  setKey(key :$ReadOnlyArray<UUID>) :EntityTypeBuilder {

    if (!isDefined(key)) {
      return this;
    }

    if (!isArray(key) && !isCollection(key)) {
      throw new Error('invalid parameter: "key" must be an array');
    }

    const set = OrderedSet(key);
    if (set.every(isValidUUID)) {
      this.key = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "key" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setPropertyTags(propertyTags :?Object) :EntityTypeBuilder {

    if (!isDefined(propertyTags)) {
      return this;
    }

    let tags = propertyTags;
    if (isCollection(tags)) {
      // $FlowFixMe
      tags = tags.toJS();
    }

    if (isEmptyObject(tags)) {
      return this;
    }

    if (!isValidMultimap(tags, isValidUUID)) {
      throw new Error('invalid parameter: "propertyTags" must be a valid multimap object');
    }

    this.propertyTags = tags;
    return this;
  }

  setPropertyTypes(propertyTypes :$ReadOnlyArray<UUID>) :EntityTypeBuilder {

    if (!isDefined(propertyTypes)) {
      return this;
    }

    if (!isArray(propertyTypes) && !isCollection(propertyTypes)) {
      throw new Error('invalid parameter: "propertyTypes" must be an array');
    }

    const set = OrderedSet(propertyTypes);
    if (set.every(isValidUUID)) {
      this.properties = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "propertyTypes" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setSchemas(schemas :$ReadOnlyArray<FQN | FQNObject>) :EntityTypeBuilder {

    if (!isDefined(schemas)) {
      return this;
    }

    if (!isArray(schemas) && !isCollection(schemas)) {
      throw new Error('invalid parameter: "schemas" must be an array');
    }

    try {
      this.schemas = Set(schemas).map((fqn) => FullyQualifiedName.of(fqn)).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "schemas" must be a non-empty array of valid FQNs');
    }

    return this;
  }

  setShards(shards :?number) :EntityTypeBuilder {

    if (!isDefined(shards)) {
      return this;
    }

    if (!isInteger(shards)) {
      throw new Error('invalid parameter: "shards" must be an integer');
    }

    // com.openlattice.edm.type.EntityType
    if (shards <= 0 || shards >= 20) {
      throw new Error('invalid parameter: "shards" must be between 0 and 20');
    }

    this.shards = shards;
    return this;
  }

  setTitle(title :string) :EntityTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: "title" must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setType(entityTypeFQN :FQN | FQNObject | string) :EntityTypeBuilder {

    this.type = FullyQualifiedName.of(entityTypeFQN);
    return this;
  }

  build() :EntityType {

    if (!this.type) {
      throw new Error('missing property: "type" is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: "title" is a required property');
    }

    if (!this.key) {
      this.key = [];
    }

    if (!this.properties) {
      this.properties = [];
    }

    if (!this.propertyTags) {
      this.propertyTags = {};
    }

    if (!this.schemas) {
      this.schemas = [];
    }

    return new EntityType({
      baseType: this.baseType,
      category: this.category,
      description: this.description,
      id: this.id,
      key: this.key,
      properties: this.properties,
      propertyTags: this.propertyTags,
      schemas: this.schemas,
      shards: this.shards,
      title: this.title,
      type: this.type,
    });
  }
}

function isValidEntityType(value :any) :boolean {

  if (!isDefined(value)) {
    LOG.error('invalid parameter: "value" is not defined');
    return false;
  }

  try {
    (new EntityTypeBuilder(value)).build();
    return true;
  }
  catch (e) {
    LOG.error(e.message, value);
    return false;
  }
}

function isValidEntityTypeArray(values :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(values, isValidEntityType);
}

export {
  EntityType,
  EntityTypeBuilder,
  isValidEntityType,
  isValidEntityTypeArray,
};

export type {
  EntityTypeObject,
};

/*
 *
 * testing
 *
 */

const MOCK_ENTITY_TYPE = new EntityTypeBuilder()
  .setBaseType('9a768c9b-b76f-4fa1-be60-0178695cdbc3')
  .setCategory(SecurableTypes.EntityType)
  .setDescription('MockEntityTypeDescription')
  .setId('ec6865e6-e60e-424b-a071-6a9c1603d735')
  .setKey(['8f79e123-3411-4099-a41f-88e5d22d0e8d'])
  .setPropertyTags({
    '8f79e123-3411-4099-a41f-88e5d22d0e8d': ['TAG_0', 'TAG_1'],
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': ['TAG_0'],
  })
  .setPropertyTypes(['8f79e123-3411-4099-a41f-88e5d22d0e8d', 'e39dfdfa-a3e6-4f1f-b54b-646a723c3085'])
  .setSchemas([FullyQualifiedName.of('mock.schema')])
  .setShards(1)
  .setTitle('MockEntityTypeTitle')
  .setType(FullyQualifiedName.of('mock.entitytype'))
  .build();

const MOCK_ENTITY_TYPE_OBJECT = MOCK_ENTITY_TYPE.toObject();

function genRandomEntityType() {
  return new EntityTypeBuilder()
    .setBaseType(genRandomUUID())
    .setCategory(SecurableTypes.EntityType)
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setKey([genRandomUUID(), genRandomUUID()])
    .setPropertyTags({
      [genRandomUUID()]: [genRandomString(), genRandomString()],
      [genRandomUUID()]: [genRandomString()],
    })
    .setPropertyTypes([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setSchemas([FullyQualifiedName.of(genRandomString(), genRandomString())])
    .setShards(1)
    .setTitle(genRandomString())
    .setType(FullyQualifiedName.of(genRandomString(), genRandomString()))
    .build();
}

export {
  MOCK_ENTITY_TYPE,
  MOCK_ENTITY_TYPE_OBJECT,
  genRandomEntityType,
};
