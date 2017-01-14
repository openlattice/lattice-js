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
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters,
  testApiFunctionShouldReturnPromiseOnValidParameters
} from '../utils/ApiTestUtils';

import {
  getMockAxiosInstance
} from '../utils/MockDataUtils';

const MOCK_ORG_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_TITLE = 'MyOrganization';
const MOCK_DESCRIPTION = 'what an organization';
const MOCK_EMAIL_DOMAIN = 'kryptnostic.com';

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

const MOCK_ORG = {
  id: MOCK_ORG_UUID,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  members: [MOCK_USER_PRINCIPAL],
  roles: [MOCK_ROLE_PRINCIPAL]
};

let mockAxiosInstance = null;

fdescribe('OrganizationsApi', () => {

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
  testGetAllRoles();
  testGetAllMembers();
});

function testGetOrganization() {

  describe('getOrganization()', () => {

    const functionInvocation = [
      OrganizationsApi.getOrganization, MOCK_ORG_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getOrganization(MOCK_ORG_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllOrganizations() {

  describe('getAllOrganizations()', () => {

    const functionInvocation = [
      OrganizationsApi.getAllOrganizations
    ];

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

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testCreateOrganization() {

  describe('createOrganization()', () => {

    const functionInvocation = [
      OrganizationsApi.createOrganization, MOCK_ORG
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.createOrganization(MOCK_ORG)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/',
            MOCK_ORG
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testDeleteOrganization() {

  describe('deleteOrganization()', () => {

    const functionInvocation = [
      OrganizationsApi.deleteOrganization, MOCK_ORG_UUID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.deleteOrganization(MOCK_ORG_UUID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testUpdateTitle() {

  describe('updateTitle()', () => {

    const functionInvocation = [
      OrganizationsApi.updateTitle, MOCK_ORG_UUID, MOCK_TITLE
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.updateTitle(MOCK_ORG_UUID, MOCK_TITLE)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${TITLE_PATH}`,
            MOCK_TITLE
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testUpdateDescription() {

  describe('updateDescription()', () => {

    const functionInvocation = [
      OrganizationsApi.updateDescription, MOCK_ORG_UUID, MOCK_DESCRIPTION
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.updateDescription(MOCK_ORG_UUID, MOCK_DESCRIPTION)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${DESCRIPTION_PATH}`,
            MOCK_DESCRIPTION
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAutoApprovedEmailDomains() {

  describe('getAutoApprovedEmailDomains()', () => {

    const functionInvocation = [
      OrganizationsApi.getAutoApprovedEmailDomains, MOCK_ORG_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAutoApprovedEmailDomains(MOCK_ORG_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddAutoApprovedEmailDomain() {

  describe('addAutoApprovedEmailDomain()', () => {

    const functionInvocation = [
      OrganizationsApi.addAutoApprovedEmailDomain, MOCK_ORG_UUID, MOCK_EMAIL_DOMAIN
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.addAutoApprovedEmailDomain(MOCK_ORG_UUID, MOCK_EMAIL_DOMAIN)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddAutoApprovedEmailDomains() {

  describe('addAutoApprovedEmailDomains()', () => {

    const functionInvocation = [
      OrganizationsApi.addAutoApprovedEmailDomains, MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.addAutoApprovedEmailDomains(MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a POST request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.addAutoApprovedEmailDomains(MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN, MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testSetAutoApprovedEmailDomains() {

  describe('setAutoApprovedEmailDomains()', () => {

    const functionInvocation = [
      OrganizationsApi.setAutoApprovedEmailDomains, MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.setAutoApprovedEmailDomains(MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    it('should send a PUT request with the correct URL path and deduplicated data', (done) => {

      OrganizationsApi.setAutoApprovedEmailDomains(MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN, MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`,
            [MOCK_EMAIL_DOMAIN]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAutoApprovedEmailDomain() {

  describe('removeAutoApprovedEmailDomain()', () => {

    const functionInvocation = [
      OrganizationsApi.removeAutoApprovedEmailDomain, MOCK_ORG_UUID, MOCK_EMAIL_DOMAIN
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.removeAutoApprovedEmailDomain(MOCK_ORG_UUID, MOCK_EMAIL_DOMAIN)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemoveAutoApprovedEmailDomains() {

  describe('removeAutoApprovedEmailDomains()', () => {

    const functionInvocation = [
      OrganizationsApi.removeAutoApprovedEmailDomains, MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      OrganizationsApi.removeAutoApprovedEmailDomains(MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`,
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

      OrganizationsApi.removeAutoApprovedEmailDomains(MOCK_ORG_UUID, [MOCK_EMAIL_DOMAIN, MOCK_EMAIL_DOMAIN])
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORG_UUID}/${EMAIL_DOMAINS_PATH}`,
            method: 'delete',
            data: [MOCK_EMAIL_DOMAIN]
          });
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllPrincipals() {

  describe('getAllPrincipals()', () => {

    const functionInvocation = [
      OrganizationsApi.getAllPrincipals, MOCK_ORG_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAllPrincipals(MOCK_ORG_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddPrincipal() {

  describe('addPrincipal()', () => {

    const functionInvocation = [
      OrganizationsApi.addPrincipal, MOCK_ORG_UUID, MOCK_PRINCIPAL_TYPE, MOCK_PRINCIPAL_ID
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.addPrincipal(MOCK_ORG_UUID, MOCK_PRINCIPAL_TYPE, MOCK_PRINCIPAL_ID)
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}/${MOCK_PRINCIPAL_TYPE}/${MOCK_PRINCIPAL_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testAddPrincipals() {

  describe('addPrincipals()', () => {

    const functionInvocation = [
      OrganizationsApi.addPrincipals, MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL]
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      OrganizationsApi.addPrincipals(MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`,
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

      OrganizationsApi.addPrincipals(MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_USER_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`,
            // TODO: figure out how to avoid having to do this...
            [new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id)]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testSetPrincipals() {

  describe('setPrincipals()', () => {

    const functionInvocation = [
      OrganizationsApi.setPrincipals, MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL]
    ];

    it('should send a PUT request with the correct URL path and data', (done) => {

      OrganizationsApi.setPrincipals(MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`,
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

      OrganizationsApi.setPrincipals(MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_USER_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`,
            // TODO: figure out how to avoid having to do this...
            [new Principal(MOCK_USER_PRINCIPAL.type, MOCK_USER_PRINCIPAL.id)]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemovePrincipal() {

  describe('removePrincipal()', () => {

    const functionInvocation = [
      OrganizationsApi.removePrincipal, MOCK_ORG_UUID, MOCK_PRINCIPAL_TYPE, MOCK_PRINCIPAL_ID
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      OrganizationsApi.removePrincipal(MOCK_ORG_UUID, MOCK_PRINCIPAL_TYPE, MOCK_PRINCIPAL_ID)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}/${MOCK_PRINCIPAL_TYPE}/${MOCK_PRINCIPAL_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testRemovePrincipals() {

  describe('removePrincipals()', () => {

    const functionInvocation = [
      OrganizationsApi.removePrincipals, MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL]
    ];

    it('should send a DELETE request with the correct URL path and data', (done) => {

      OrganizationsApi.removePrincipals(MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_ROLE_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`,
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

      OrganizationsApi.removePrincipals(MOCK_ORG_UUID, [MOCK_USER_PRINCIPAL, MOCK_USER_PRINCIPAL])
        .then(() => {
          expect(mockAxiosInstance.request).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.request).toHaveBeenCalledWith({
            url: `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}`,
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

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllRoles() {

  describe('getAllRoles()', () => {

    const functionInvocation = [
      OrganizationsApi.getAllRoles, MOCK_ORG_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAllRoles(MOCK_ORG_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}/${ROLES_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}

function testGetAllMembers() {

  describe('getAllMembers()', () => {

    const functionInvocation = [
      OrganizationsApi.getAllMembers, MOCK_ORG_UUID
    ];

    it('should send a GET request with the correct URL path', (done) => {

      OrganizationsApi.getAllMembers(MOCK_ORG_UUID)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_ORG_UUID}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(ORGANIZATIONS_API, ...functionInvocation);
    testApiFunctionShouldReturnPromiseOnValidParameters(...functionInvocation);
    testApiFunctionShouldNotThrowOnInvalidParameters(...functionInvocation);
    testApiFunctionShouldRejectOnInvalidParameters(...functionInvocation);

  });
}
