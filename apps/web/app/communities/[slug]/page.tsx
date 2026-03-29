import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { communities, getCommunityBySlug } from "../../../lib/public-data";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return communities.map((community) => ({ slug: community.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);

  if (!community) {
    return buildPageMetadata({
      title: "Community not found",
      description: "The requested community does not exist in the current OMDALAT dataset.",
      path: `/communities/${slug}`,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: `${community.name} | OMDALAT Community in Da Lat`,
    description: community.focus,
    path: `/communities/${community.slug}`
  });
}

export default async function CommunityDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);

  if (!community) {
    notFound();
  }

  return (
    <DetailScaffold
      eyebrow="Community detail"
      title={community.name}
      description={community.focus}
      path={`/communities/${community.slug}`}
      backHref="/communities"
      backLabel="Communities"
      facts={[
        { label: "Zone", value: community.zone },
        { label: "Cadence", value: community.cadence },
        { label: "Focus", value: community.focus }
      ]}
      signals={[community.signal, "Community routes now exist beyond listing shells."]}
    />
  );
}
