import { absoluteUrl } from "./canonical";

export function buildHreflangScaffold(path: string) {
  return {
    en: absoluteUrl(path),
    vi: absoluteUrl(`/vi${path === "/" ? "" : path}`)
  };
}
