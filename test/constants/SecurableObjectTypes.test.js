import SecurableObjectTypes from '../../src/constants/SecurableObjectTypes';

const EntitySet :string = 'EntitySet';
const EntityType :string = 'EntityType';
const PropertyTypeInEntitySet :string = 'PropertyTypeInEntitySet';
const DataSource :string = 'Datasource';
const Organization :string = 'Organization';

describe('SecurableObjectTypes', () => {

  it(`should expose "${EntityType}"`, () => {
    expect(SecurableObjectTypes.EntityType).toBeDefined();
    expect(SecurableObjectTypes.EntityType).toEqual(EntityType);
  });

  it(`should expose "${EntitySet}"`, () => {
    expect(SecurableObjectTypes.EntitySet).toBeDefined();
    expect(SecurableObjectTypes.EntitySet).toEqual(EntitySet);
  });

  it(`should expose "${PropertyTypeInEntitySet}"`, () => {
    expect(SecurableObjectTypes.PropertyTypeInEntitySet).toBeDefined();
    expect(SecurableObjectTypes.PropertyTypeInEntitySet).toEqual(PropertyTypeInEntitySet);
  });

  it(`should expose "${DataSource}"`, () => {
    expect(SecurableObjectTypes.DataSource).toBeDefined();
    expect(SecurableObjectTypes.DataSource).toEqual(DataSource);
  });

  it(`should expose "${Organization}"`, () => {
    expect(SecurableObjectTypes.Organization).toBeDefined();
    expect(SecurableObjectTypes.Organization).toEqual(Organization);
  });

});
