/*
 * @flow
 */

import Immutable from 'immutable';

import Principal from './Principal';
import Logger from '../utils/Logger';

import {
  isDefined,
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

  id :?UUID;
  title :string;
  description :?string;
  members :Principal[];
  roles :Principal[];

  constructor(
      id :?UUID,
      title :string,
      description :?string,
      members :Principal[],
      roles :Principal[]) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.members = members;
    this.roles = roles;
  }
}

/**
 * @class OrganizationBuilder
 * @memberof loom-data
 */
export class OrganizationBuilder {

  id :?UUID;
  title :string;
  description :?string;
  members :Principal[];
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

    this.members = Immutable.Set().withMutations((set :Set<Principal>) => {
      members.forEach((member :Principal) => {
        set.add(member);
      });
    }).toJS();

    return this;
  }

  setRoles(roles :Principal[]) :OrganizationBuilder {

    if (!isValidPrincipalArray(roles)) {
      throw new Error('invalid parameter: roles must be a non-empty array of valid Principals');
    }

    this.roles = Immutable.Set().withMutations((set :Set<Principal>) => {
      roles.forEach((role :Principal) => {
        set.add(role);
      });
    }).toJS();

    return this;
  }

  build() :Organization {

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.members) {
      throw new Error('missing property: members is a required property');
    }

    if (!this.roles) {
      throw new Error('missing property: roles is a required property');
    }

    return new Organization(
      this.id,
      this.title,
      this.description,
      this.members,
      this.roles
    );
  }
}

export function isValid(organization :any) :boolean {

  try {

    const organizationBuilder = new OrganizationBuilder();

    // required properties
    organizationBuilder
      .setTitle(organization.title)
      .setMembers(organization.members)
      .setRoles(organization.roles)
      .build();

    // optional properties
    if (isDefined(organization.id)) {
      organizationBuilder.setId(organization.id);
    }

    if (isDefined(organization.description)) {
      organizationBuilder.setDescription(organization.description);
    }

    organizationBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, organization);
    return false;
  }
}
