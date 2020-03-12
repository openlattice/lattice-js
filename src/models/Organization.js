/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isFinite from 'lodash/isFinite';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import {
  List,
  Map,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import {
  Grant,
  GrantBuilder,
  genRandomGrant,
  isValidGrant,
} from './Grant';
import { Principal, PrincipalBuilder } from './Principal';
import { Role, RoleBuilder, genRandomRole } from './Role';
import type { GrantObject } from './Grant';
import type { PrincipalObject } from './Principal';
import type { RoleObject } from './Role';

import GrantTypes from '../constants/types/GrantTypes';
import Logger from '../utils/Logger';
import PrincipalTypes from '../constants/types/PrincipalTypes';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import { genRandomInt, genRandomString, genRandomUUID } from '../utils/testing/MockUtils';

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

class Organization {

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

  constructor(org :{
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
  }) {

    // required properties
    this.apps = org.apps;
    this.emailDomains = org.emailDomains;
    this.connections = org.connections;
    this.grants = org.grants;
    this.members = org.members;
    this.principal = org.principal;
    this.roles = org.roles;
    this.title = org.title;

    // optional properties
    if (isDefined(org.description)) {
      this.description = org.description;
    }

    if (isDefined(org.id)) {
      this.id = org.id;
    }

    if (isDefined(org.partitions)) {
      this.partitions = org.partitions;
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
      grants: mapValues(this.grants, (grant) => grant.toObject()),
      members: this.members.map((principal) => principal.toObject()),
      principal: this.principal.toObject(),
      roles: this.roles.map((role) => role.toObject()),
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

class OrganizationBuilder {

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

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setApps(value.get('apps'));
      this.setConnections(value.get('connections'));
      this.setDescription(value.get('description'));
      this.setEmailDomains(value.get('emailDomains'));
      this.setGrants(value.get('grants'));
      this.setId(value.get('id'));
      this.setMembers(value.get('members'));
      this.setPartitions(value.get('partitions'));
      this.setPrincipal(value.get('principal'));
      this.setRoles(value.get('roles'));
      this.setTitle(value.get('title'));
    }
    else if (isDefined(value)) {
      this.setApps(value.apps);
      this.setConnections(value.connections);
      this.setDescription(value.description);
      this.setEmailDomains(value.emailDomains);
      this.setGrants(value.grants);
      this.setId(value.id);
      this.setMembers(value.members);
      this.setPartitions(value.partitions);
      this.setPrincipal(value.principal);
      this.setRoles(value.roles);
      this.setTitle(value.title);
    }
  }

  setApps(appIds :$ReadOnlyArray<UUID>) :OrganizationBuilder {

    if (!isDefined(appIds)) {
      return this;
    }

    if (!isArray(appIds) && !isCollection(appIds)) {
      throw new Error('invalid parameter: "appIds" must be an array');
    }

    const set = Set(appIds);
    if (set.every(isValidUUID)) {
      this.apps = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "appIds" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setConnections(connections :$ReadOnlyArray<string>) :OrganizationBuilder {

    if (!isDefined(connections)) {
      return this;
    }

    if (!isArray(connections) && !isCollection(connections)) {
      throw new Error('invalid parameter: "connections" must be an array');
    }

    const set = Set(connections);
    if (set.every(isNonEmptyString)) {
      this.connections = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "connections" must be a non-empty array of non-empty strings');
    }

    return this;
  }

  setDescription(description :?string) :OrganizationBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: "description" must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setEmailDomains(emailDomains :$ReadOnlyArray<string>) :OrganizationBuilder {

    if (!isDefined(emailDomains)) {
      return this;
    }

    if (!isArray(emailDomains) && !isCollection(emailDomains)) {
      throw new Error('invalid parameter: "emailDomains" must be an array');
    }

    const set = Set(emailDomains);
    if (set.every(isNonEmptyString)) {
      this.emailDomains = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "emailDomains" must be a non-empty array of non-empty strings');
    }

    return this;
  }

  setGrants(grants :$ReadOnly<Object>) :OrganizationBuilder {

    if (!isDefined(grants)) {
      return this;
    }

    if (!isPlainObject(grants) && !isCollection(grants)) {
      throw new Error('invalid parameter: "grants" must be an object');
    }

    const map = Map(grants);
    if (!map.keySeq().every(isValidUUID)) {
      throw new Error('invalid parameter: "grants" must be an object where all keys are valid UUIDs');
    }

    if (!map.valueSeq().every(isValidGrant)) {
      throw new Error('invalid parameter: "grants" must be an object where all values are valid Grants');
    }

    this.grants = map.toJS();
    return this;
  }

  setId(organizationId :?UUID) :OrganizationBuilder {

    if (!isDefined(organizationId) || isEmptyString(organizationId)) {
      return this;
    }

    if (!isValidUUID(organizationId)) {
      throw new Error('invalid parameter: "organizationId" must be a valid UUID');
    }

    this.id = organizationId;
    return this;
  }

  setMembers(members :$ReadOnlyArray<Principal>) :OrganizationBuilder {

    if (!isDefined(members)) {
      return this;
    }

    if (!isArray(members) && !isCollection(members)) {
      throw new Error('invalid parameter: "members" must be an array');
    }

    try {
      this.members = Set(members).map((principal) => (new PrincipalBuilder(principal)).build()).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "members" must be an array of Principals');
    }

    return this;
  }

  setPartitions(partitions :?$ReadOnlyArray<number>) :OrganizationBuilder {

    if (!isDefined(partitions)) {
      return this;
    }

    if (!isArray(partitions) && !isCollection(partitions)) {
      throw new Error('invalid parameter: "partitions" must be an array');
    }

    const list = List(partitions);
    if (list.every(isFinite)) {
      this.partitions = list.toJS();
    }
    else {
      throw new Error('invalid parameter: "partitions" must be a non-empty array of numbers');
    }

    return this;
  }

  setPrincipal(principal :Principal) :OrganizationBuilder {

    this.principal = (new PrincipalBuilder(principal)).build();
    if (this.principal.type !== PrincipalTypes.ORGANIZATION) {
      throw new Error('invalid parameter: "principal" must be PrincipalType.ORGANIZATION');
    }

    return this;
  }

  setRoles(roles :$ReadOnlyArray<Role | RoleObject>) :OrganizationBuilder {

    if (!isDefined(roles)) {
      return this;
    }

    if (!isArray(roles) && !isCollection(roles)) {
      throw new Error('invalid parameter: "roles" must be an array');
    }

    try {
      this.roles = Set(roles).map((role) => (new RoleBuilder(role)).build()).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "roles" must be an array of Roles');
    }

    return this;
  }

  setTitle(title :string) :OrganizationBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: "title" must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  build() :Organization {

    if (!this.title) {
      throw new Error('missing property: "title" is a required property');
    }

    if (!this.principal) {
      throw new Error('missing property: "principal" is a required property');
    }

    if (!this.apps) {
      this.apps = [];
    }

    if (!this.connections) {
      this.connections = [];
    }

    if (!this.emailDomains) {
      this.emailDomains = [];
    }

    if (!this.grants) {
      this.grants = {};
    }

    if (!this.members) {
      this.members = [];
    }

    if (!this.roles) {
      this.roles = [];
    }

    return new Organization({
      apps: this.apps,
      connections: this.connections,
      description: this.description,
      emailDomains: this.emailDomains,
      grants: this.grants,
      id: this.id,
      members: this.members,
      partitions: this.partitions,
      principal: this.principal,
      roles: this.roles,
      title: this.title,
    });
  }
}

const isValidOrganization = (value :any) :boolean => isValidModel(value, OrganizationBuilder, LOG);

export {
  Organization,
  OrganizationBuilder,
  isValidOrganization,
};

export type {
  OrganizationObject,
};

/*
 *
 * testing
 *
 */

const ORGANIZATION_MOCK = (new OrganizationBuilder())
  .setApps(['cdf67221-9bdc-4196-94db-d64915298b3e', 'd5ce57c3-9a1f-4842-bd2f-bec2b63c1ea8'])
  .setConnections(['CONNECTION_0', 'CONNECTION_1'])
  .setDescription('MockOrgDescription')
  .setEmailDomains(['openlattice.com'])
  .setGrants({
    'b95d538b-4358-45fe-9fa5-de7987fbc502': (new GrantBuilder())
      .setGrantType(GrantTypes.MANUAL)
      .setMappings(['MAPPING_1', 'MAPPING_2'])
      .build()
  })
  .setId('5e5da17a-1b9a-4ef3-9798-8dab02fa6c8a')
  .setMembers([
    (new PrincipalBuilder())
      .setId('MockOrgMemberPrincipal')
      .setType(PrincipalTypes.USER)
      .build()
  ])
  .setPartitions([128])
  .setPrincipal(
    (new PrincipalBuilder())
      .setId('MockOrgPrincipalId')
      .setType(PrincipalTypes.ORGANIZATION)
      .build()
  )
  .setRoles([
    (new RoleBuilder())
      .setDescription('MockOrgRoleDescription')
      .setId('9f13d087-dc12-4cb0-8033-abcf70584846')
      .setOrganizationId('5e5da17a-1b9a-4ef3-9798-8dab02fa6c8a')
      .setPrincipal(
        (new PrincipalBuilder())
          .setId('MockOrgRolePrincipalId')
          .setType(PrincipalTypes.ROLE)
          .build()
      )
      .setTitle('MockOrgRoleTitle')
      .build()
  ])
  .setTitle('MockOrgTitle')
  .build();

function genRandomOrganization() {
  return (new OrganizationBuilder())
    .setApps([genRandomUUID(), genRandomUUID()])
    .setConnections([genRandomString(), genRandomString()])
    .setDescription(genRandomString())
    .setEmailDomains([`${genRandomString()}.com`])
    .setGrants({ [genRandomUUID()]: genRandomGrant() })
    .setId(genRandomUUID())
    .setMembers([
      (new PrincipalBuilder())
        .setId(genRandomString())
        .setType(PrincipalTypes.USER)
        .build()
    ])
    .setPartitions([genRandomInt()])
    .setPrincipal(
      (new PrincipalBuilder())
        .setId(genRandomString())
        .setType(PrincipalTypes.ORGANIZATION)
        .build()
    )
    .setRoles([genRandomRole(), genRandomRole()])
    .setTitle(genRandomString())
    .build();
}

export {
  ORGANIZATION_MOCK,
  genRandomOrganization,
};
