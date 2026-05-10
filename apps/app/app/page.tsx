import type { Metadata } from "next";
import { buildCurrentLocaleAppMetadata } from "../lib/metadata";
export { default } from "./dashboard/page";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Không gian thành viên",
      en: "Member Workspace"
    },
    description: {
      vi: "Lối vào khu vực thành viên và vận hành của Ôm Đà Lạt.",
      en: "Entry point to Om Dalat member and operations workspace."
    },
    path: "/"
  });
}
