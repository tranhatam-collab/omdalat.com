import { getPublicDocsContext, pickDocsText } from "./public-docs";

export { pickDocsText };
export type { DocsContext, DocsLink } from "./public-docs";

/**
 * Backward-compatible alias used by pages that still import from `docs-map`.
 * The data source now lives in `public-docs` and no longer points to legacy domains.
 */
export function getDocsContext(path: string) {
  return getPublicDocsContext(path);
}
