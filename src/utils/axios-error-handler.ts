import { AxiosError } from 'axios';

export default function handleAxiosError(
  err: unknown,
  defaultMessage: string,
): never {
  if (err instanceof AxiosError) {
    throw new Error(err.response?.data?.error || defaultMessage);
  }

  if (err instanceof Error) {
    throw new Error(err.message || defaultMessage);
  }

  throw new Error(defaultMessage);
}
