/*
 * @flow
 */

import { Map, fromJS, isImmutable } from 'immutable';

import { Principal, PrincipalBuilder } from './Principal';
import type { PrincipalObject } from './Principal';

import Logger from '../utils/Logger';
import { AT_CLASS } from '../constants/GlobalConstants';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import type { UUID } from '../types';

const LOG = new Logger('Role');
const ROLE_CLASS_PACKAGE :'com.openlattice.organization.roles.Role' = 'com.openlattice.organization.roles.Role';

type RoleObject = {|
  [typeof AT_CLASS] :typeof ROLE_CLASS_PACKAGE;
  aclKey ?:UUID[];
  description ?:string;
  id ?:UUID;
  organizationId :UUID;
  principal :PrincipalObject;
  title :string;
|};

class Role {

  aclKey :?UUID[];
  description :?string;
  id :?UUID;
  organizationId :UUID;
  principal :Principal;
  title :string;

  constructor(role :{
    description :?string;
    id :?UUID;
    organizationId :UUID;
    principal :Principal;
    title :string;
  }) {

    // required properties
    this.organizationId = role.organizationId;
    this.principal = role.principal;
    this.title = role.title;

    // $FlowFixMe
    this[AT_CLASS] = ROLE_CLASS_PACKAGE;

    // optional properties
    if (isDefined(role.description)) {
      this.description = role.description;
    }

    if (isDefined(role.id)) {
      this.aclKey = [role.organizationId, role.id];
      this.id = role.id;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :RoleObject {

    // required properties
    const roleObj :RoleObject = {
      organizationId: this.organizationId,
      principal: this.principal.toObject(),
      title: this.title,
    };
    roleObj[AT_CLASS] = ROLE_CLASS_PACKAGE;

    // optional properties
    if (isDefined(this.description)) {
      roleObj.description = this.description;
    }

    if (isDefined(this.id)) {
      roleObj.aclKey = [this.organizationId, this.id];
      roleObj.id = this.id;
    }

    return roleObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class RoleBuilder {

  description :?string;
  id :?UUID;
  organizationId :UUID;
  principal :Principal;
  title :string;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setDescription(value.get('description'));
      this.setId(value.get('id'));
      this.setOrganizationId(value.get('organizationId'));
      this.setPrincipal(value.get('principal'));
      this.setTitle(value.get('title'));
    }
    else if (isDefined(value)) {
      this.setDescription(value.description);
      this.setId(value.id);
      this.setOrganizationId(value.organizationId);
      this.setPrincipal(value.principal);
      this.setTitle(value.title);
    }
  }

  setDescription(description :?string) :RoleBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: "description" must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setId(id :?UUID) :RoleBuilder {

    if (!isDefined(id) || isEmptyString(id)) {
      return this;
    }

    if (!isValidUUID(id)) {
      throw new Error('invalid parameter: "id" must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  setOrganizationId(organizationId :UUID) :RoleBuilder {

    if (!isValidUUID(organizationId)) {
      throw new Error('invalid parameter: "organizationId" must be a valid UUID');
    }

    this.organizationId = organizationId;
    return this;
  }

  setPrincipal(principal :Principal) :RoleBuilder {

    this.principal = (new PrincipalBuilder(principal)).build();
    return this;
  }

  setTitle(title :string) :RoleBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: "title" must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  build() :Role {

    if (!this.organizationId) {
      throw new Error('missing property: "organizationId" is a required property');
    }

    if (!this.principal) {
      throw new Error('missing property: "principal" is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: "title" is a required property');
    }

    return new Role({
      description: this.description,
      id: this.id,
      organizationId: this.organizationId,
      principal: this.principal,
      title: this.title,
    });
  }
}

const isValidRole = (value :any) :boolean => isValidModel(value, RoleBuilder, LOG);

export {
  ROLE_CLASS_PACKAGE,
  Role,
  RoleBuilder,
  isValidRole,
};

export type {
  RoleObject,
};
