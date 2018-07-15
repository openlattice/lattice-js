/*
 * @flow
 */

import has from 'lodash/has';

import Logger from '../utils/Logger';
import Principal, { isValidPrincipal } from './Principal';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidUuid } from '../utils/ValidationUtils';

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
  principal :Principal

  constructor(
    id :?UUID,
    organizationId :UUID,
    title :string,
    description :?string,
    principal :Principal
  ) {

    // required properties
    this.organizationId = organizationId;
    this.title = title;
    this.principal = principal;

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
  principal :Principal;

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

  setPrincipal(principal :Principal) :RoleBuilder {

    if (!isValidPrincipal(principal)) {
      throw new Error('invalid parameter: principal must be a valid Principal');
    }

    this.principal = principal;
    return this;
  }

  build() :Role {

    if (!this.organizationId) {
      throw new Error('missing property: organizationId is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.principal) {
      throw new Error('missing property: principal is a required property');
    }

    return new Role(
      this.id,
      this.organizationId,
      this.title,
      this.description,
      this.principal
    );
  }
}

export function isValidRole(role :any) :boolean {

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
      .setPrincipal(role.principal)
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
