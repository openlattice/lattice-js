import SecurableTypes from '../../src/constants/types/SecurableTypes';

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

  it(`should expose "${AssociationType}"`, () => {
    expect(SecurableTypes.AssociationType).toBeDefined();
    expect(SecurableTypes.AssociationType).toEqual(AssociationType);
  });

  it(`should expose "${ComplexType}"`, () => {
    expect(SecurableTypes.ComplexType).toBeDefined();
    expect(SecurableTypes.ComplexType).toEqual(ComplexType);
  });

  it(`should expose "${EdgeType}"`, () => {
    expect(SecurableTypes.EdgeType).toBeDefined();
    expect(SecurableTypes.EdgeType).toEqual(EdgeType);
  });

  it(`should expose "${EntitySet}"`, () => {
    expect(SecurableTypes.EntitySet).toBeDefined();
    expect(SecurableTypes.EntitySet).toEqual(EntitySet);
  });

  it(`should expose "${EntityType}"`, () => {
    expect(SecurableTypes.EntityType).toBeDefined();
    expect(SecurableTypes.EntityType).toEqual(EntityType);
  });

  it(`should expose "${DataSource}"`, () => {
    expect(SecurableTypes.DataSource).toBeDefined();
    expect(SecurableTypes.DataSource).toEqual(DataSource);
  });

  it(`should expose "${LinkingEntityType}"`, () => {
    expect(SecurableTypes.LinkingEntityType).toBeDefined();
    expect(SecurableTypes.LinkingEntityType).toEqual(LinkingEntityType);
  });

  it(`should expose "${PropertyTypeInEntitySet}"`, () => {
    expect(SecurableTypes.PropertyTypeInEntitySet).toBeDefined();
    expect(SecurableTypes.PropertyTypeInEntitySet).toEqual(PropertyTypeInEntitySet);
  });

  it(`should expose "${Organization}"`, () => {
    expect(SecurableTypes.Organization).toBeDefined();
    expect(SecurableTypes.Organization).toEqual(Organization);
  });

  it(`should expose "${OrganizationRole}"`, () => {
    expect(SecurableTypes.OrganizationRole).toBeDefined();
    expect(SecurableTypes.OrganizationRole).toEqual(OrganizationRole);
  });

});
