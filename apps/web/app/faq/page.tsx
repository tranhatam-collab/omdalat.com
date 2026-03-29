import { PageScaffold } from "../../components/shared/PageScaffold";

export default function FaqPage() {
  return (
    <PageScaffold
      eyebrow="Support shell"
      title="FAQ"
      description="Public shell for common questions about the city layer, trust, and participation."
      highlights={["FAQ shell", "Search-friendly structure", "Future schema support"]}
      nextStep="Populate this route with real questions and keep it aligned with the trust page."
    />
  );
}
