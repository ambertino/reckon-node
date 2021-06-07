export interface SubtextSearchResult {
  subtext: string;
  positions: string;
}

export interface TextSearchResult {
  text: string;
  results: SubtextSearchResult[];
}

export interface TextSearchResultToSubmit extends TextSearchResult {
  candidate: string;
}
