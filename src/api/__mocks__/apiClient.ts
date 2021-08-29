const { default: ApiClient } = jest.requireActual('../apiClient');

export const mocks = Object.getOwnPropertyNames(ApiClient.prototype).reduce(
  (prev, curr) => ({ ...prev, [curr]: jest.fn() }),
  {}
);

export default jest.fn().mockImplementation(() => mocks);
