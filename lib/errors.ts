/** Extracts a clean message from a thrown value without the redundant "Error: " prefix that String(err) adds. */
export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
