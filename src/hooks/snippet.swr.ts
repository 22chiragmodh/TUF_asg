import useSWR from 'swr';
import { genericAPIFetcher } from '../utils/swr.helper';
import { API_CONSTANTS } from '@/utils/api.constants';

export interface ISnippet {
  id: string;
  username: string;
  language: string;
  stdin: string;
  code: string;
  createdAt: string;
}

export function useSnippets() {
  const { data, error, isLoading, mutate } = useSWR<{ data: ISnippet[] }>(
    [API_CONSTANTS.GET_SNIPPETS, 'get'],
    genericAPIFetcher,
    { refreshInterval: 10000 }
  );

  return {
    snippets: data?.data,
    isSnippetsLoading: isLoading as boolean,
    errorFetchingSnippets: error,
    mutateSnippets: mutate,
  };
}
