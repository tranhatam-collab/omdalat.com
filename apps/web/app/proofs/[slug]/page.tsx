import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { getProofBySlug, proofs } from "../../../lib/public-data";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return proofs.map((proof) => ({ slug: proof.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const proof = getProofBySlug(slug);

  if (!proof) {
    return buildPageMetadata({
      title: "Proof not found",
      description: "The requested proof does not exist in the current OMDALAT dataset.",
      path: `/proofs/${slug}`,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: `${proof.title} | OMDALAT Proof in Da Lat`,
    description: proof.outcome,
    path: `/proofs/${proof.slug}`
  });
}

export default async function ProofDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const proof = getProofBySlug(slug);

  if (!proof) {
    notFound();
  }

  return (
    <DetailScaffold
      eyebrow="Proof detail"
      title={proof.title}
      description={proof.outcome}
      path={`/proofs/${proof.slug}`}
      backHref="/proofs"
      backLabel="Proofs"
      facts={[
        { label: "Kind", value: proof.kind },
        { label: "Recorded", value: proof.date },
        { label: "Outcome", value: proof.outcome }
      ]}
      signals={[proof.evidence, "Proof detail routes now make evidence-backed outcomes linkable."]}
    />
  );
}
