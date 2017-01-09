/*
 * @flow
 */

import FullyQualifiedName from './FullyQualifiedName';

import {
  isNonEmptyString,
  isValidUUID
} from '../utils/LangUtils';

/**
 * @class EntitySet
 * @memberof loom-data
 */
class EntitySet {

  id :?UUID;
  type :FullyQualifiedName;
  entityTypeId :UUID;
  name :string;
  title :string;
  description :?string;

  constructor(
      id :?UUID,
      type :FullyQualifiedName,
      entityTypeId :UUID,
      name :string,
      title :string,
      description :?string) {

    this.id = id;
    this.type = type;
    this.entityTypeId = entityTypeId;
    this.name = name;
    this.title = title;
    this.description = description;
  }
}

/**
 * @class EntitySetBuilder
 * @memberof loom-data
 * @private
 */
export default class EntitySetBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  entityTypeId :UUID;
  name :string;
  title :string;
  description :?string;

  setId(entitySetId :UUID) :EntitySetBuilder {

    if (!isValidUUID(entitySetId)) {
      throw new Error('invalid parameter: entitySetId must be a valid UUID');
    }

    this.id = entitySetId;
    return this;
  }

  setType(entitySetFqn :FullyQualifiedName) :EntitySetBuilder {

    if (!FullyQualifiedName.isValidFqn(entitySetFqn.getFullyQualifiedName())) {
      throw new Error('invalid parameter: entitySetFqn must be a valid FQN');
    }

    this.type = entitySetFqn;
    return this;
  }

  setEntityTypeId(entityTypeId :UUID) :EntitySetBuilder {

    if (!isValidUUID(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.entityTypeId = entityTypeId;
    return this;
  }

  setName(name :string) :EntitySetBuilder {

    if (!isNonEmptyString(name)) {
      throw new Error('invalid parameter: name must be a non-empty string');
    }

    this.name = name;
    return this;
  }

  setTitle(title :string) :EntitySetBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :string) :EntitySetBuilder {

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  build() :EntitySet {

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    if (!this.entityTypeId) {
      throw new Error('missing property: entityTypeId is a required property');
    }

    if (!this.name) {
      throw new Error('missing property: name is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    return new EntitySet(
      this.id,
      this.type,
      this.entityTypeId,
      this.name,
      this.title,
      this.description
    );
  }
}
