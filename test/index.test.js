import * as Loom from '../src/index';

declare var __VERSION__ :string;

describe('loom-data-js', () => {

  it('should expose the correct version', () => {
    expect(Loom.version).toBeDefined();
    expect(Loom.version).toEqual(__VERSION__);
  });

  it('should expose configure()', () => {
    expect(Loom.configure).toBeDefined();
    expect(Loom.configure).toEqual(jasmine.any(Function));
  });

  it('should expose DataModels', () => {
    expect(Loom.DataModels).toBeDefined();
    expect(Loom.DataModels).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.DataModels).length).toBeGreaterThan(0);
  });

  it('should expose Types', () => {
    expect(Loom.Types).toBeDefined();
    expect(Loom.Types).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.Types).length).toBeGreaterThan(0);
  });

  it('should expose AuthorizationApi', () => {
    expect(Loom.AuthorizationApi).toBeDefined();
    expect(Loom.AuthorizationApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.AuthorizationApi).length).toBeGreaterThan(0);
  });

  it('should expose DataApi', () => {
    expect(Loom.DataApi).toBeDefined();
    expect(Loom.DataApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.DataApi).length).toBeGreaterThan(0);
  });

  it('should expose DataSourcesApi', () => {
    expect(Loom.DataSourcesApi).toBeDefined();
    expect(Loom.DataSourcesApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.DataSourcesApi).length).toBeGreaterThan(0);
  });

  it('should expose EntityDataModelApi', () => {
    expect(Loom.EntityDataModelApi).toBeDefined();
    expect(Loom.EntityDataModelApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.EntityDataModelApi).length).toBeGreaterThan(0);
  });

  it('should expose LinkingApi', () => {
    expect(Loom.LinkingApi).toBeDefined();
    expect(Loom.LinkingApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.LinkingApi).length).toBeGreaterThan(0);
  });

  it('should expose OrganizationsApi', () => {
    expect(Loom.OrganizationsApi).toBeDefined();
    expect(Loom.OrganizationsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.OrganizationsApi).length).toBeGreaterThan(0);
  });

  it('should expose PermissionsApi', () => {
    expect(Loom.PermissionsApi).toBeDefined();
    expect(Loom.PermissionsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.PermissionsApi).length).toBeGreaterThan(0);
  });

  it('should expose PrincipalsApi', () => {
    expect(Loom.PrincipalsApi).toBeDefined();
    expect(Loom.PrincipalsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.PrincipalsApi).length).toBeGreaterThan(0);
  });

  it('should expose RequestsApi', () => {
    expect(Loom.RequestsApi).toBeDefined();
    expect(Loom.RequestsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.RequestsApi).length).toBeGreaterThan(0);
  });

  it('should expose SearchApi', () => {
    expect(Loom.SearchApi).toBeDefined();
    expect(Loom.SearchApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.SearchApi).length).toBeGreaterThan(0);
  });

});
