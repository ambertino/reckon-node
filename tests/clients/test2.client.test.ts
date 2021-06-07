import faker from 'faker';
import axios from 'axios';
import {
  getTextToSearch,
  getSubTexts,
  submitSearchResult,
  SubTextsApiResponse,
  TextToSearchApiResponse,
} from '../../src/clients/test2.client';
import * as utils from '../../src/utils';

interface AxiosResult<T> {
  data: T;
}

const mockedResult = {
  candidate: 'Deema',
  text: 'Hey Deema!',
  results: [
    {
      subtext: 'Deema',
      positions: '4',
    },
  ],
};

describe('API module', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getTextToSearch returns currect result if successful', async () => {
    const randomText = faker.random.words(100);

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        text: randomText,
      },
    } as AxiosResult<TextToSearchApiResponse>);

    const textToSearch = await getTextToSearch();

    expect(textToSearch).toEqual(randomText);
  });

  it('getTextToSearch uses keepTrying util', async () => {
    await checkKeepTrying(getTextToSearch);
  });

  it('getSubTexts returns currect result if successful', async () => {
    const randomSubs = [];
    for (let i = 0; i < 10; i++) {
      randomSubs.push(faker.random.word());
    }

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        subTexts: randomSubs,
      },
    } as AxiosResult<SubTextsApiResponse>);

    const searchedSubs = await getSubTexts();

    expect(randomSubs).toEqual(searchedSubs);
  });

  it('getSubTexts uses keepTrying util', async () => {
    await checkKeepTrying(getSubTexts);
  });

  it('submitSearchResult successfully submits search result', async () => {
    const result = {
      candidate: 'Deema',
      text: 'Hey Deema!',
      results: [
        {
          subtext: 'Deema',
          positions: '4',
        },
      ],
    };

    const mockedPost = jest.spyOn(axios, 'post').mockResolvedValue({});

    await submitSearchResult(result);

    expect(mockedPost).toHaveBeenCalledTimes(1);
    expect(mockedPost.mock.calls[0][1]).toBe(result);
  });

  it('submitSearchResult uses keepTrying util', async () => {
    await checkKeepTrying(() => submitSearchResult(mockedResult));
  });
});

async function checkKeepTrying<T>(fn: () => Promise<T>) {
  const mockedRetrial = jest
    .spyOn(utils, 'keepTrying')
    .mockImplementation(jest.fn());

  await fn();

  expect(mockedRetrial).toHaveBeenCalled();
}
