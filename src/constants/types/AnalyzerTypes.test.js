import { Map } from 'immutable';

import AnalyzerTypes from './AnalyzerTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  METAPHONE: 'METAPHONE',
  STANDARD: 'STANDARD',
}).sort();

describe('AnalyzerTypes', () => {

  testEnumIntegrity(AnalyzerTypes, EXPECTED_ENUM);

});
