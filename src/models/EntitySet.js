/*
 * @flow
 */

import FullyQualifiedName from './FullyQualifiedName';

import Logger from '../utils/Logger';

import {
  isDefined,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

const LOG = new Logger('EntitySet');

/**
 * @class EntitySet
 * @memberof loom-data
 */
export default class EntitySet {

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
export class EntitySetBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  entityTypeId :UUID;
  name :string;
  title :string;
  description :?string;

  setId(entitySetId :UUID) :EntitySetBuilder {

    if (!isValidUuid(entitySetId)) {
      throw new Error('invalid parameter: entitySetId must be a valid UUID');
    }

    this.id = entitySetId;
    return this;
  }

  setType(entitySetFqn :FullyQualifiedName) :EntitySetBuilder {

    if (!FullyQualifiedName.isValidFqn(entitySetFqn)) {
      throw new Error('invalid parameter: entitySetFqn must be a valid FQN');
    }

    this.type = entitySetFqn;
    return this;
  }

  setEntityTypeId(entityTypeId :UUID) :EntitySetBuilder {

    if (!isValidUuid(entityTypeId)) {
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

export function isValid(entitySet :any) :boolean {

  if (!isDefined(entitySet)) {

    LOG.error('invalid parameter: entitySet must be defined', entitySet);
    return false;
  }

  try {

    const entitySetBuilder = new EntitySetBuilder();

    // required properties
    entitySetBuilder
      .setType(entitySet.type)
      .setEntityTypeId(entitySet.entityTypeId)
      .setName(entitySet.name)
      .setTitle(entitySet.title);

    // optional properties
    if (isDefined(entitySet.id)) {
      entitySetBuilder.setId(entitySet.id);
    }

    if (isDefined(entitySet.description)) {
      entitySetBuilder.setDescription(entitySet.description);
    }

    entitySetBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, entitySet);
    return false;
  }
}
