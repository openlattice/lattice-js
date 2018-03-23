/* eslint-disable import/no-named-as-default-member */

import PACKAGE from '../package.json';

import { OBJECT_TAG } from './utils/testing/TestUtils';

import Lattice from './index';

describe('lattice-js default export', () => {

  test('should export AnalysisApi', () => {
    expect(Object.prototype.toString.call(Lattice.AnalysisApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.AnalysisApi)).toHaveLength(2);
  });

  test('should export AppApi', () => {
    expect(Object.prototype.toString.call(Lattice.AppApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.AppApi)).toHaveLength(18);
  });

  test('should export AuthorizationApi', () => {
    expect(Object.prototype.toString.call(Lattice.AuthorizationApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.AuthorizationApi)).toHaveLength(2);
  });

  test('should export DataApi', () => {
    expect(Object.prototype.toString.call(Lattice.DataApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.DataApi)).toHaveLength(12);
  });

  test('should export DataSourcesApi', () => {
    expect(Object.prototype.toString.call(Lattice.DataSourcesApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.DataSourcesApi)).toHaveLength(5);
  });

  test('should export EntityDataModelApi', () => {
    expect(Object.prototype.toString.call(Lattice.EntityDataModelApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.EntityDataModelApi)).toHaveLength(57);
  });

  test('should export LinkingApi', () => {
    expect(Object.prototype.toString.call(Lattice.LinkingApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.LinkingApi)).toHaveLength(2);
  });

  test('should export OrganizationsApi', () => {
    expect(Object.prototype.toString.call(Lattice.OrganizationsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.OrganizationsApi)).toHaveLength(23);
  });

  test('should export PermissionsApi', () => {
    expect(Object.prototype.toString.call(Lattice.PermissionsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.PermissionsApi)).toHaveLength(2);
  });

  test('should export PrincipalsApi', () => {
    expect(Object.prototype.toString.call(Lattice.PrincipalsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.PrincipalsApi)).toHaveLength(6);
  });

  test('should export RequestsApi', () => {
    expect(Object.prototype.toString.call(Lattice.RequestsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.RequestsApi)).toHaveLength(3);
  });

  test('should export SearchApi', () => {
    expect(Object.prototype.toString.call(Lattice.SearchApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.SearchApi)).toHaveLength(12);
  });

  test('should export SyncApi', () => {
    expect(Object.prototype.toString.call(Lattice.SyncApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.SyncApi)).toHaveLength(1);
  });

  test('should export Models', () => {
    expect(Object.prototype.toString.call(Lattice.Models)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.Models)).toHaveLength(41);
  });

  test('should export Types', () => {
    expect(Object.prototype.toString.call(Lattice.Models)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.Types)).toHaveLength(6);
  });

  test('should export the correct version', () => {
    expect(Lattice.version).toEqual(PACKAGE.version);
  });

  test('should export configure()', () => {
    expect(Lattice.configure).toBeInstanceOf(Function);
  });

});
