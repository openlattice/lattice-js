/*
 * @flow
 */

import has from 'lodash/has';
import isFinite from 'lodash/isFinite';
import mapValues from 'lodash/mapValues';
import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import Grant, { isValidGrantArray } from './Grant';
import Principal, { isValidPrincipal, isValidPrincipalArray } from './Principal';
import Role, { isValidRoleArray } from './Role';

import {
  isDefined,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNonEmptyObject,
  isNonEmptyString,
  isNonEmptyStringArray,
} from '../utils/LangUtils';

import {
  isValidUUID,
  isValidUUIDArray,
  validateNonEmptyArray,
} from '../utils/ValidationUtils';

import type { GrantObject } from './Grant';
import type { PrincipalObject } from './Principal';
import type { RoleObject } from './Role';

const LOG = new Logger('Organization');

type OrganizationObject = {|
  apps :UUID[];
  connections :string[];
  description ?:string;
  emailDomains :string[];
  grants :{ [UUID] :GrantObject };
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
  connections :string[];
  description :?string;
  emailDomains :string[];
  grants :{ [UUID] :Grant };
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
    emailDomains :string[],
    apps :UUID[],
    partitions :?number[],
    connections :string[],
    grants :{ [UUID] :Grant },
  ) {

    // required properties
    this.apps = apps;
    this.emailDomains = emailDomains;
    this.connections = connections;
    this.grants = grants;
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
      connections: this.connections,
      emailDomains: this.emailDomains,
      grants: mapValues(this.grants, (g :Grant) => g.toObject()),
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
  connections :string[];
  description :?string;
  emailDomains :string[];
  grants :{ [UUID] :Grant };
  id :?UUID;
  members :Principal[];
  partitions :?number[];
  principal :Principal;
  roles :Role[];
  title :string;

  setId(id :?UUID) :OrganizationBuilder {

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

  setEmailDomains(emailDomains :$ReadOnlyArray<string>) :OrganizationBuilder {

    if (!isDefined(emailDomains) || isEmptyArray(emailDomains)) {
      return this;
    }

    if (!isNonEmptyStringArray(emailDomains)) {
      throw new Error('invalid parameter: emailDomains must be a non-empty array of strings');
    }

    this.emailDomains = Set().withMutations((set :Set<string>) => {
      emailDomains.forEach((email :string) => {
        set.add(email);
      });
    }).toJS();

    return this;
  }

  setApps(apps :$ReadOnlyArray<UUID>) :OrganizationBuilder {

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

    if (!isDefined(partitions) || isEmptyArray(partitions)) {
      return this;
    }

    if (!validateNonEmptyArray(partitions, isFinite)) {
      throw new Error('invalid parameter: partitions must be a valid number array');
    }

    this.partitions = [...partitions];
    return this;
  }

  setConnections(connections :$ReadOnlyArray<string>) :OrganizationBuilder {

    if (!isDefined(connections) || isEmptyArray(connections)) {
      return this;
    }

    if (!isNonEmptyStringArray(connections)) {
      throw new Error('invalid parameter: connections must be a non-empty array of strings');
    }

    this.connections = Set().withMutations((set :Set<string>) => {
      connections.forEach((connection :string) => {
        set.add(connection);
      });
    }).toJS();

    return this;
  }

  setGrants(grants :$ReadOnly<Object>) :OrganizationBuilder {

    if (!isDefined(grants) || isEmptyObject(grants)) {
      return this;
    }

    if (!isNonEmptyObject(grants)) {
      throw new Error('invalid parameter: grants must be a non-empty object');
    }

    const keys = Object.keys(grants);
    if (!isValidUUIDArray(keys)) {
      throw new Error('invalid parameter: grants must be a non-empty object where all keys are UUIDs');
    }

    const values = Object.values(grants);
    if (!isValidGrantArray(values)) {
      throw new Error('invalid parameter: grants must be a non-empty object where all values are valid Grants');
    }

    this.grants = grants;
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

    if (!this.emailDomains) {
      this.emailDomains = [];
    }

    if (!this.apps) {
      this.apps = [];
    }

    if (!this.connections) {
      this.connections = [];
    }

    if (!this.grants) {
      this.grants = {};
    }

    return new Organization(
      this.id,
      this.title,
      this.description,
      this.principal,
      this.members,
      this.roles,
      this.emailDomains,
      this.apps,
      this.partitions,
      this.connections,
      this.grants,
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
      .setEmailDomains(organization.emailDomains)
      .setMembers(organization.members)
      .setPrincipal(organization.principal)
      .setRoles(organization.roles)
      .setTitle(organization.title)
      .setConnections(organization.connections)
      .setGrants(organization.grants)
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
