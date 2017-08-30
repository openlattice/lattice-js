import * as Lattice from '../src/index';

declare var __VERSION__;

describe('lattice-js', () => {

  it('should expose the correct version', () => {
    expect(Lattice.version).toBeDefined();
    expect(Lattice.version).toEqual(__VERSION__);
  });

  it('should expose configure()', () => {
    expect(Lattice.configure).toBeDefined();
    expect(Lattice.configure).toEqual(jasmine.any(Function));
  });

  it('should expose Models', () => {
    expect(Lattice.Models).toBeDefined();
    expect(Lattice.Models).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.Models).length).toEqual(35);
  });

  it('should expose Types', () => {
    expect(Lattice.Types).toBeDefined();
    expect(Lattice.Types).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.Types).length).toBeGreaterThan(0);
  });

  it('should expose AnalysisApi', () => {
    expect(Lattice.AnalysisApi).toBeDefined();
    expect(Lattice.AnalysisApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.AnalysisApi).length).toBeGreaterThan(0);
  });

  it('should expose AuthorizationApi', () => {
    expect(Lattice.AuthorizationApi).toBeDefined();
    expect(Lattice.AuthorizationApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.AuthorizationApi).length).toBeGreaterThan(0);
  });

  it('should expose DataApi', () => {
    expect(Lattice.DataApi).toBeDefined();
    expect(Lattice.DataApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.DataApi).length).toBeGreaterThan(0);
  });

  it('should expose DataSourcesApi', () => {
    expect(Lattice.DataSourcesApi).toBeDefined();
    expect(Lattice.DataSourcesApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.DataSourcesApi).length).toBeGreaterThan(0);
  });

  it('should expose EntityDataModelApi', () => {
    expect(Lattice.EntityDataModelApi).toBeDefined();
    expect(Lattice.EntityDataModelApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.EntityDataModelApi).length).toBeGreaterThan(0);
  });

  it('should expose LinkingApi', () => {
    expect(Lattice.LinkingApi).toBeDefined();
    expect(Lattice.LinkingApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.LinkingApi).length).toBeGreaterThan(0);
  });

  it('should expose OrganizationsApi', () => {
    expect(Lattice.OrganizationsApi).toBeDefined();
    expect(Lattice.OrganizationsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.OrganizationsApi).length).toBeGreaterThan(0);
  });

  it('should expose PermissionsApi', () => {
    expect(Lattice.PermissionsApi).toBeDefined();
    expect(Lattice.PermissionsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.PermissionsApi).length).toBeGreaterThan(0);
  });

  it('should expose PrincipalsApi', () => {
    expect(Lattice.PrincipalsApi).toBeDefined();
    expect(Lattice.PrincipalsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.PrincipalsApi).length).toBeGreaterThan(0);
  });

  it('should expose RequestsApi', () => {
    expect(Lattice.RequestsApi).toBeDefined();
    expect(Lattice.RequestsApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.RequestsApi).length).toBeGreaterThan(0);
  });

  it('should expose SearchApi', () => {
    expect(Lattice.SearchApi).toBeDefined();
    expect(Lattice.SearchApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.SearchApi).length).toBeGreaterThan(0);
  });

  it('should expose SyncApi', () => {
    expect(Lattice.SyncApi).toBeDefined();
    expect(Lattice.SyncApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Lattice.SyncApi).length).toBeGreaterThan(0);
  });

});
