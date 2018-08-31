import { OrderedSet, Set } from 'immutable';

import * as Models from './index';

/* eslint-disable key-spacing */
const EXPECTED_MODELS = Set([
  'AccessCheck',
  'AccessCheckBuilder',
  'Ace',
  'AceBuilder',
  'Acl',
  'AclBuilder',
  'AclData',
  'AclDataBuilder',
  'App',
  'AppBuilder',
  'AppType',
  'AppTypeBuilder',
  'AssociationType',
  'AssociationTypeBuilder',
  'DataEdgeKey',
  'DataEdgeKeyBuilder',
  'DataGraph',
  'DataGraphBuilder',
  'EntityDataKey',
  'EntityDataKeyBuilder',
  'EntitySet',
  'EntitySetBuilder',
  'EntityType',
  'EntityTypeBuilder',
  'FullyQualifiedName',
  'LinkingEntitySet',
  'LinkingEntitySetBuilder',
  'LinkingEntityType',
  'LinkingEntityTypeBuilder',
  'LinkingRequest',
  'LinkingRequestBuilder',
  'Organization',
  'OrganizationBuilder',
  'Principal',
  'PrincipalBuilder',
  'PropertyType',
  'PropertyTypeBuilder',
  'Request',
  'RequestBuilder',
  'RequestStatus',
  'RequestStatusBuilder',
  'Role',
  'RoleBuilder',
  'Schema',
  'SchemaBuilder'
]).sort();
/* eslint-enable */

describe('Lattice.Models', () => {

  test('should only export expected models', () => {
    expect(OrderedSet(Object.keys(Models))).toEqual(EXPECTED_MODELS);
  });

  EXPECTED_MODELS.forEach((model) => {
    test(`should export "${model}"`, () => {
      expect(Models).toHaveProperty(model);
      expect(Models[model].name).toEqual(model);
      expect(Models[model]).toBeInstanceOf(Function);
    });
  });

});
