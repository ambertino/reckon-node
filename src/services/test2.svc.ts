import {
  getTextToSearch,
  getSubTexts,
  submitSearchResult,
} from '../clients/test2.client';
import { TextSearchResult, TextSearchResultToSubmit } from '../types';
import { toLowerChar } from '../utils';

const AUTHOR_NAME = 'Dmitry Istomin';

export async function searchText(): Promise<TextSearchResult> {
  const [text, subTexts] = [await getTextToSearch(), await getSubTexts()];

  return {
    text,
    results: subTexts.map((sub) => {
      const occurences: number[] = [];

      for (let i = 0; i < text.length; i++) {
        const matched = checkOccurence(i, text, sub);
        if (matched) occurences.push(i);
      }

      return {
        subtext: sub,
        positions: occurences.join(', ') || '<No Output>',
      };
    }),
  };
}

export async function searchTextAndSubmit() {
  const result = await searchText();
  await submitResult({
    candidate: AUTHOR_NAME,
    ...result,
  });
  return result;
}

function checkOccurence(index: number, text: string, sub: string) {
  for (let i = 0; i < sub.length; i++) {
    const tc = toLowerChar(text[index + i]);
    const sc = toLowerChar(sub[i]);
    if (tc !== sc) return false;
  }
  return true;
}

export async function submitResult(result: TextSearchResultToSubmit) {
  return submitSearchResult(result);
}
