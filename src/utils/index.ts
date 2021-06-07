export * from './string';

export async function keepTrying<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    // Send logs to a storage
    console.error(err.message);

    // Do not retry unexpected exceptions or API failures below 500 as this issues are permanent
    // e.g. resource is not found or request is malformed
    const { response } = err;
    if (!response || response.status < 500) {
      throw err;
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(keepTrying(fn)), 100);
    });
  }
}
