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

  it('should expose DataApi', () => {
    expect(Loom.DataApi).toBeDefined();
    expect(Loom.DataApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.DataApi).length).toBeGreaterThan(0);
  });

  it('should expose EntityDataModelApi', () => {
    expect(Loom.EntityDataModelApi).toBeDefined();
    expect(Loom.EntityDataModelApi).toEqual(jasmine.any(Object));
    expect(Object.keys(Loom.EntityDataModelApi).length).toBeGreaterThan(0);
  });

});
