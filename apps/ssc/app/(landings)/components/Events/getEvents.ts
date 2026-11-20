import { cache } from "react";
import type { EventProps } from "./Event";

// Share one request between the event list and roadmap in each server render.
export const getEvents = cache(async (): Promise<{ events: EventProps[]; unavailable: boolean }> => {
  try {
    const response = await fetch("https://api.ceit-ssc.ir/api/events/", {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Events request failed: ${response.status}`);
    const results = await response.json();
    if (!Array.isArray(results?.data?.results)) throw new Error("Invalid events response");
    return { events: results.data.results, unavailable: false };
  } catch {
    return { events: [], unavailable: true };
  }
});
