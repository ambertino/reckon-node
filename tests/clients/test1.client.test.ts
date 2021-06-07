import faker, { fake } from 'faker';
import axios from 'axios';
import {
  RangeInfoResponse,
  getNumRange,
  getDivisors,
  DivisorInfoResponse,
} from '../../src/clients/test1.client';
import * as utils from '../../src/utils';

interface AxiosResult<T> {
  data: T;
}

describe('API module', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getNumRange returns currect result if successful', async () => {
    const data = {
      lower: 1,
      upper: 100,
    };

    jest.spyOn(axios, 'get').mockResolvedValue({
      data,
    } as AxiosResult<RangeInfoResponse>);

    const numRange = await getNumRange();

    expect(numRange).toEqual(data);
  });

  it('getNumRange uses keepTrying util', async () => {
    await checkKeepTrying(getNumRange);
  });

  it('getDivisors returns currect result if successful', async () => {
    let data: DivisorInfoResponse = {
      outputDetails: [],
    };

    for (let i = 0; i < 10; i++) {
      data.outputDetails.push({
        divisor: faker.datatype.number(100),
        output: faker.random.word(),
      });
    }

    jest.spyOn(axios, 'get').mockResolvedValue({
      data,
    } as AxiosResult<DivisorInfoResponse>);

    const divisors = await getDivisors();

    expect(divisors).toEqual(data);
  });

  it('getDivisors uses keepTrying util', async () => {
    await checkKeepTrying(getNumRange);
  });
});

async function checkKeepTrying<T>(fn: () => Promise<T>) {
  const mockedRetrial = jest
    .spyOn(utils, 'keepTrying')
    .mockImplementation(jest.fn());

  await fn();

  expect(mockedRetrial).toHaveBeenCalled();
}
