/*
 * @flow
 */

/**
 * A class to represent a fully qualified name, which is simply an object literal of the following form:
 *
 * ```
 * {
 *   namespace :string,
 *   name :string
 * }
 * ```
 *
 * @class FullyQualifiedName
 * @memberof lattice
 *
 * @example
 * // create from an object literal
 * const fqn = new FullyQualifiedName({
 *   namespace: "LATTICE",
 *   name: "Data"
 * });
 *
 * @example
 * // create from separate "namespace" and "name" parameters
 * const fqn = new FullyQualifiedName("LATTICE", "Data");
 *
 * @example
 * // create from a fully qualified name string, from which "namespace" and "name" will be parsed
 * const fqn = new FullyQualifiedName("LATTICE.Data");
 *
 * @example
 * // usage:
 * fqn.getNamespace(); // "LATTICE"
 * fqn.getName(); // "Data"
 * fqn.toString(); // "LATTICE.Data"
 */

import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { isImmutable } from 'immutable';

import Logger from '../utils/Logger';
import { isNonEmptyString } from '../utils/LangUtils';

const LOG = new Logger('FullyQualifiedName');

type FQNObject = {|
  namespace :string;
  name :string;
|};

function parseFqnString(fullyQualifiedName :string) :FQNObject {

  if (!isNonEmptyString(fullyQualifiedName)) {
    return { namespace: '', name: '' };
  }

  const dotIndex = fullyQualifiedName.lastIndexOf('.');

  if (dotIndex === -1 || dotIndex === 0 || dotIndex === fullyQualifiedName.length - 1) {
    return { namespace: '', name: '' };
  }

  const namespace :string = fullyQualifiedName.substring(0, dotIndex);
  const name :string = fullyQualifiedName.substring(dotIndex + 1);

  return {
    namespace,
    name
  };
}

function processArgs(...args :any[]) :FQNObject {

  let namespace :string = '';
  let name :string = '';

  /*
   * case 1: a single parameter which can be either:
   *   - an instance of FullyQualifiedName
   *   - an object literal to represent a FullyQualifiedName
   *   - a FullyQualifiedName as a string
   */
  if (args.length === 1) {

    let fqnObj :Object = {};
    if (isObject(args[0])) {

      const fqnArg :any = args[0];

      // if it's an immutable object or an object literal, it must have valid "namespace" and "name" properties
      if (isImmutable(fqnArg)) {
        if (isNonEmptyString(fqnArg.get('namespace'))) {
          fqnObj.namespace = fqnArg.get('namespace');
        }
        if (isNonEmptyString(fqnArg.get('name'))) {
          fqnObj.name = fqnArg.get('name');
        }
      }
      else {
        if (isNonEmptyString(fqnArg.namespace)) {
          fqnObj.namespace = fqnArg.namespace;
        }
        if (isNonEmptyString(fqnArg.name)) {
          fqnObj.name = fqnArg.name;
        }
      }
    }
    else if (isString(args[0])) {

      // if it's a string, it must be a properly formatted FullyQualifiedName string
      const fqnStr :string = args[0];
      fqnObj = parseFqnString(fqnStr);
    }

    /* eslint-disable prefer-destructuring */
    namespace = fqnObj.namespace;
    name = fqnObj.name;
    /* eslint-enable */
  }
  /*
   * case 2: two parameters
   *   - namespace
   *   - name
   */
  else {
    namespace = (args[0] :string);
    name = (args[1] :string);
  }

  return {
    namespace,
    name
  };
}

function toFqnString(namespace :any, name :any) :string {

  return (isNonEmptyString(namespace) && isNonEmptyString(name))
    ? `${namespace}.${name}`
    : '';
}

export default class FullyQualifiedName {

  namespace :string;
  name :string;

  static isValid = (...args :any[]) :boolean => {

    if (args.length !== 1 && args.length !== 2) {
      return false;
    }

    const { namespace, name } = processArgs(...args);
    return isNonEmptyString(namespace) && isNonEmptyString(name);
  }

  static toString = (...args :any[]) :string => {

    if (args.length !== 1 && args.length !== 2) {
      return '';
    }

    const { namespace, name } = processArgs(...args);
    return toFqnString(namespace, name);
  }

  constructor(...args :any[]) {

    if (args.length !== 1 && args.length !== 2) {
      const error = `invalid parameter count: FullyQualifiedName takes only 1 or 2 parameters, got ${args.length}`;
      LOG.error(error);
      throw new Error(error);
    }

    const { namespace, name } = processArgs(...args);

    if (!isNonEmptyString(namespace)) {
      const error = 'invalid FQN: namespace must be a non-empty string';
      LOG.error(error);
      throw new Error(error);
    }

    if (!isNonEmptyString(name)) {
      const error = 'invalid FQN: name must be a non-empty string';
      LOG.error(error);
      throw new Error(error);
    }

    this.namespace = namespace;
    this.name = name;
  }

  getNamespace() :string {

    return this.namespace;
  }

  getName() :string {

    return this.name;
  }

  /**
   * @deprecated
   */
  getFullyQualifiedName() :string {

    LOG.warn('getFullyQualifiedName() is deprecated. Please use toString() instead.');
    return this.toString();
  }

  toObject() :FQNObject {

    return (isNonEmptyString(this.namespace) && isNonEmptyString(this.name))
      ? {
        namespace: this.namespace,
        name: this.name
      }
      : {
        namespace: '',
        name: ''
      };
  }

  toString() :string {

    return toFqnString(this.namespace, this.name);
  }

  // for Immutable.js equality
  valueOf() :string {

    // TODO: use Immutable.hash()
    return this.toString();
  }
}

type FQN = FullyQualifiedName;

export type {
  FQN,
  FQNObject,
};
