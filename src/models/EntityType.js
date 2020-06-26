/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  OrderedSet,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import FQN from './FQN';
import type { FQNObject } from './FQN';

import Logger from '../utils/Logger';
import SecurableTypes from '../constants/types/SecurableTypes';
import {
  isDefined,
  isEmptyObject,
  isEmptyString,
  isNonEmptyString,
} from '../utils/LangUtils';
import { isValidModel, isValidMultimap, isValidUUID } from '../utils/ValidationUtils';
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
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :EntityTypeObject {

    // required properties
    const entityTypeObj :EntityTypeObject = {
      key: this.key,
      properties: this.properties,
      schemas: this.schemas.map((fqn) => fqn.toObject()),
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
      this.schemas = Set(schemas).map((fqn) => FQN.of(fqn)).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "schemas" must be a non-empty array of valid FQNs');
    }

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

    this.type = FQN.of(entityTypeFQN);
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
      title: this.title,
      type: this.type,
    });
  }
}

const isValidEntityType = (value :any) :boolean => isValidModel(value, EntityTypeBuilder, LOG);

export {
  EntityType,
  EntityTypeBuilder,
  isValidEntityType,
};

export type {
  EntityTypeObject,
};
