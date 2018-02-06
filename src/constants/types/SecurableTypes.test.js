import SecurableTypes from './SecurableTypes';

const AssociationType = 'AssociationType';
const ComplexType = 'ComplexType';
const EdgeType = 'EdgeType';
const EntitySet = 'EntitySet';
const EntityType = 'EntityType';
const DataSource = 'Datasource';
const LinkingEntityType = 'LinkingEntityType';
const PropertyTypeInEntitySet = 'PropertyTypeInEntitySet';
const Organization = 'Organization';
const OrganizationRole = 'OrganizationRole';

describe('SecurableTypes', () => {

  test(`should export "${AssociationType}"`, () => {
    expect(SecurableTypes.AssociationType).toBeDefined();
    expect(SecurableTypes.AssociationType).toEqual(AssociationType);
  });

  test(`should export "${ComplexType}"`, () => {
    expect(SecurableTypes.ComplexType).toBeDefined();
    expect(SecurableTypes.ComplexType).toEqual(ComplexType);
  });

  test(`should export "${EdgeType}"`, () => {
    expect(SecurableTypes.EdgeType).toBeDefined();
    expect(SecurableTypes.EdgeType).toEqual(EdgeType);
  });

  test(`should export "${EntitySet}"`, () => {
    expect(SecurableTypes.EntitySet).toBeDefined();
    expect(SecurableTypes.EntitySet).toEqual(EntitySet);
  });

  test(`should export "${EntityType}"`, () => {
    expect(SecurableTypes.EntityType).toBeDefined();
    expect(SecurableTypes.EntityType).toEqual(EntityType);
  });

  test(`should export "${DataSource}"`, () => {
    expect(SecurableTypes.DataSource).toBeDefined();
    expect(SecurableTypes.DataSource).toEqual(DataSource);
  });

  test(`should export "${LinkingEntityType}"`, () => {
    expect(SecurableTypes.LinkingEntityType).toBeDefined();
    expect(SecurableTypes.LinkingEntityType).toEqual(LinkingEntityType);
  });

  test(`should export "${PropertyTypeInEntitySet}"`, () => {
    expect(SecurableTypes.PropertyTypeInEntitySet).toBeDefined();
    expect(SecurableTypes.PropertyTypeInEntitySet).toEqual(PropertyTypeInEntitySet);
  });

  test(`should export "${Organization}"`, () => {
    expect(SecurableTypes.Organization).toBeDefined();
    expect(SecurableTypes.Organization).toEqual(Organization);
  });

  test(`should export "${OrganizationRole}"`, () => {
    expect(SecurableTypes.OrganizationRole).toBeDefined();
    expect(SecurableTypes.OrganizationRole).toEqual(OrganizationRole);
  });

});
