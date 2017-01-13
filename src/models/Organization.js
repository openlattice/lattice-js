/*
 * @flow
 */

import Principal from './Principal';
import PrincipalTypes from '../constants/PrincipalTypes';
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

  setPrincipals(principals :Principal[]) :OrganizationBuilder {

    if (!isValidPrincipalArray(principals)) {
      throw new Error('invalid parameter: principals must be a non-empty array of valid Principals');
    }

    this.members = [];
    this.roles = [];

    principals.forEach((principal :Principal) => {

      switch (principal.type) {

        case PrincipalTypes.USER:
          this.members.push(principal);
          break;

        case PrincipalTypes.ROLE:
          this.roles.push(principal);
          break;

        default:
          break;
      }
    })

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

    (new OrganizationBuilder())
      .setId(organization.id)
      .setTitle(organization.title)
      .setDescription(organization.description)
      .setPrincipals(organization.principals)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, organization);
    return false;
  }
}
