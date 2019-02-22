import { Map } from 'immutable';

import AnalyzerTypes from './AnalyzerTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  METAPHONE: 'METAPHONE',
  NONE: 'NONE',
  NOT_ANALYZED: 'NOT_ANALYZED',
  STANDARD: 'STANDARD',
}).sortBy((value, key) => key);

describe('AnalyzerTypes', () => {

  testEnumIntegrity(AnalyzerTypes, EXPECTED_ENUM);

});
