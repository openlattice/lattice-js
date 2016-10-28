import * as ApiEndpoints from '../src/config/ApiEndpoints';
import * as ApiNames from '../src/constants/ApiNames';

describe('ApiEndpoints', () => {

  describe('getApiBaseUrl()', () => {

    it('should return the correct base URL when an API is not given', () => {
      expect(ApiEndpoints.getApiBaseUrl()).toEqual('http://localhost:8080');
    });

    it('should return the correct base URL when an incorrect API is given', () => {
      expect(ApiEndpoints.getApiBaseUrl('invalid')).toEqual('http://localhost:8080');
    });

    it('should return the correct DataApi base URL', () => {
      expect(ApiEndpoints.getApiBaseUrl(ApiNames.DATA_API)).toEqual('http://localhost:8080/ontology/data');
    });

    it('should return the correct EntityDataModelApi base URL', () => {
      expect(ApiEndpoints.getApiBaseUrl(ApiNames.EDM_API)).toEqual('http://localhost:8080/ontology');
    });

  });

});
