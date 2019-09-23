/*
 * @flow
 */

import has from 'lodash/has';
import isFinite from 'lodash/isFinite';
import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import Principal, { isValidPrincipal, isValidPrincipalArray } from './Principal';
import Role, { isValidRoleArray } from './Role';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString,
  isNonEmptyStringArray,
} from '../utils/LangUtils';

import {
  isValidUUID,
  isValidUUIDArray,
  validateNonEmptyArray,
} from '../utils/ValidationUtils';

import type { PrincipalObject } from './Principal';
import type { RoleObject } from './Role';

const LOG = new Logger('Organization');

type OrganizationObject = {|
  apps :UUID[];
  description ?:string;
  emails :string[];
  id ?:UUID;
  members :PrincipalObject[];
  partitions ?:number[];
  principal :PrincipalObject;
  roles :RoleObject[];
  title :string;
|};

/**
 * @class Organization
 * @memberof lattice
 */
export default class Organization {

  apps :UUID[];
  description :?string;
  emails :string[];
  id :?UUID;
  members :Principal[];
  partitions :?number[];
  principal :Principal;
  roles :Role[];
  title :string;

  constructor(
    id :?UUID,
    title :string,
    description :?string,
    principal :Principal,
    members :Principal[],
    roles :Role[],
    emails :string[],
    apps :UUID[],
    partitions :?number[],
  ) {

    // required properties
    this.apps = apps;
    this.emails = emails;
    this.members = members;
    this.principal = principal;
    this.roles = roles;
    this.title = title;

    // optional properties
    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(partitions)) {
      this.partitions = partitions;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :OrganizationObject {

    // required properties
    const orgObj :OrganizationObject = {
      apps: this.apps,
      emails: this.emails,
      members: this.members.map((p :Principal) => p.toObject()),
      principal: this.principal.toObject(),
      roles: this.roles.map((r :Role) => r.toObject()),
      title: this.title,
    };

    // optional properties
    if (isDefined(this.description)) {
      orgObj.description = this.description;
    }

    if (isDefined(this.id)) {
      orgObj.id = this.id;
    }

    if (isDefined(this.partitions)) {
      orgObj.partitions = this.partitions;
    }

    return orgObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class OrganizationBuilder
 * @memberof lattice
 */
export class OrganizationBuilder {

  apps :UUID[];
  description :?string;
  emails :string[];
  id :?UUID;
  members :Principal[];
  partitions :?number[];
  principal :Principal;
  roles :Role[];
  title :string;

  setId(id :?UUID) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setId() or .setId('') on purpose?
    if (!isDefined(id) || isEmptyString(id)) {
      return this;
    }

    if (!isValidUUID(id)) {
      throw new Error('invalid parameter: id must be a valid UUID');
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

  setDescription(description :?string) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setDescription() or .setDescription('') on purpose?
    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setPrincipal(principal :Principal) :OrganizationBuilder {

    if (!isValidPrincipal(principal)) {
      throw new Error('invalid parameter: principal must be a valid Principal');
    }

    this.principal = principal;
    return this;
  }

  setMembers(members :$ReadOnlyArray<Principal | PrincipalObject>) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setMembers() or .setMembers([]) on purpose?
    if (!isDefined(members) || isEmptyArray(members)) {
      return this;
    }

    if (!isValidPrincipalArray(members)) {
      throw new Error('invalid parameter: members must be a non-empty array of valid Principals');
    }

    this.members = Set().withMutations((set :Set<Principal>) => {
      members.forEach((member :Principal | PrincipalObject) => {
        set.add(member);
      });
    }).toJS();

    return this;
  }

  setRoles(roles :$ReadOnlyArray<Role | RoleObject>) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setRoles() or .setRoles([]) on purpose?
    if (!isDefined(roles) || isEmptyArray(roles)) {
      return this;
    }

    if (!isValidRoleArray(roles)) {
      throw new Error('invalid parameter: roles must be a non-empty array of valid Roles');
    }

    this.roles = Set().withMutations((set :Set<Role>) => {
      roles.forEach((role :Role | RoleObject) => {
        set.add(role);
      });
    }).toJS();

    return this;
  }

  setAutoApprovedEmails(emails :$ReadOnlyArray<string>) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setAutoApprovedEmails() or .setAutoApprovedEmails([]) on purpose?
    if (!isDefined(emails) || isEmptyArray(emails)) {
      return this;
    }

    if (!isNonEmptyStringArray(emails)) {
      throw new Error('invalid parameter: emails must be a non-empty array of strings');
    }

    this.emails = Set().withMutations((set :Set<string>) => {
      emails.forEach((email :string) => {
        set.add(email);
      });
    }).toJS();

    return this;
  }

  setApps(apps :$ReadOnlyArray<UUID>) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setApps() or .setApps([]) on purpose?
    if (!isDefined(apps) || isEmptyArray(apps)) {
      return this;
    }

    if (!isValidUUIDArray(apps)) {
      throw new Error('invalid parameter: apps must be a valid UUID array');
    }

    this.apps = Set().withMutations((set :Set<UUID>) => {
      apps.forEach((app :UUID) => {
        set.add(app);
      });
    }).toJS();

    return this;
  }

  setPartitions(partitions :$ReadOnlyArray<number>) :OrganizationBuilder {

    // NOTE: I remember having to add these checks, but I don't remember why...
    // why would it be ok to call .setPartitions() or .setPartitions([]) on purpose?
    if (!isDefined(partitions) || isEmptyArray(partitions)) {
      return this;
    }

    if (!validateNonEmptyArray(partitions, isFinite)) {
      throw new Error('invalid parameter: partitions must be a valid number array');
    }

    this.partitions = [...partitions];
    return this;
  }

  build() :Organization {

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.principal) {
      throw new Error('missing property: principal is a required property');
    }

    if (!this.members) {
      this.members = [];
    }

    if (!this.roles) {
      this.roles = [];
    }

    if (!this.emails) {
      this.emails = [];
    }

    if (!this.apps) {
      this.apps = [];
    }

    return new Organization(
      this.id,
      this.title,
      this.description,
      this.principal,
      this.members,
      this.roles,
      this.emails,
      this.apps,
      this.partitions,
    );
  }
}

export function isValidOrganization(organization :any) :boolean {

  if (!isDefined(organization)) {
    LOG.error('invalid parameter: organization must be defined', organization);
    return false;
  }

  try {

    const organizationBuilder = new OrganizationBuilder();

    // required properties
    organizationBuilder
      .setApps(organization.apps)
      .setAutoApprovedEmails(organization.emails)
      .setMembers(organization.members)
      .setPrincipal(organization.principal)
      .setRoles(organization.roles)
      .setTitle(organization.title)
      .build();

    // optional properties
    if (has(organization, 'description')) {
      organizationBuilder.setDescription(organization.description);
    }

    if (has(organization, 'id')) {
      organizationBuilder.setId(organization.id);
    }

    if (has(organization, 'partitions')) {
      organizationBuilder.setPartitions(organization.partitions);
    }

    organizationBuilder.build();

    return true;
  }
  catch (e) {
    LOG.error(`invalid Organization: ${e.message}`, organization);
    return false;
  }
}

export function isValidOrganizationArray(organizations :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(organizations, isValidOrganization);
}

export type {
  OrganizationObject,
};
