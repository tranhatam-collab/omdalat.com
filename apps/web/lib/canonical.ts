export const WEB_ORIGIN = "https://omdalat.com";

export function absoluteUrl(path = "/") {
  return new URL(path, WEB_ORIGIN).toString();
}
