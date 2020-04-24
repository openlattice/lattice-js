import * as CodexApi from './CodexApi';

import * as AxiosUtils from '../utils/axios';
import { CODEX_API } from '../constants/ApiNames';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_OUTGOING_TEXT = {
  messageContents: genRandomString(),
  organizationId: genRandomUUID(),
};

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(CODEX_API, () => {
  runTestSuite(
    CodexApi,
    CODEX_API,
    {
      sendOutgoingText: {
        '': { params: { optional: [false], valid: [MOCK_OUTGOING_TEXT] } },
        '(messageRequest)': {
          method: 'post',
          params: {
            axios: ['/', MOCK_OUTGOING_TEXT],
            valid: [MOCK_OUTGOING_TEXT],
          },
        },
      },
    },
  );
});
