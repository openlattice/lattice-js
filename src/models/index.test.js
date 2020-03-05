import { Set } from 'immutable';

import * as Models from './index';

const EXPECTED_MODELS = Set([
  'AccessCheckBuilder',
  'AceBuilder',
  'AclBuilder',
  'AclDataBuilder',
  'AppBuilder',
  'AppTypeBuilder',
  'AssociationTypeBuilder',
  'DataGraphBuilder',
  'EntityDataKeyBuilder',
  'EntitySetBuilder',
  'EntityTypeBuilder',
  'FullyQualifiedName',
  'GrantBuilder',
  'OrganizationBuilder',
  'PrincipalBuilder',
  'PropertyTypeBuilder',
  'RoleBuilder',
  'SchemaBuilder',
]);

describe('Lattice.Models', () => {

  test('should only export expected models', () => {
    expect(Set(Object.keys(Models))).toEqual(EXPECTED_MODELS);
  });

  EXPECTED_MODELS.forEach((model) => {
    test(`should export "${model}"`, () => {
      expect(Models).toHaveProperty(model);
      expect(Models[model].name).toEqual(model);
      expect(Models[model]).toBeInstanceOf(Function);
    });
  });

});
