/*
 * @flow
 */

import Principal from './Principal';
import Logger from '../utils/Logger';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidPrincipalArray
} from '../utils/ValidationUtils';

const LOG = new Logger('Organization');

/**
 * @class Organization
 * @memberof loom-data
 */
export default class Organization {

  id :UUID;
  title :string;
  description :string;
  members :Principal[];
  principals :Principal[];
  roles :Principal[];

  constructor(
      id :UUID,
      title :string,
      description :string,
      members :Principal[],
      principals :Principal[],
      roles :Principal[]) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.members = members;
    this.principals = principals;
    this.roles = roles;
  }
}

/**
 * @class OrganizationBuilder
 * @memberof loom-data
 */
export class OrganizationBuilder {

  id :UUID;
  title :string;
  description :string;
  members :Principal[];
  principals :Principal[];
  roles :Principal[];

  setId(id :UUID) :OrganizationBuilder {

    if (!isValidUuid(id)) {
      throw new Error('invalid parameter: type must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  setTitle(title :string) :OrganizationBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :string) :OrganizationBuilder {

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setMembers(members :Principal[]) :OrganizationBuilder {

    if (!isValidPrincipalArray(members)) {
      throw new Error('invalid parameter: members must be a non-empty array of valid Principals');
    }

    this.members = members;
    return this;
  }

  setPrincipals(principals :Principal[]) :OrganizationBuilder {

    if (!isValidPrincipalArray(principals)) {
      throw new Error('invalid parameter: principals must be a non-empty array of valid Principals');
    }

    this.principals = principals;
    return this;
  }

  setRoles(roles :Principal[]) :OrganizationBuilder {

    if (!isValidPrincipalArray(roles)) {
      throw new Error('invalid parameter: roles must be a non-empty array of valid Principals');
    }

    this.roles = roles;
    return this;
  }

  build() :Organization {

    return new Organization(
      this.id,
      this.title,
      this.description,
      this.members,
      this.principals,
      this.roles
    );
  }
}

export function isValid(organization :any) :boolean {

  try {

    (new OrganizationBuilder())
      .setId(organization.id)
      .setTitle(organization.title)
      .setDescription(organization.description)
      .setMembers(organization.members)
      .setPrincipals(organization.principals)
      .setRoles(organization.roles)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, organization);
    return false;
  }
}
