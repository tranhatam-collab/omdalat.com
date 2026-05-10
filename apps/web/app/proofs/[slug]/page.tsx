import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { getProofBySlug, proofs, resolveLocalizedText } from "../../../lib/public-data";

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
    description: resolveLocalizedText(proof.outcome),
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
      eyebrow={{ vi: "Chi tiết bằng chứng", en: "Proof detail" }}
      title={proof.title}
      description={proof.outcome}
      path={`/proofs/${proof.slug}`}
      backHref="/proofs"
      backLabel={{ vi: "Bằng chứng", en: "Proofs" }}
      facts={[
        { label: { vi: "Loại", en: "Kind" }, value: proof.kind },
        { label: { vi: "Ghi nhận", en: "Recorded" }, value: proof.date },
        { label: { vi: "Kết quả", en: "Outcome" }, value: proof.outcome }
      ]}
      signals={[proof.evidence, { vi: "Trang này ghi rõ kết quả, loại bằng chứng và thời điểm ghi nhận.", en: "This page records the outcome, proof type, and date of record." }]}
    />
  );
}
