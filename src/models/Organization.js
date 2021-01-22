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
  get,
  isCollection,
  isImmutable,
} from 'immutable';

import { Grant, GrantBuilder } from './Grant';
import { Principal, PrincipalBuilder } from './Principal';
import { Role, RoleBuilder } from './Role';
import type { GrantObject } from './Grant';
import type { PrincipalObject } from './Principal';
import type { RoleObject } from './Role';

import Logger from '../utils/Logger';
import PrincipalTypes from '../constants/types/PrincipalTypes';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import type { GrantType } from '../constants/types/GrantTypes';
import type { UUID } from '../types';

const LOG = new Logger('Organization');

const UNINITIALIZED_UUID = '00000000-0000-0000-0000-000000000000';

type OrganizationObject = {|
  apps :UUID[];
  connections :string[];
  description ?:string;
  emailDomains :string[];
  grants :{ [UUID] :{ [GrantType] :GrantObject} };
  id ?:UUID;
  members :PrincipalObject[];
  metadataEntitySetIds :{
    accessRequests :UUID;
    columns :UUID;
    datasets :UUID;
    organization :UUID;
    schemas :UUID;
    views :UUID;
  };
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
  grants :{ [UUID] :{ [GrantType] :Grant} };
  id :?UUID;
  members :Principal[];
  metadataEntitySetIds :{
    accessRequests :UUID;
    columns :UUID;
    datasets :UUID;
    organization :UUID;
    schemas :UUID;
    views :UUID;
  };
  partitions :?number[];
  principal :Principal;
  roles :Role[];
  title :string;

  constructor(org :{
    apps :UUID[];
    connections :string[];
    description :?string;
    emailDomains :string[];
    grants :{ [UUID] :{ [GrantType] :Grant} };
    id :?UUID;
    members :Principal[];
    metadataEntitySetIds :{
      accessRequests :UUID;
      columns :UUID;
      datasets :UUID;
      organization :UUID;
      schemas :UUID;
      views :UUID;
    };
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
    this.metadataEntitySetIds = org.metadataEntitySetIds;
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
      grants: mapValues(this.grants, (grantMap) => mapValues(grantMap, (grant) => grant.toObject())),
      members: this.members.map((principal) => principal.toObject()),
      metadataEntitySetIds: this.metadataEntitySetIds,
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
  grants :{ [UUID] :{ [GrantType] :Grant} };
  id :?UUID;
  members :Principal[];
  metadataEntitySetIds :{
    accessRequests :UUID;
    columns :UUID;
    datasets :UUID;
    organization :UUID;
    schemas :UUID;
    views :UUID;
  };
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
      this.setMetaDataEntitySetIds(value.get('metadataEntitySetIds'));
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
      this.setMetaDataEntitySetIds(value.metadataEntitySetIds);
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

    try {
      this.grants = Map().withMutations((mutableMap :Map) => {
        fromJS(grants).forEach((grantMap :Map, id :UUID) => {
          if (!isValidUUID(id)) {
            throw new Error('invalid parameter: "grants" must be a map where all keys are valid UUIDs');
          }
          grantMap.forEach((grant :Map, grantType :GrantType) => {
            mutableMap.setIn([id, grantType], (new GrantBuilder(grant)).build());
          });
        });
      }).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "grants" must be a map where all values are a map of GrantType to Grant');
    }

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

  setMetaDataEntitySetIds(
    metadataEntitySetIds :$ReadOnly<{
      accessRequests :UUID;
      columns :UUID;
      datasets :UUID;
      organization :UUID;
      schemas :UUID;
      views :UUID;
    }>,
  ) :OrganizationBuilder {

    if (!isDefined(metadataEntitySetIds)) {
      return this;
    }

    if (!isValidUUID(get(metadataEntitySetIds, 'accessRequests'))) {
      throw new Error('invalid parameter: "metadataEntitySetIds.accessRequests" must be a valid UUID');
    }

    if (!isValidUUID(get(metadataEntitySetIds, 'columns'))) {
      throw new Error('invalid parameter: "metadataEntitySetIds.columns" must be a valid UUID');
    }

    if (!isValidUUID(get(metadataEntitySetIds, 'datasets'))) {
      throw new Error('invalid parameter: "metadataEntitySetIds.datasets" must be a valid UUID');
    }

    if (!isValidUUID(get(metadataEntitySetIds, 'organization'))) {
      throw new Error('invalid parameter: "metadataEntitySetIds.organization" must be a valid UUID');
    }

    if (!isValidUUID(get(metadataEntitySetIds, 'schemas'))) {
      throw new Error('invalid parameter: "metadataEntitySetIds.schemas" must be a valid UUID');
    }

    if (!isValidUUID(get(metadataEntitySetIds, 'views'))) {
      throw new Error('invalid parameter: "metadataEntitySetIds.views" must be a valid UUID');
    }

    this.metadataEntitySetIds = {
      accessRequests: get(metadataEntitySetIds, 'accessRequests'),
      columns: get(metadataEntitySetIds, 'columns'),
      datasets: get(metadataEntitySetIds, 'datasets'),
      organization: get(metadataEntitySetIds, 'organization'),
      schemas: get(metadataEntitySetIds, 'schemas'),
      views: get(metadataEntitySetIds, 'views'),
    };

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

    if (!this.metadataEntitySetIds) {
      this.metadataEntitySetIds = {
        accessRequests: UNINITIALIZED_UUID,
        columns: UNINITIALIZED_UUID,
        datasets: UNINITIALIZED_UUID,
        organization: UNINITIALIZED_UUID,
        schemas: UNINITIALIZED_UUID,
        views: UNINITIALIZED_UUID,
      };
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
      metadataEntitySetIds: this.metadataEntitySetIds,
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
