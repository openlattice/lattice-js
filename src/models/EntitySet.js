/*
 * @flow
 */

import has from 'lodash/has';
import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';
import {
  isValidUuid,
  isValidUuidArray,
  validateNonEmptyArray,
} from '../utils/ValidationUtils';

const LOG = new Logger('EntitySet');

type EntitySetObject = {|
  contacts :string[];
  description ?:string;
  entityTypeId :UUID;
  id ?:UUID;
  linkedEntitySets ?:UUID[];
  name :string;
  title :string;
|};

/**
 * @class EntitySet
 * @memberof lattice
 */
export default class EntitySet {

  contacts :string[];
  description :?string;
  entityTypeId :UUID;
  id :?UUID;
  linkedEntitySets :?UUID[];
  name :string;
  title :string;

  constructor(
    id :?UUID,
    entityTypeId :UUID,
    name :string,
    title :string,
    description :?string,
    contacts :string[],
    linkedEntitySets :?UUID[],
  ) {

    // required properties
    this.entityTypeId = entityTypeId;
    this.name = name;
    this.title = title;
    this.contacts = contacts;

    // optional properties
    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(linkedEntitySets)) {
      this.linkedEntitySets = linkedEntitySets;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :EntitySetObject {

    // required properties
    const entitySetObj :EntitySetObject = {
      contacts: this.contacts,
      entityTypeId: this.entityTypeId,
      name: this.name,
      title: this.title,
    };

    // optional properties
    if (isDefined(this.id)) {
      entitySetObj.id = this.id;
    }

    if (isDefined(this.description)) {
      entitySetObj.description = this.description;
    }

    if (isDefined(this.linkedEntitySets)) {
      entitySetObj.linkedEntitySets = this.linkedEntitySets;
    }

    return entitySetObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class EntitySetBuilder
 * @memberof lattice
 */
export class EntitySetBuilder {

  contacts :string[];
  description :?string;
  entityTypeId :UUID;
  id :?UUID;
  linkedEntitySets :?UUID[];
  name :string;
  title :string;

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

  setContacts(contacts :$ReadOnlyArray<string>) :EntitySetBuilder {

    if (!isDefined(contacts) || isEmptyArray(contacts)) {
      return this;
    }

    if (!isNonEmptyStringArray(contacts)) {
      throw new Error('invalid parameter: contacts must be a non-empty array of strings');
    }

    this.contacts = Set().withMutations((set :Set<string>) => {
      contacts.forEach((contact :string) => {
        set.add(contact);
      });
    }).toJS();

    return this;
  }

  setLinkedEntitySets(entitySetIds :$ReadOnlyArray<UUID>) :EntitySetBuilder {

    if (!isDefined(entitySetIds) || isEmptyArray(entitySetIds)) {
      return this;
    }

    if (!isValidUuidArray(entitySetIds)) {
      throw new Error('invalid parameter: entitySetIds must be a non-empty array of strings');
    }

    this.linkedEntitySets = Set().withMutations((set :Set<UUID>) => {
      entitySetIds.forEach((entitySetId :UUID) => {
        set.add(entitySetId);
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
      this.contacts,
      this.linkedEntitySets,
    );
  }
}

export function isValidEntitySet(entitySet :any) :boolean {

  if (!isDefined(entitySet)) {
    LOG.error('invalid parameter: entitySet must be defined', entitySet);
    return false;
  }

  try {

    const entitySetBuilder = new EntitySetBuilder();

    // required properties
    entitySetBuilder
      .setContacts(entitySet.contacts)
      .setEntityTypeId(entitySet.entityTypeId)
      .setName(entitySet.name)
      .setTitle(entitySet.title);

    // optional properties
    if (has(entitySet, 'description')) {
      entitySetBuilder.setDescription(entitySet.description);
    }

    if (has(entitySet, 'id')) {
      entitySetBuilder.setId(entitySet.id);
    }

    if (has(entitySet, 'linkedEntitySets')) {
      entitySetBuilder.setLinkedEntitySets(entitySet.linkedEntitySets);
    }

    entitySetBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, entitySet);
    return false;
  }
}

export function isValidEntitySetArray(entitySets :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(entitySets, isValidEntitySet);
}

export type {
  EntitySetObject,
};
