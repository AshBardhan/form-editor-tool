let mswStarted = false;

export async function initMocks() {
  if (mswStarted) return;

  const { worker } = await import("./browser");
  await worker.start({ onUnhandledRequest: "bypass" });
  mswStarted = true;

  console.log("[MSW] Mocking enabled.");
}
