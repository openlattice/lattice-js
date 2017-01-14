
const MOCK_PROMISE = new Promise((resolve) => {
  resolve({ data: {} });
});

export function getMockAxiosInstance() { // eslint-disable-line

  const mockAxiosInstance = jasmine.createSpyObj(
    'mockAxiosInstance',
    ['get', 'post', 'put', 'patch', 'delete', 'request']
  );

  mockAxiosInstance.get.and.returnValue(MOCK_PROMISE);
  mockAxiosInstance.post.and.returnValue(MOCK_PROMISE);
  mockAxiosInstance.put.and.returnValue(MOCK_PROMISE);
  mockAxiosInstance.patch.and.returnValue(MOCK_PROMISE);
  mockAxiosInstance.delete.and.returnValue(MOCK_PROMISE);
  mockAxiosInstance.request.and.returnValue(MOCK_PROMISE);

  return mockAxiosInstance;
}
