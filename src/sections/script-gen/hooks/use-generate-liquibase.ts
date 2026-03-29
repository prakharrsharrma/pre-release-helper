import { useMutation } from '@tanstack/react-query';

import ScriptGenServices from 'src/services/ScriptGenServices';

// ----------------------------------------------------------------------

type GenerateLiquibaseVariables = {
  prompt: string;
};

export function useGenerateLiquibase() {
  return useMutation<string, Error, GenerateLiquibaseVariables>({
    mutationFn: ({ prompt }: GenerateLiquibaseVariables) =>
      ScriptGenServices.generateScript(prompt),
  });
}
