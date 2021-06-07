import { getDivisors, getNumRange } from '../clients/test1.client';

export interface NumOutput {
  num: number;
  output: string;
}

export async function getOutputs(): Promise<NumOutput[]> {
  const result = [];
  const [range, divs] = [await getNumRange(), await getDivisors()];

  for (let i = range.lower; i <= range.upper; i++) {
    result.push({
      num: i,
      output: divs.outputDetails.reduce((acc, { divisor, output }) => {
        if (divisor === 0) return '';
        return i % divisor === 0 ? acc + output : acc;
      }, ''),
    });
  }

  return result;
}
