let ph: { capture: (event: string, props?: Record<string, unknown>) => void } | null = null;

export async function initAnalytics(): Promise<void> {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key) return;

  try {
    const { default: posthog } = await import("posthog-js");
    posthog.init(key, {
      api_host: (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? "https://app.posthog.com",
      autocapture: false,
      capture_pageview: true,
      disable_session_recording: true,
      loaded(p) {
        ph = p;
      },
    });
  } catch {
    // posthog-js not installed or blocked — analytics silently disabled
  }
}

export function trackEvent(event: string, props?: Record<string, unknown>): void {
  ph?.capture(event, props);
}
