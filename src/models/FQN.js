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
 * @class FQN
 * @memberof lattice
 *
 * @example
 * // create from an object literal
 * const fqn = new FQN({
 *   namespace: "OL",
 *   name: "DATA"
 * });
 *
 * @example
 * // create from separate "namespace" and "name" parameters
 * const fqn = new FQN("OL", "DATA");
 *
 * @example
 * // create from a fully qualified name string, from which "namespace" and "name" will be parsed
 * const fqn = new FQN("OL.DATA");
 *
 * @example
 * // usage:
 * fqn.getNamespace(); // "OL"
 * fqn.getName(); // "DATA"
 * fqn.toString(); // "OL.DATA"
 */

import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { isImmutable } from 'immutable';

import Logger from '../utils/Logger';
import { isNonEmptyString } from '../utils/LangUtils';

const LOG = new Logger('FQN');
const FQN_MAX_LENGTH :63 = 63;

type FQNObject = {|
  namespace :string;
  name :string;
|};

function parseStringAsFQN(fqn :string) :FQNObject {

  if (!isNonEmptyString(fqn)) {
    return { namespace: '', name: '' };
  }

  const dotIndex = fqn.lastIndexOf('.');

  if (dotIndex === -1 || dotIndex === 0 || dotIndex === fqn.length - 1) {
    return { namespace: '', name: '' };
  }

  const namespace :string = fqn.substring(0, dotIndex);
  const name :string = fqn.substring(dotIndex + 1);

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
   *   - an FQN instance
   *   - an FQN as an object literal
   *   - an FQN as a string
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

      // if it's a string, it must be a properly formatted FQN string
      const fqn :string = args[0];
      fqnObj = parseStringAsFQN(fqn);
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

function toString(namespace :string, name :string, throwIfInvalid = false) :string {

  let errorMsg = '';

  if (isNonEmptyString(namespace)) {
    if (isNonEmptyString(name)) {
      const fqn = `${namespace}.${name}`;
      if (fqn.length <= FQN_MAX_LENGTH) {
        return fqn;
      }
      errorMsg = `invalid FQN: FQNs must be <= ${FQN_MAX_LENGTH} characters, got ${fqn.length}`;
    }
    else {
      errorMsg = 'invalid FQN: name must be a non-empty string';
    }
  }
  else {
    errorMsg = 'invalid FQN: namespace must be a non-empty string';
  }

  if (throwIfInvalid === true) {
    LOG.error(errorMsg);
    throw new Error(errorMsg);
  }

  return '';
}

export default class FQN {

  namespace :string;
  name :string;

  static of = (...args :any[]) => new FQN(...args)

  static isValid = (...args :any[]) :boolean => {

    if (args.length !== 1 && args.length !== 2) {
      return false;
    }

    const { namespace, name } = processArgs(...args);
    return toString(namespace, name) !== '';
  }

  static toString = (...args :any[]) :string => {

    if (args.length !== 1 && args.length !== 2) {
      return '';
    }

    const { namespace, name } = processArgs(...args);
    return toString(namespace, name);
  }

  constructor(...args :any[]) {

    if (args.length !== 1 && args.length !== 2) {
      const error = `invalid parameter count: FQN takes only 1 or 2 parameters, got ${args.length}`;
      LOG.error(error);
      throw new Error(error);
    }

    const { namespace, name } = processArgs(...args);
    toString(namespace, name, true);

    this.namespace = namespace;
    this.name = name;
  }

  getNamespace() :string {

    return this.namespace;
  }

  getName() :string {

    return this.name;
  }

  toObject() :FQNObject {

    const { namespace, name } = this;
    if (toString(namespace, name) === '') {
      return { namespace: '', name: '' };
    }
    return { namespace, name };
  }

  toString() :string {

    return toString(this.namespace, this.name);
  }

  valueOf() :string {

    return this.toString();
  }
}

export type {
  FQNObject,
};
