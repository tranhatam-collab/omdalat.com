import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { getHostBySlug, hosts, resolveLocalizedText } from "../../../lib/public-data";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return hosts.map((host) => ({ slug: host.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const host = getHostBySlug(slug);

  if (!host) {
    return buildPageMetadata({
      title: "Host not found",
      description: "The requested host does not exist in the current OMDALAT dataset.",
      path: `/hosts/${slug}`,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: `${host.name} | OMDALAT Host in Da Lat`,
    description: resolveLocalizedText(host.focus),
    path: `/hosts/${host.slug}`
  });
}

export default async function HostDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const host = getHostBySlug(slug);

  if (!host) {
    notFound();
  }

  return (
    <DetailScaffold
      eyebrow={{ vi: "Chi tiết host", en: "Host detail" }}
      title={host.name}
      description={host.focus}
      path={`/hosts/${host.slug}`}
      backHref="/hosts"
      backLabel={{ vi: "Host", en: "Hosts" }}
      facts={[
        { label: { vi: "Vai trò", en: "Role" }, value: host.role },
        { label: { vi: "Khu vực", en: "Zone" }, value: host.zone },
        { label: { vi: "Khả dụng", en: "Availability" }, value: host.availability },
        { label: { vi: "Xác minh", en: "Verified" }, value: host.verified ? { vi: "Đã xác minh", en: "Yes" } : { vi: "Đang rà soát", en: "In review" } }
      ]}
      signals={[host.trust, { vi: "Route chi tiết host hiện đã nối vào bộ dữ liệu public.", en: "Host detail routes are now connected to the public dataset." }]}
    />
  );
}
