import { useMutation } from '@tanstack/react-query';

import CipGenServices from 'src/services/CipGenServices';

export function useGetJiraTickets() {
  return useMutation<string[], Error, void>({
    mutationFn: CipGenServices.getJiraTickets,
  });
}

export function useGetConfluencePages() {
  return useMutation<string[], Error, void>({
    mutationFn: CipGenServices.getConfluencePages,
  });
}
