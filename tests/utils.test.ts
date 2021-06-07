import { keepTrying } from '../src/utils';

class ApiError extends Error {
  response: {
    status: number;
  };

  constructor(message: string, status: number) {
    super(message);
    this.response = {
      status,
    };
  }
}

describe('keepTrying', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should keep retrying if status code >=500', async () => {
    let timesCalled = 0;

    const failedFn = jest.fn().mockImplementation(async () => {
      if (timesCalled++ < 2) {
        throw new ApiError('Test error', 502);
      }
    });

    const reportError = mockErrorLog();

    await keepTrying(failedFn);

    expect(failedFn).toBeCalledTimes(3);
    expect(reportError).toHaveBeenCalledTimes(2);
  });

  it('Should throw an error if status is undefined', async () => {
    const failedFn = () => {
      throw new Error('Test error');
    };

    const reportError = mockErrorLog();

    const exec = async () => await keepTrying(failedFn);

    expect(exec).rejects.toThrow('Test error');
    expect(reportError).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error if status <500', async () => {
    const failedFn = () => {
      throw new ApiError('Test error', 401);
    };

    const reportError = mockErrorLog();

    const exec = async () => await keepTrying(failedFn);

    expect(exec).rejects.toThrow('Test error');
    expect(reportError).toHaveBeenCalledTimes(1);
  });
});

function mockErrorLog() {
  return jest.spyOn(console, 'error').mockImplementation(jest.fn());
}
