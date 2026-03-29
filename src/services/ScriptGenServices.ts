import { isAxiosError } from 'axios';

import axiosInstance from 'src/utils/axiosConfig';

type ScriptGenResponse =
  | string
  | {
      script?: string;
      liquibaseScript?: string;
      generatedLiquibase?: string;
      content?: string;
      result?: string;
      data?: string;
      message?: string;
      error?: string;
    };

const resolveScriptContent = (payload: ScriptGenResponse) => {
  if (typeof payload === 'string') {
    return payload.trim();
  }

  const candidates = [
    payload.script,
    payload.liquibaseScript,
    payload.generatedLiquibase,
    payload.content,
    payload.result,
    payload.data,
  ];

  return (
    candidates.find((candidate) => typeof candidate === 'string' && candidate.trim())?.trim() ?? ''
  );
};

const resolveApiErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === 'string' && responseData.trim()) {
      return responseData.trim();
    }

    if (responseData && typeof responseData === 'object') {
      const { message, error: apiError } = responseData as { message?: string; error?: string };

      if (typeof message === 'string' && message.trim()) {
        return message.trim();
      }

      if (typeof apiError === 'string' && apiError.trim()) {
        return apiError.trim();
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return 'The AI generator could not complete the request. Please try again in a moment.';
};

class ScriptGenServices {
  async generateScript(prompt: string): Promise<string> {
    try {
      const normalizedPrompt = prompt.trim();

      if (!normalizedPrompt) {
        throw new Error('A prompt is required to generate a Liquibase script.');
      }

      const response = await axiosInstance.get<ScriptGenResponse>('/generate-script', {
        params: { prompt: normalizedPrompt },
      });

      const generatedScript = resolveScriptContent(response.data);

      if (!generatedScript) {
        throw new Error(
          'The AI generator returned an empty script. Please refine the prompt and retry.'
        );
      }

      return generatedScript;
    } catch (error) {
      const message = resolveApiErrorMessage(error);

      console.error('Error generating Liquibase script:', error);
      throw new Error(message);
    }
  }
}

export default new ScriptGenServices();
