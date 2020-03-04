/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import Logger from '../utils/Logger';
import { EntitySetFlagTypes } from '../constants/types';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID, validateNonEmptyArray } from '../utils/ValidationUtils';
import { genRandomString, genRandomUUID, pickRandomValue } from '../utils/testing/MockUtils';
import type { EntitySetFlagType } from '../constants/types';

const LOG = new Logger('EntitySet');

type EntitySetObject = {|
  contacts :string[];
  description ?:string;
  entityTypeId :UUID;
  flags ?:EntitySetFlagType[];
  id ?:UUID;
  linkedEntitySets ?:UUID[];
  name :string;
  organizationId ?:UUID;
  title :string;
|};

class EntitySet {

  contacts :string[];
  description :?string;
  entityTypeId :UUID;
  flags :?EntitySetFlagType[];
  id :?UUID;
  linkedEntitySets :?UUID[];
  name :string;
  organizationId :?UUID;
  title :string;

  constructor(entitySet :{
    contacts :string[];
    description :?string;
    entityTypeId :UUID;
    flags :?EntitySetFlagType[];
    id :?UUID;
    linkedEntitySets :?UUID[];
    name :string;
    organizationId :?UUID;
    title :string;
  }) {

    // required properties
    this.contacts = entitySet.contacts;
    this.entityTypeId = entitySet.entityTypeId;
    this.name = entitySet.name;
    this.title = entitySet.title;

    // optional properties
    if (isDefined(entitySet.description)) {
      this.description = entitySet.description;
    }

    if (isDefined(entitySet.flags)) {
      this.flags = entitySet.flags;
    }

    if (isDefined(entitySet.id)) {
      this.id = entitySet.id;
    }

    if (isDefined(entitySet.linkedEntitySets)) {
      this.linkedEntitySets = entitySet.linkedEntitySets;
    }

    if (isDefined(entitySet.organizationId)) {
      this.organizationId = entitySet.organizationId;
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
    if (isDefined(this.description)) {
      entitySetObj.description = this.description;
    }

    if (isDefined(this.flags)) {
      entitySetObj.flags = this.flags;
    }

    if (isDefined(this.id)) {
      entitySetObj.id = this.id;
    }

    if (isDefined(this.linkedEntitySets)) {
      entitySetObj.linkedEntitySets = this.linkedEntitySets;
    }

    if (isDefined(this.organizationId)) {
      entitySetObj.organizationId = this.organizationId;
    }

    return entitySetObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class EntitySetBuilder {

  contacts :string[];
  description :?string;
  entityTypeId :UUID;
  flags :?EntitySetFlagType[];
  id :?UUID;
  linkedEntitySets :?UUID[];
  name :string;
  organizationId :?UUID;
  title :string;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setContacts(value.get('contacts'));
      this.setDescription(value.get('description'));
      this.setEntityTypeId(value.get('entityTypeId'));
      this.setFlags(value.get('flags'));
      this.setId(value.get('id'));
      this.setLinkedEntitySets(value.get('linkedEntitySets'));
      this.setName(value.get('name'));
      this.setOrganizationId(value.get('organizationId'));
      this.setTitle(value.get('title'));
    }
    else if (isDefined(value)) {
      this.setContacts(value.contacts);
      this.setDescription(value.description);
      this.setEntityTypeId(value.entityTypeId);
      this.setFlags(value.flags);
      this.setId(value.id);
      this.setLinkedEntitySets(value.linkedEntitySets);
      this.setName(value.name);
      this.setOrganizationId(value.organizationId);
      this.setTitle(value.title);
    }
  }

  setContacts(contacts :$ReadOnlyArray<string>) :EntitySetBuilder {

    if (!isDefined(contacts)) {
      return this;
    }

    if (!isArray(contacts) && !isCollection(contacts)) {
      throw new Error('invalid parameter: "contacts" must be an array');
    }

    const set = Set(contacts);
    if (set.every(isNonEmptyString)) {
      this.contacts = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "contacts" must be a non-empty array of non-empty strings');
    }

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

  setEntityTypeId(entityTypeId :UUID) :EntitySetBuilder {

    if (!isValidUUID(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.entityTypeId = entityTypeId;
    return this;
  }

  setFlags(flags :?$ReadOnlyArray<EntitySetFlagType>) :EntitySetBuilder {

    if (!isDefined(flags)) {
      return this;
    }

    if (!isArray(flags) && !isCollection(flags)) {
      throw new Error('invalid parameter: "flags" must be an array');
    }

    const set = Set(flags);
    if (set.every((flag) => isNonEmptyString(flag) && EntitySetFlagTypes[flag])) {
      this.flags = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "flags" must be an array of EntitySetFlagTypes');
    }

    return this;
  }

  setId(entitySetId :?UUID) :EntitySetBuilder {

    if (!isDefined(entitySetId) || isEmptyString(entitySetId)) {
      return this;
    }

    if (!isValidUUID(entitySetId)) {
      throw new Error('invalid parameter: entitySetId must be a valid UUID');
    }

    this.id = entitySetId;
    return this;
  }

  setLinkedEntitySets(entitySetIds :?$ReadOnlyArray<UUID>) :EntitySetBuilder {

    if (!isDefined(entitySetIds)) {
      return this;
    }

    if (!isArray(entitySetIds) && !isCollection(entitySetIds)) {
      throw new Error('invalid parameter: "entitySetIds" must be an array');
    }

    const set = Set(entitySetIds);
    if (set.every(isValidUUID)) {
      this.linkedEntitySets = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "entitySetIds" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setName(name :string) :EntitySetBuilder {

    if (!isNonEmptyString(name)) {
      throw new Error('invalid parameter: name must be a non-empty string');
    }

    this.name = name;
    return this;
  }

  setOrganizationId(organizationId :?UUID) :EntitySetBuilder {

    if (!isDefined(organizationId) || isEmptyString(organizationId)) {
      return this;
    }

    if (!isValidUUID(organizationId)) {
      throw new Error('invalid parameter: organizationId must be a valid UUID');
    }

    this.organizationId = organizationId;
    return this;
  }

  setTitle(title :string) :EntitySetBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  build() :EntitySet {

    if (!this.entityTypeId) {
      throw new Error('missing property: "entityTypeId" is a required property');
    }

    if (!this.name) {
      throw new Error('missing property: "name" is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: "title" is a required property');
    }

    if (!this.contacts) {
      this.contacts = [];
    }

    return new EntitySet({
      contacts: this.contacts,
      description: this.description,
      entityTypeId: this.entityTypeId,
      flags: this.flags,
      id: this.id,
      linkedEntitySets: this.linkedEntitySets,
      name: this.name,
      organizationId: this.organizationId,
      title: this.title,
    });
  }
}

function isValidEntitySet(value :any) :boolean {

  if (!isDefined(value)) {
    LOG.error('invalid parameter: "value" is not defined');
    return false;
  }

  try {
    (new EntitySetBuilder(value)).build();
    return true;
  }
  catch (e) {
    LOG.error(e.message, value);
    return false;
  }
}

function isValidEntitySetArray(values :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(values, isValidEntitySet);
}

export {
  EntitySet,
  EntitySetBuilder,
  isValidEntitySet,
  isValidEntitySetArray,
};

export type {
  EntitySetObject,
};

/*
 *
 * testing
 *
 */

const MOCK_ENTITY_SET = new EntitySetBuilder()
  .setContacts(['OPENLATTICE'])
  .setDescription('MockEntitySetDescription')
  .setEntityTypeId('78ad8735-d5dc-42ab-96d9-677bca55e60f')
  .setFlags([EntitySetFlagTypes.ASSOCIATION])
  .setId('6685abaf-5508-4f34-a3c7-46b687f66ddd')
  .setLinkedEntitySets(['cf72e97f-109c-46a1-bb89-93a8753fd7ac'])
  .setName('MockEntitySetName')
  .setOrganizationId('9b93bc80-79c3-44c8-807c-ada1a8d6484f')
  .setTitle('MockEntitySetTitle')
  .build();

const MOCK_ENTITY_SET_OBJECT = MOCK_ENTITY_SET.toObject();

function genRandomEntitySet() {
  return new EntitySetBuilder()
    .setContacts([genRandomString()])
    .setDescription(genRandomString())
    .setEntityTypeId(genRandomUUID())
    .setFlags([pickRandomValue(EntitySetFlagTypes)])
    .setId(genRandomUUID())
    .setLinkedEntitySets([genRandomUUID(), genRandomUUID()])
    .setName(genRandomString())
    .setOrganizationId(genRandomUUID())
    .setTitle(genRandomString())
    .build();
}

export {
  MOCK_ENTITY_SET,
  MOCK_ENTITY_SET_OBJECT,
  genRandomEntitySet,
};
