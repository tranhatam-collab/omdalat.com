import { siteConfig } from "./config";

export const OMDALAT_MAIL_API_ORIGIN = "https://mail.iai.one/_mail";

export const OMDALAT_INBOXES = {
  hello: "hello@omdalat.com",
  support: "support@omdalat.com",
  app: "app@omdalat.com",
  join: "join@omdalat.com",
  partnerships: "partnerships@omdalat.com",
  trust: "trust@omdalat.com",
  noreply: "noreply@omdalat.com"
} as const;

export const OMDALAT_CONTACT_TOPICS = [
  { value: "general", label: "General / Tổng quát" },
  { value: "join", label: "Join Om Dalat / Tham gia Ôm Đà Lạt" },
  { value: "host", label: "Host or place / Điểm đón hoặc địa điểm" },
  { value: "community", label: "Community / Cộng đồng" },
  { value: "support", label: "Support / Hỗ trợ" },
  { value: "trust", label: "Trust / Niềm tin" }
] as const;

export const OMDALAT_ORIGINS = {
  web: siteConfig.publicOrigin,
  app: siteConfig.appOrigin
} as const;
