/*
 * @flow
 */

import Immutable from 'immutable';

import has from 'lodash/has';

import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

const LOG = new Logger('EntitySet');

/**
 * @class EntitySet
 * @memberof lattice
 */
export default class EntitySet {

  id :?UUID;
  entityTypeId :UUID;
  name :string;
  title :string;
  description :?string;
  contacts :string[];

  constructor(
      id :?UUID,
      entityTypeId :UUID,
      name :string,
      title :string,
      description :?string,
      contacts :string[]
  ) {

    // required properties
    this.entityTypeId = entityTypeId;
    this.name = name;
    this.title = title;
    this.contacts = contacts;

    // optional properties
    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(description)) {
      this.description = description;
    }

    // TODO: use Immutable.hash() for implementing valueOf()
  }
}

/**
 * @class EntitySetBuilder
 * @memberof lattice
 */
export class EntitySetBuilder {

  id :?UUID;
  entityTypeId :UUID;
  name :string;
  title :string;
  description :?string;
  contacts :string[];

  setId(entitySetId :?UUID) :EntitySetBuilder {

    if (!isDefined(entitySetId) || isEmptyString(entitySetId)) {
      return this;
    }

    if (!isValidUuid(entitySetId)) {
      throw new Error('invalid parameter: entitySetId must be a valid UUID');
    }

    this.id = entitySetId;
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

  setDescription(description :?string) :EntitySetBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setContacts(contacts :string[]) :EntitySetBuilder {

    if (!isDefined(contacts) || isEmptyArray(contacts)) {
      return this;
    }

    if (!isNonEmptyStringArray(contacts)) {
      throw new Error('invalid parameter: contacts must be a non-empty array of strings');
    }

    this.contacts = Immutable.Set().withMutations((set :Set<string>) => {
      contacts.forEach((contact :string) => {
        set.add(contact);
      });
    }).toJS();

    return this;
  }

  build() :EntitySet {

    if (!this.entityTypeId) {
      throw new Error('missing property: entityTypeId is a required property');
    }

    if (!this.name) {
      throw new Error('missing property: name is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.contacts) {
      this.contacts = [];
    }

    return new EntitySet(
      this.id,
      this.entityTypeId,
      this.name,
      this.title,
      this.description,
      this.contacts
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
      .setEntityTypeId(entitySet.entityTypeId)
      .setName(entitySet.name)
      .setTitle(entitySet.title)
      .setContacts(entitySet.contacts);

    // optional properties
    if (has(entitySet, 'id')) {
      entitySetBuilder.setId(entitySet.id);
    }

    if (has(entitySet, 'description')) {
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
