export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
};
