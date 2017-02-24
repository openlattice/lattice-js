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
 * @memberof loom-data
 *
 * @example
 * // create from an object literal
 * const fqn = new FullyQualifiedName({
 *   namespace: "LOOM",
 *   name: "Data"
 * });
 *
 * @example
 * // create from separate "namespace" and "name" parameters
 * const fqn = new FullyQualifiedName("LOOM", "Data");
 *
 * @example
 * // create from a fully qualified name string, from which "namespace" and "name" will be parsed
 * const fqn = new FullyQualifiedName("LOOM.Data");
 *
 * @example
 * // usage:
 * fqn.getNamespace(); // "LOOM"
 * fqn.getName(); // "Data"
 * fqn.getFullyQualifiedName(); // "LOOM.Data"
 */

import isObject from 'lodash/isObject';

import {
  isNonEmptyString
} from '../utils/LangUtils';

type FqnObjectLiteral = {
  namespace :string,
  name :string
};

const EMPTY_FQN :FqnObjectLiteral = {
  namespace: '',
  name: ''
};

function parseFqnString(fullyQualifiedName :string) :Object {

  if (!isNonEmptyString(fullyQualifiedName)) {
    return EMPTY_FQN;
  }

  const dotIndex = fullyQualifiedName.lastIndexOf('.');

  if (dotIndex === -1 || dotIndex === 0 || dotIndex === fullyQualifiedName.length - 1) {
    return EMPTY_FQN;
  }

  const namespace = fullyQualifiedName.substring(0, dotIndex);
  const name = fullyQualifiedName.substring(dotIndex + 1);

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
      const fqnArg :FqnObjectLiteral = args[0];
      if (isNonEmptyString(fqnArg.namespace) && isNonEmptyString(fqnArg.name)) {
        fqnObj = fqnArg;
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

    namespace = fqnObj.namespace;
    name = fqnObj.name;
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

  constructor(...args :any[]) {

    if (args.length !== 1 && args.length !== 2) {
      throw new Error(`invalid parameter count: FullyQualifiedName takes only 1 or 2 parameters, got ${args.length}`);
    }

    const { namespace, name } = processArgs(...args);

    if (!isNonEmptyString(namespace)) {
      throw new Error('invalid FQN: namespace must be a non-empty string');
    }

    if (!isNonEmptyString(name)) {
      throw new Error('invalid FQN: name must be a non-empty string');
    }

    this.namespace = namespace;
    this.name = name;
  }

  getNamespace() {

    return this.namespace;
  }

  getName() {

    return this.name;
  }

  getFullyQualifiedName() {

    return (isNonEmptyString(this.namespace) && isNonEmptyString(this.name))
      ? `${this.namespace}.${this.name}`
      : '';
  }

  // for Immutable.js equality
  valueOf() {

    // TODO: use Immutable.hash()
    return this.getFullyQualifiedName();
  }
}
