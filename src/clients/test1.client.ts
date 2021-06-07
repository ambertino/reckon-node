import axios from 'axios';
import { keepTrying } from '../utils';

const API_BASE_URL = 'https://join.reckon.com/test1';

export interface RangeInfoResponse {
  lower: number;
  upper: number;
}

export async function getNumRange(): Promise<RangeInfoResponse> {
  return keepTrying(async () => {
    const { data } = await axios.get<RangeInfoResponse>(
      `${API_BASE_URL}/rangeInfo`
    );
    return data;
  });
}

export interface Divisor {
  divisor: number;
  output: string;
}

export interface DivisorInfoResponse {
  outputDetails: Divisor[];
}

export async function getDivisors() {
  return keepTrying(async () => {
    const { data } = await axios.get<DivisorInfoResponse>(
      `${API_BASE_URL}/divisorInfo`
    );
    return data;
  });
}
