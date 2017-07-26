/* eslint-disable no-use-before-define */

import Principal from '../../src/models/Principal';

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as OrganizationsApi from '../../src/api/OrganizationsApi';

import {
  ORGANIZATIONS_API
} from '../../src/constants/ApiNames';

import {
  DESCRIPTION_PATH,
  EMAIL_DOMAINS_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  ROLES_PATH,
  TITLE_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_ORGANIZATION_DM,
  MOCK_ROLE_DM
} from '../constants/MockDataModels';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_TITLE = 'MyOrganization';
const MOCK_DESCRIPTION = 'what an organization';
const MOCK_EMAIL_DOMAIN = 'openlattice.com';

const MOCK_PRINCIPAL_TYPE = 'USER';
const MOCK_PRINCIPAL_ID = 'principalId';

const MOCK_USER_PRINCIPAL = {
  type: 'USER',
  id: 'principalId_0'
};

const MOCK_ROLE_PRINCIPAL = {
  type: 'ROLE',
  id: 'principalId_1'
};

const MOCK_MEMBER_ID = 'google-oauth2|850284592837234579086';

let mockAxiosInstance = null;

describe('OrganizationsApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
  });

  testGetOrganization();
  testGetAllOrganizations();
  testCreateOrganization();
  testDeleteOrganization();
  testUpdateTitle();
  testUpdateDescription();
  testGetAutoApprovedEmailDomains();
  testAddAutoApprovedEmailDomain();
  testAddAutoApprovedEmailDomains();
  testSetAutoApprovedEmailDomains();
  testRemoveAutoApprovedEmailDomain();
  testRemoveAutoApprovedEmailDomains();
  testGetAllPrincipals();
  testAddPrincipal();
  testAddPrincipals();
  testSetPrincipals();
  testRemovePrincipal();
  testRemovePrincipals();
  testGetRole();
  testGetAllRoles();
  testCreateRole();
  testDeleteRole();
  testUpdateRoleTitle();
  testUpdateRoleDescription();
  testAddRoleToMember();
  testRemoveRoleFromMember();
});

function testGetOrganization() {

  describe('getOrganization()', () => {

    const functionToTest :Function = OrganizationsApi.getOrganization;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getOrganization(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllOrganizations() {

  describe('getAllOrganizations()', () => {

    const functionToTest :Function = OrganizationsApi.getAllOrganizations;

    const validParams :any[] = [];
    const invalidParams :any[] = [];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAllOrganizations()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith('/');
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateOrganization() {

  describe('createOrganization()', () => {

    const functionToTest :Function = OrganizationsApi.createOrganization;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.createOrganization(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/',
            MOCK_ORGANIZATION_DM
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testDeleteOrganization() {

  describe('deleteOrganization()', () => {

    const functionToTest :Function = OrganizationsApi.deleteOrganization;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.deleteOrganization(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateTitle() {

  describe('updateTitle()', () => {

    const functionToTest :Function = OrganizationsApi.updateTitle;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_TITLE
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.updateTitle(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${TITLE_PATH}`,
            MOCK_TITLE,
            {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateDescription() {

  describe('updateDescription()', () => {

    const functionToTest :Function = OrganizationsApi.updateDescription;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_DESCRIPTION
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.updateDescription(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${DESCRIPTION_PATH}`,
            MOCK_DESCRIPTION,
            {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAutoApprovedEmailDomains() {

  describe('getAutoApprovedEmailDomains()', () => {

    const functionToTest :Function = OrganizationsApi.getAutoApprovedEmailDomains;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAutoApprovedEmailDomains(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAddAutoApprovedEmailDomain() {

  describe('addAutoApprovedEmailDomain()', () => {

    const functionToTest :Function = OrganizationsApi.addAutoApprovedEmailDomain;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_EMAIL_DOMAIN
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.addAutoApprovedEmailDomain(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAddAutoApprovedEmailDomains() {

  describe('addAutoApprovedEmailDomains()', () => {

    const functionToTest :Function = OrganizationsApi.addAutoApprovedEmailDomains;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      [MOCK_EMAIL_DOMAIN]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.addAutoApprovedEmailDomains(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a POST request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.addAutoApprovedEmailDomains(MOCK_ORGANIZATION_DM.id, [MOCK_EMAIL_DOMAIN, MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSetAutoApprovedEmailDomains() {

  describe('setAutoApprovedEmailDomains()', () => {

    const functionToTest :Function = OrganizationsApi.setAutoApprovedEmailDomains;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      [MOCK_EMAIL_DOMAIN]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.setAutoApprovedEmailDomains(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a PUT request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.setAutoApprovedEmailDomains(MOCK_ORGANIZATION_DM.id, [MOCK_EMAIL_DOMAIN, MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testRemoveAutoApprovedEmailDomain() {

  describe('removeAutoApprovedEmailDomain()', () => {

    const functionToTest :Function = OrganizationsApi.removeAutoApprovedEmailDomain;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_EMAIL_DOMAIN
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.removeAutoApprovedEmailDomain(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testRemoveAutoApprovedEmailDomains() {

  describe('removeAutoApprovedEmailDomains()', () => {

    const functionToTest :Function = OrganizationsApi.removeAutoApprovedEmailDomains;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      [MOCK_EMAIL_DOMAIN]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      OrganizationsApi.removeAutoApprovedEmailDomains(...validParams)
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
            method: 'delete',
            data: [MOCK_EMAIL_DOMAIN]
          });
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a DELETE request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.removeAutoApprovedEmailDomains(MOCK_ORGANIZATION_DM.id, [MOCK_EMAIL_DOMAIN, MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
            method: 'delete',
            data: [MOCK_EMAIL_DOMAIN]
          });
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllPrincipals() {

  describe('getAllPrincipals()', () => {

    const functionToTest :Function = OrganizationsApi.getAllPrincipals;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAllPrincipals(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAddPrincipal() {

  describe('addPrincipal()', () => {

    const functionToTest :Function = OrganizationsApi.addPrincipal;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_PRINCIPAL_TYPE,
      MOCK_PRINCIPAL_ID
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.addPrincipal(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${MOCK_PRINCIPAL_TYPE}/${MOCK_PRINCIPAL_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAddPrincipals() {

  describe('addPrincipals()', () => {

    const functionToTest :Function = OrganizationsApi.addPrincipals;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.addPrincipals(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`,
            [
              // TODO: figure out how to avoid having to do this...
              new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id),
              new Principal(MOCK_ROLE_PRINCIPAL.type, MOCK_ROLE_PRINCIPAL.id)
            ]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a POST request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.addPrincipals(MOCK_ORGANIZATION_DM.id, [MOCK_USER_PRINCIPAL, MOCK_USER_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`,
            // TODO: figure out how to avoid having to do this...
            [new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id)]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSetPrincipals() {

  describe('setPrincipals()', () => {

    const functionToTest :Function = OrganizationsApi.setPrincipals;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.setPrincipals(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`,
            [
              // TODO: figure out how to avoid having to do this...
              new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id),
              new Principal(MOCK_ROLE_PRINCIPAL.type, MOCK_ROLE_PRINCIPAL.id)
            ]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a PUT request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.setPrincipals(MOCK_ORGANIZATION_DM.id, [MOCK_USER_PRINCIPAL, MOCK_USER_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`,
            // TODO: figure out how to avoid having to do this...
            [new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id)]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testRemovePrincipal() {

  describe('removePrincipal()', () => {

    const functionToTest :Function = OrganizationsApi.removePrincipal;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_PRINCIPAL_TYPE,
      MOCK_PRINCIPAL_ID
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.removePrincipal(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${MOCK_PRINCIPAL_TYPE}/${MOCK_PRINCIPAL_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testRemovePrincipals() {

  describe('removePrincipals()', () => {

    const functionToTest :Function = OrganizationsApi.removePrincipals;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL]
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      OrganizationsApi.removePrincipals(...validParams)
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`,
            method: 'delete',
            data: [
              // TODO: figure out how to avoid having to do this...
              new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id),
              new Principal(MOCK_ROLE_PRINCIPAL.type, MOCK_ROLE_PRINCIPAL.id)
            ]
          });
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a DELETE request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.removePrincipals(MOCK_ORGANIZATION_DM.id, [MOCK_USER_PRINCIPAL, MOCK_USER_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}`,
            method: 'delete',
            data: [
              // TODO: figure out how to avoid having to do this...
              new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id)
            ]
          });
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetRole() {

  describe('getRole()', () => {

    const functionToTest :Function = OrganizationsApi.getRole;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_ROLE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getRole(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAllRoles() {

  describe('getAllRoles()', () => {

    const functionToTest :Function = OrganizationsApi.getAllRoles;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAllRoles(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateRole() {

  describe('createRole()', () => {

    const functionToTest :Function = OrganizationsApi.createRole;

    const validParams :any[] = [
      MOCK_ROLE_DM
    ];

    const invalidParams :any[] = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.createRole(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${ROLES_PATH}`,
            MOCK_ROLE_DM
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testDeleteRole() {

  describe('deleteRole()', () => {

    const functionToTest :Function = OrganizationsApi.deleteRole;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_ROLE_DM.id
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.deleteRole(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateRoleTitle() {

  describe('updateRoleTitle()', () => {

    const functionToTest :Function = OrganizationsApi.updateRoleTitle;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_ROLE_DM.id,
      MOCK_TITLE
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.updateRoleTitle(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${TITLE_PATH}`,
            MOCK_TITLE,
            {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testUpdateRoleDescription() {

  describe('updateRoleDescription()', () => {

    const functionToTest :Function = OrganizationsApi.updateRoleDescription;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_ROLE_DM.id,
      MOCK_DESCRIPTION
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.updateRoleDescription(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${DESCRIPTION_PATH}`,
            MOCK_DESCRIPTION,
            {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testAddRoleToMember() {

  describe('addRoleToMember()', () => {

    const functionToTest :Function = OrganizationsApi.addRoleToMember;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_ROLE_DM.id,
      MOCK_MEMBER_ID
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a PUT request with the correct URL path', (done) => {

      OrganizationsApi.addRoleToMember(...validParams)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            /* eslint-disable max-len */
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
            /* eslint-enable */
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testRemoveRoleFromMember() {

  describe('removeRoleFromMember()', () => {

    const functionToTest :Function = OrganizationsApi.removeRoleFromMember;

    const validParams :any[] = [
      MOCK_ORGANIZATION_DM.id,
      MOCK_ROLE_DM.id,
      MOCK_MEMBER_ID
    ];

    const invalidParams :any[] = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.removeRoleFromMember(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            /* eslint-disable max-len */
            `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
            /* eslint-enable */
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, ORGANIZATIONS_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
