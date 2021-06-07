import * as client from '../../src/clients/test2.client';
import * as service from '../../src/services/test2.svc';

describe('Text service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('searchText should return correct results', async () => {
    const text = `Hello Deema! How are you Deema? What are you doing Deema?`;
    const subtexts = ['Are you', 'deema', 'Deema', '?', 'test'];

    jest.spyOn(client, 'getTextToSearch').mockResolvedValue(text);
    jest.spyOn(client, 'getSubTexts').mockResolvedValue(subtexts);

    const result = await service.searchText();

    expect(result).toEqual({
      text,
      results: [
        {
          subtext: 'Are you',
          positions: '17, 37',
        },
        {
          subtext: 'deema',
          positions: '6, 25, 51',
        },
        {
          subtext: 'Deema',
          positions: '6, 25, 51',
        },
        {
          subtext: '?',
          positions: '30, 56',
        },
        {
          subtext: 'test',
          positions: '<No Output>',
        },
      ],
    });
  });

  it('searchTextAndSubmit should successfully submit result', async () => {
    jest.spyOn(client, 'getTextToSearch').mockResolvedValue('');
    jest.spyOn(client, 'getSubTexts').mockResolvedValue([]);

    const mockedSubmit = jest
      .spyOn(client, 'submitSearchResult')
      .mockImplementation(jest.fn());

    const submitted = await service.searchTextAndSubmit();
    const expectedResult = {
      text: '',
      results: [],
    };

    expect(mockedSubmit).toHaveBeenCalledWith({
      candidate: 'Dmitry Istomin',
      ...expectedResult,
    });
    expect(submitted).toEqual(expectedResult);
  });
});
