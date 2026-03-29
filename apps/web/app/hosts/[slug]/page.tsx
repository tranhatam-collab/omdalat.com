import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { getHostBySlug, hosts } from "../../../lib/public-data";

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
    description: host.focus,
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
      eyebrow="Host detail"
      title={host.name}
      description={host.focus}
      path={`/hosts/${host.slug}`}
      backHref="/hosts"
      backLabel="Hosts"
      facts={[
        { label: "Role", value: host.role },
        { label: "Zone", value: host.zone },
        { label: "Availability", value: host.availability },
        { label: "Verified", value: host.verified ? "Yes" : "In review" }
      ]}
      signals={[host.trust, "Host detail routes are now connected to the public dataset."]}
    />
  );
}
