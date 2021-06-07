import { getOutputs } from '../../src/services/test1.svc';
import * as client from '../../src/clients/test1.client';

describe('Test1 sevice', () => {
  it('Should return correct result', async () => {
    jest.spyOn(client, 'getNumRange').mockResolvedValue({
      lower: 0,
      upper: 10,
    });
    jest.spyOn(client, 'getDivisors').mockResolvedValue({
      outputDetails: [
        {
          divisor: 2,
          output: 'Two',
        },
        {
          divisor: 5,
          output: 'Five',
        },
      ],
    });

    const outputs = await getOutputs();

    expect(outputs).toEqual([
      {
        num: 0,
        output: 'TwoFive',
      },
      {
        num: 1,
        output: '',
      },
      {
        num: 2,
        output: 'Two',
      },
      {
        num: 3,
        output: '',
      },
      {
        num: 4,
        output: 'Two',
      },
      {
        num: 5,
        output: 'Five',
      },
      {
        num: 6,
        output: 'Two',
      },
      {
        num: 7,
        output: '',
      },
      {
        num: 8,
        output: 'Two',
      },
      {
        num: 9,
        output: '',
      },
      {
        num: 10,
        output: 'TwoFive',
      },
    ]);
  });

  it('Should handle zero divisor', async () => {
    jest.spyOn(client, 'getNumRange').mockResolvedValue({
      lower: 1,
      upper: 2,
    });
    jest.spyOn(client, 'getDivisors').mockResolvedValue({
      outputDetails: [
        {
          divisor: 0,
          output: 'Two',
        },
      ],
    });

    const outputs = await getOutputs();

    expect(outputs).toEqual([
      {
        num: 1,
        output: '',
      },
      {
        num: 2,
        output: '',
      },
    ]);
  });
});
