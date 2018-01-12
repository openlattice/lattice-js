/* eslint-disable import/no-named-as-default-member */

import PACKAGE from '../package.json';

import { OBJECT_TAG } from './utils/testing/TestUtils';

import * as Lattice from './index';

describe('lattice-js default export', () => {

  test('should export AnalysisApi', () => {
    expect(Object.prototype.toString.call(Lattice.AnalysisApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.AnalysisApi).length).toEqual(2);
  });

  test('should export AppApi', () => {
    expect(Object.prototype.toString.call(Lattice.AppApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.AppApi).length).toEqual(6);
  });

  test('should export AuthorizationApi', () => {
    expect(Object.prototype.toString.call(Lattice.AuthorizationApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.AuthorizationApi).length).toEqual(2);
  });

  test('should export DataApi', () => {
    expect(Object.prototype.toString.call(Lattice.DataApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.DataApi).length).toEqual(10);
  });

  test('should export DataSourcesApi', () => {
    expect(Object.prototype.toString.call(Lattice.DataSourcesApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.DataSourcesApi).length).toEqual(5);
  });

  test('should export EntityDataModelApi', () => {
    expect(Object.prototype.toString.call(Lattice.EntityDataModelApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.EntityDataModelApi).length).toEqual(57);
  });

  test('should export LinkingApi', () => {
    expect(Object.prototype.toString.call(Lattice.LinkingApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.LinkingApi).length).toEqual(2);
  });

  test('should export OrganizationsApi', () => {
    expect(Object.prototype.toString.call(Lattice.OrganizationsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.OrganizationsApi).length).toEqual(29);
  });

  test('should export PermissionsApi', () => {
    expect(Object.prototype.toString.call(Lattice.PermissionsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.PermissionsApi).length).toEqual(2);
  });

  test('should export PrincipalsApi', () => {
    expect(Object.prototype.toString.call(Lattice.PrincipalsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.PrincipalsApi).length).toEqual(6);
  });

  test('should export RequestsApi', () => {
    expect(Object.prototype.toString.call(Lattice.RequestsApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.RequestsApi).length).toEqual(3);
  });

  test('should export SearchApi', () => {
    expect(Object.prototype.toString.call(Lattice.SearchApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.SearchApi).length).toEqual(12);
  });

  test('should export SyncApi', () => {
    expect(Object.prototype.toString.call(Lattice.SyncApi)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.SyncApi).length).toEqual(1);
  });

  test('should export Models', () => {
    expect(Object.prototype.toString.call(Lattice.Models)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.Models).length).toEqual(37);
  });

  test('should export Types', () => {
    expect(Object.prototype.toString.call(Lattice.Models)).toEqual(OBJECT_TAG);
    expect(Object.keys(Lattice.Types).length).toEqual(6);
  });

  test('should export the correct version', () => {
    expect(Lattice.version).toEqual(PACKAGE.version);
  });

  test('should export configure()', () => {
    expect(Lattice.configure).toBeInstanceOf(Function);
  });

});
