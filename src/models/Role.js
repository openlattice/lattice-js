/*
 * @flow
 */

import has from 'lodash/has';

import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

const LOG = new Logger('Role');

/**
 * @class Role
 * @memberof lattice
 */
export default class Role {

  id :?UUID;
  organizationId :UUID;
  title :string;
  description :?string;

  constructor(
      id :?UUID,
      organizationId :UUID,
      title :string,
      description :?string) {

    // required properties
    this.organizationId = organizationId;
    this.title = title;

    // optional properties
    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(description)) {
      this.description = description;
    }
  }
}

/**
 * @class RoleBuilder
 * @memberof lattice
 */
export class RoleBuilder {

  id :?UUID;
  organizationId :UUID;
  title :string;
  description :?string;

  setId(id :?UUID) :RoleBuilder {

    if (!isDefined(id) || isEmptyString(id)) {
      return this;
    }

    if (!isValidUuid(id)) {
      throw new Error('invalid parameter: id must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  setOrganizationId(organizationId :UUID) :RoleBuilder {

    if (!isValidUuid(organizationId)) {
      throw new Error('invalid parameter: organizationId must be a valid UUID');
    }

    this.organizationId = organizationId;
    return this;
  }

  setTitle(title :string) :RoleBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :?string) :RoleBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  build() :Role {

    if (!this.organizationId) {
      throw new Error('missing property: organizationId is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    return new Role(
      this.id,
      this.organizationId,
      this.title,
      this.description
    );
  }
}

export function isValid(role :any) :boolean {

  if (!isDefined(role)) {

    LOG.error('invalid parameter: role must be defined', role);
    return false;
  }

  try {

    const roleBuilder = new RoleBuilder();

    // required properties
    roleBuilder
      .setOrganizationId(role.organizationId)
      .setTitle(role.title)
      .build();

    // optional properties
    if (has(role, 'id')) {
      roleBuilder.setId(role.id);
    }

    if (has(role, 'description')) {
      roleBuilder.setDescription(role.description);
    }

    roleBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, role);
    return false;
  }
}
