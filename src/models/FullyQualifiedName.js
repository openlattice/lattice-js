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
 * fqn.getFullyQualifiedName(); // "LATTICE.Data"
 */

import isObject from 'lodash/isObject';
import { isImmutable } from 'immutable';

import Logger from '../utils/Logger';
import { isNonEmptyString } from '../utils/LangUtils';

const LOG = new Logger('FullyQualifiedName');

type FqnObjectLiteral = {
  namespace :string,
  name :string
};

const EMPTY_FQN :FqnObjectLiteral = {
  namespace: '',
  name: ''
};

function parseFqnString(fullyQualifiedName :string) :FqnObjectLiteral {

  if (!isNonEmptyString(fullyQualifiedName)) {
    return EMPTY_FQN;
  }

  const dotIndex = fullyQualifiedName.lastIndexOf('.');

  if (dotIndex === -1 || dotIndex === 0 || dotIndex === fullyQualifiedName.length - 1) {
    return EMPTY_FQN;
  }

  const namespace :string = fullyQualifiedName.substring(0, dotIndex);
  const name :string = fullyQualifiedName.substring(dotIndex + 1);

  return {
    namespace,
    name
  };
}

function processArgs(...args :any[]) :FqnObjectLiteral {

  let namespace :string = '';
  let name :string = '';

  /*
   * case 1: a single parameter which can be either:
   *   - an instance of FullyQualifiedName
   *   - an object literal to represent a FullyQualifiedName
   *   - a FullyQualifiedName as a string
   */
  if (args.length === 1) {

    let fqnObj :FqnObjectLiteral = EMPTY_FQN;
    if (isObject(args[0])) {

      // if it's an object literal, it must have valid "namespace" and "name" properties
      const fqnArg :any = args[0];
      if (isNonEmptyString(fqnArg.namespace) && isNonEmptyString(fqnArg.name)) {
        fqnObj = fqnArg;
      }
      // since it's not a valid object literal, let's check if it a valid Immutable.Map
      else if (isImmutable(fqnArg)) {
        if (isNonEmptyString(fqnArg.get('namespace')) && isNonEmptyString(fqnArg.get('name'))) {
          fqnObj = {
            namespace: fqnArg.get('namespace'),
            name: fqnArg.get('name')
          };
        }
      }
    }
    else if (isNonEmptyString(args[0])) {

      // if it's a string, it must be a properly formatted FullyQualifiedName string
      const fqnStr :string = args[0];
      fqnObj = parseFqnString((fqnStr));
    }
    else {
      return EMPTY_FQN;
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
  else if (args.length === 2) {
    namespace = (args[0] :string);
    name = (args[1] :string);
  }
  else {
    return EMPTY_FQN;
  }

  if (!isNonEmptyString(namespace)) {
    return EMPTY_FQN;
  }

  if (!isNonEmptyString(name)) {
    return EMPTY_FQN;
  }

  return {
    namespace,
    name
  };
}

export default class FullyQualifiedName {

  namespace :string;
  name :string;

  static isValid = (...args :any[]) :boolean => {

    const { namespace, name } = processArgs(...args);
    return isNonEmptyString(namespace) && isNonEmptyString(name);
  }

  static toString = (...args :any[]) :string => {

    const { namespace, name } = processArgs(...args);
    return (isNonEmptyString(namespace) && isNonEmptyString(name))
      ? `${namespace}.${name}`
      : '';
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

  getFullyQualifiedName() :string {

    return (isNonEmptyString(this.namespace) && isNonEmptyString(this.name))
      ? `${this.namespace}.${this.name}`
      : '';
  }

  // for Immutable.js equality
  valueOf() :string {

    // TODO: use Immutable.hash()
    return this.getFullyQualifiedName();
  }
}
