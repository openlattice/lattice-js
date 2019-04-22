/*
 * @flow
 */

import has from 'lodash/has';
import isInteger from 'lodash/isInteger';
import { Map, Set, fromJS } from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';
import SecurableTypes from '../constants/types/SecurableTypes';
import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidFqnArray,
  isValidMultimap,
  isValidUuid,
  isValidUuidArray,
  validateNonEmptyArray,
} from '../utils/ValidationUtils';

import type { FQN, FQNObject } from './FullyQualifiedName';
import type { SecurableType } from '../constants/types/SecurableTypes';

const LOG = new Logger('EntityType');

type EntityTypeObject = {|
  baseType ?:UUID;
  category ?:SecurableType;
  description ?:string;
  id ?:UUID;
  key :UUID[];
  properties :UUID[];
  propertyTags ?:Object; // LinkedHashMultimap<UUID, String>
  schemas :FQNObject[];
  shards ?:number;
  title :string;
  type :FQNObject;
|};

/**
 * @class EntityType
 * @memberof lattice
 */
export default class EntityType {

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

  constructor(
    id :?UUID,
    type :FQN,
    title :string,
    description :?string,
    schemas :FQN[],
    key :UUID[],
    properties :UUID[],
    baseType :?UUID,
    category :?SecurableType,
    propertyTags :?Object,
    shards :?number,
  ) {

    // required properties
    this.key = key;
    this.properties = properties;
    this.schemas = schemas;
    this.title = title;
    this.type = type;

    // optional properties
    if (isDefined(baseType)) {
      this.baseType = baseType;
    }

    if (isDefined(category)) {
      this.category = category;
    }

    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(propertyTags)) {
      this.propertyTags = propertyTags;
    }

    if (isDefined(shards)) {
      this.shards = shards;
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

/**
 * @class EntityTypeBuilder
 * @memberof lattice
 */
export class EntityTypeBuilder {

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

  setId(entityTypeId :?UUID) :EntityTypeBuilder {

    if (!isDefined(entityTypeId) || isEmptyString(entityTypeId)) {
      return this;
    }

    if (!isValidUuid(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.id = entityTypeId;
    return this;
  }

  setType(entityTypeFqn :FQN | FQNObject | string) :EntityTypeBuilder {

    if (!FullyQualifiedName.isValid(entityTypeFqn)) {
      throw new Error('invalid parameter: entityTypeFqn must be a valid FQN');
    }

    this.type = new FullyQualifiedName(entityTypeFqn);
    return this;
  }

  setTitle(title :string) :EntityTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :?string) :EntityTypeBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setSchemas(schemas :$ReadOnlyArray<FQN | FQNObject>) :EntityTypeBuilder {

    if (!isDefined(schemas) || isEmptyArray(schemas)) {
      return this;
    }

    if (!isValidFqnArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array of valid FQNs');
    }

    this.schemas = Set().withMutations((set :Set<FQN>) => {
      schemas.forEach((schemaFQN :FQN | FQNObject) => {
        set.add(new FullyQualifiedName(schemaFQN));
      });
    }).toJS();

    return this;
  }

  setKey(key :UUID[]) :EntityTypeBuilder {

    if (!isDefined(key) || isEmptyArray(key)) {
      return this;
    }

    if (!isValidUuidArray(key)) {
      throw new Error('invalid parameter: key must be a non-empty array of valid UUIDs');
    }

    this.key = Set().withMutations((set :Set<UUID>) => {
      key.forEach((keyId :UUID) => {
        set.add(keyId);
      });
    }).toJS();

    return this;
  }

  setPropertyTypes(propertyTypes :UUID[]) :EntityTypeBuilder {

    if (!isDefined(propertyTypes) || isEmptyArray(propertyTypes)) {
      return this;
    }

    if (!isValidUuidArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid UUIDs');
    }

    this.properties = Set().withMutations((set :Set<UUID>) => {
      propertyTypes.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();

    return this;
  }

  setBaseType(baseType :?UUID) :EntityTypeBuilder {

    if (!isDefined(baseType) || isEmptyString(baseType)) {
      return this;
    }

    if (!isValidUuid(baseType)) {
      throw new Error('invalid parameter: baseType must be a valid UUID');
    }

    this.baseType = baseType;
    return this;
  }

  setCategory(category :?SecurableType) :EntityTypeBuilder {

    if (!isDefined(category) || isEmptyString(category)) {
      return this;
    }

    if (!isNonEmptyString(category) || !SecurableTypes[category]) {
      throw new Error('invalid parameter: category must be a valid SecurableType');
    }

    this.category = category;
    return this;
  }

  setPropertyTags(propertyTags :?Object) :EntityTypeBuilder {

    if (!isDefined(propertyTags)) {
      return this;
    }

    if (!isValidMultimap(propertyTags, isValidUuid)) {
      throw new Error('invalid parameter: propertyTags must be a non-empty multimap object');
    }

    this.propertyTags = propertyTags;
    return this;
  }

  setShards(shards :?number) :EntityTypeBuilder {

    if (!isDefined(shards)) {
      return this;
    }

    if (!isInteger(shards)) {
      throw new Error('invalid parameter: shards must be an integer');
    }

    // com.openlattice.edm.type.EntityType
    if (shards <= 0 || shards >= 20) {
      throw new Error('invalid parameter: shards must be a valid integer');
    }

    this.shards = shards;
    return this;
  }

  build() :EntityType {

    let errorMsg :string = '';

    if (!isDefined(this.type)) {
      errorMsg = 'missing property: type is a required property';
    }

    if (!isDefined(this.title)) {
      errorMsg = 'missing property: title is a required property';
    }

    if (errorMsg) {
      LOG.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!this.key) {
      this.key = [];
    }

    if (!this.properties) {
      this.properties = [];
    }

    if (!this.schemas) {
      this.schemas = [];
    }

    return new EntityType(
      this.id,
      this.type,
      this.title,
      this.description,
      this.schemas,
      this.key,
      this.properties,
      this.baseType,
      this.category,
      this.propertyTags,
      this.shards,
    );
  }
}

export function isValidEntityType(entityType :?EntityType | EntityTypeObject) :boolean {

  if (!isDefined(entityType)) {

    LOG.error('invalid parameter: entityType must be defined', entityType);
    return false;
  }

  try {

    const entityTypeBuilder = new EntityTypeBuilder();

    // required properties
    entityTypeBuilder
      .setKey(entityType.key)
      .setPropertyTypes(entityType.properties)
      .setSchemas(entityType.schemas)
      .setTitle(entityType.title)
      .setType(entityType.type);

    // optional properties
    if (has(entityType, 'baseType')) {
      entityTypeBuilder.setBaseType(entityType.baseType);
    }

    if (has(entityType, 'category')) {
      entityTypeBuilder.setCategory(entityType.category);
    }

    if (has(entityType, 'description')) {
      entityTypeBuilder.setDescription(entityType.description);
    }

    if (has(entityType, 'id')) {
      entityTypeBuilder.setId(entityType.id);
    }

    if (has(entityType, 'propertyTags')) {
      entityTypeBuilder.setPropertyTags(entityType.propertyTags);
    }

    if (has(entityType, 'shards')) {
      entityTypeBuilder.setShards(entityType.shards);
    }

    entityTypeBuilder.build();
    return true;
  }
  catch (e) {

    LOG.error(e, entityType);
    return false;
  }
}

export function isValidEntityTypeArray(entityTypes :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(entityTypes, (entityType :any) => isValidEntityType(entityType));
}

export type {
  EntityTypeObject,
};
