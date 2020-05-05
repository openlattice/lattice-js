/*
 * @flow
 */

import {
  APP_TYPE_MOCK,
  AppType,
  AppTypeBuilder,
  genRandomAppType,
  isValidAppType,
} from './AppType';

import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  AppType,
  AppTypeBuilder,
  APP_TYPE_MOCK,
  isValidAppType,
  genRandomAppType,
  {
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [APP_TYPE_MOCK.description],
    },
    setEntityTypeId: {
      field: 'entityTypeId',
      validParams: [APP_TYPE_MOCK.entityTypeId],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [APP_TYPE_MOCK.id],
    },
    setTitle: {
      field: 'title',
      validParams: [APP_TYPE_MOCK.title],
    },
    setType: {
      field: 'type',
      validParams: [APP_TYPE_MOCK.type],
    },
  }
);
