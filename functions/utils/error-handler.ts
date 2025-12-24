import axios from 'axios';
import { errorResponse } from './responses';

export function handleError(
  err: unknown,
  messagePrefix = 'Error',
  status = 500,
) {
  let message = 'Unknown error';

  if (axios.isAxiosError(err)) {
    message = err.response?.data?.error || err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return errorResponse(`${messagePrefix}: ${message}`, status);
}
