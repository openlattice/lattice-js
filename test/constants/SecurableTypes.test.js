import SecurableTypes from '../../src/constants/types/SecurableTypes';

const AssociationType :string = 'AssociationType';
const ComplexType :string = 'ComplexType';
const EdgeType :string = 'EdgeType';
const EntitySet :string = 'EntitySet';
const EntityType :string = 'EntityType';
const DataSource :string = 'Datasource';
const LinkingEntityType :string = 'LinkingEntityType';
const PropertyTypeInEntitySet :string = 'PropertyTypeInEntitySet';
const Organization :string = 'Organization';
const OrganizationRole :string = 'OrganizationRole';

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
