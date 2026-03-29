const resolveMockFlag = () => {
  const rawValue = import.meta.env.ENABLE_MOCK ?? import.meta.env.VITE_ENABLE_MOCK;

  return rawValue?.trim().toLowerCase() === 'true';
};

export async function enableMocking() {
  if (!resolveMockFlag()) {
    return;
  }

  const { worker } = await import('./browser');

  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}
