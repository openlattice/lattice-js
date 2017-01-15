import SecurableTypes from '../../src/constants/types/SecurableTypes';

const EntitySet :string = 'EntitySet';
const EntityType :string = 'EntityType';
const PropertyTypeInEntitySet :string = 'PropertyTypeInEntitySet';
const DataSource :string = 'Datasource';
const Organization :string = 'Organization';

describe('SecurableTypes', () => {

  it(`should expose "${EntityType}"`, () => {
    expect(SecurableTypes.EntityType).toBeDefined();
    expect(SecurableTypes.EntityType).toEqual(EntityType);
  });

  it(`should expose "${EntitySet}"`, () => {
    expect(SecurableTypes.EntitySet).toBeDefined();
    expect(SecurableTypes.EntitySet).toEqual(EntitySet);
  });

  it(`should expose "${PropertyTypeInEntitySet}"`, () => {
    expect(SecurableTypes.PropertyTypeInEntitySet).toBeDefined();
    expect(SecurableTypes.PropertyTypeInEntitySet).toEqual(PropertyTypeInEntitySet);
  });

  it(`should expose "${DataSource}"`, () => {
    expect(SecurableTypes.DataSource).toBeDefined();
    expect(SecurableTypes.DataSource).toEqual(DataSource);
  });

  it(`should expose "${Organization}"`, () => {
    expect(SecurableTypes.Organization).toBeDefined();
    expect(SecurableTypes.Organization).toEqual(Organization);
  });

});
