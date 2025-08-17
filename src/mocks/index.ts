let mswStarted = false;
export async function initMocks() {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    !mswStarted
  ) {
    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "bypass" });
    mswStarted = true;
    console.log("[MSW] Mocking enabled.");
  }
}
